import { useEffect, useState, useRef, useMemo } from "react";
import { useService } from "open-pioneer:react-hooks";
import { MapContainer, useMap } from "@open-pioneer/experimental-ol-map";
import Draw, { createBox } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Geometry, Point, Polygon } from "ol/geom";
import { click, pointerMove } from "ol/events/condition";
import { Select } from "ol/interaction";
import { Feature } from "ol";
import { toLonLat, transform } from "ol/proj";
import { Box, Flex, HStack } from "@open-pioneer/chakra-integration";
import { Legend } from "./PopupComponents/Legend";
import { XButton } from "./PopupComponents/XButton";
import { TooltipBox } from "./PopupComponents/TooltipBox";
import { ErrorMessage } from "./PopupComponents/ErrorMessage";
import { CatchmentOptions } from "./CatchmentComponents/CatchmentOptions";
import { CatchmentButton } from "./CatchmentComponents/CatchmentButton";
import { DrawBboxButton } from "./CatchmentComponents/DrawBboxButton";
import { hoverStyle, selectStyle } from "./Styles";
import { useSearchState } from "../../SearchState";
import { SearchService } from "../../../../services";
import { computeBBox, createBboxLayer, createCatchmentLayer, intersectsBBox } from "./geometryUtils";
import GeoJSON from "ol/format/GeoJSON";
//import dataNew from "../../../../services/hydro90m_basins_combined_v2_webmercator_1perc.json";
import dataNew from "../../../../services/sea_areas_catchments.json";
import { defaults as defaultInteractions } from "ol/interaction.js";
import { USED_EPSG_CODE } from "./SpatialCoverageFacet";
import { useCatchmentMap } from "./useCatchmentMap";


interface PopupOverlayProps {
    showPopup: boolean;
    onClose: () => void;
    setSelectedOption: (value: string) => void;
    selectedOption: string;
}

export function PopupOverlay({ showPopup, onClose, selectedOption, setSelectedOption }: PopupOverlayProps) {
    const searchSrvc = useService("onestop4all.SearchService") as SearchService;
    const searchState = useSearchState();

    const MAPID = "popup";
    const map = useMap(MAPID).map;

    useEffect(() => {
        if (!map) return;
        map.getView().setCenter([1169191, 6606967]); //Center to Europe
        map.getView().setZoom(4);
    }, [showPopup]);

    const [source] = useState(new VectorSource({ wrapX: false }));
    const draw = useRef<Draw>();

    const {
        bboxActive,
        setBboxActive,
        tooltipContent,
        setTooltipContent,
        showErrorMessage,
        setShowErrorMessage,
        loading,
        setLoading,
        markerLonLat,
        setMarkerLonLat,
        bBox,
        setBBox,
        bBoxVectorLayer,
        setBBoxVectorLayer,
        catchmentSource,
        setCatchmentSource,
        catchmentBBoxSource,
        setCatchmentBBoxSource,
        markerVector,
        vectorLayer
    } = useCatchmentMap(map, selectedOption, searchSrvc, searchState);

    const hoverName = useMemo(
        () =>
            new Select({
                condition: pointerMove,
                style: hoverStyle,
                toggleCondition: () => false,
            }),
        []
    );

    const selectClick = useMemo(
        () =>
            new Select({
                condition: click,
                style: selectStyle,
            }),
        []
    );

    function addInteraction(newDraw: Draw) {
        draw.current = newDraw;
    
        newDraw.on("drawstart", () => {
            source.clear();
        });
    
        newDraw.on("drawend", (event) => {
            const geometry = event.feature.getGeometry() as Polygon;
        
            if (!geometry) return;
            
            const coords = geometry.getCoordinates()[0];
            
            if (!coords) return;
            
            const coords4326 = coords.map((coord: any) => transform(coord, "EPSG:3857", USED_EPSG_CODE));
            const intersectingFeatures = intersectsBBox(coords4326);
            getBBox(intersectingFeatures);
        });
    
        map?.addInteraction(newDraw);
    }
    
    useEffect(() => {
        if (!map) return;
        map.render();
        selectedOption === "upstream" ? addMarker() : null;
    }, [showPopup, map]);
    
    function removeInteraction() {
        if (draw.current) map?.removeInteraction(draw.current);
    }

    useEffect(() => {
        if (!map) return;
        
        map.getLayers().forEach((layer) => {
            if (layer instanceof VectorLayer) {
                map.removeLayer(layer);
            }
        });
        
        map.addLayer(vectorLayer);
        
        return () => {
            if (vectorLayer) {
                map.removeLayer(vectorLayer);
            }
        };
    }, [map]);

    function getBBox(features: any) {
        cleanUpLayers();
        if (!map) return;

        const coordinates = computeBBox(features);
        const bboxLayer = createBboxLayer(coordinates);

        const source = new VectorSource({
            features: features
        });
    
        const vectorLayer = new VectorLayer({
            source: source,
            style: selectStyle,
        });

        map.addLayer(vectorLayer);
        map.addLayer(bboxLayer.layer);

        setBBoxVectorLayer(bboxLayer.layer);
        setBBox(bboxLayer.features);
    }

    function setSearchArea(): void {
        if (!bBox || !map) return;
        const geom = bBox[0]?.getGeometry();
        const sourceEPSG = map.getView().getProjection().getCode();
        const transformedGeom = geom.clone().transform(sourceEPSG, USED_EPSG_CODE);
        if (transformedGeom instanceof Polygon) {
            const extent = transformedGeom.getExtent();
            closeMap();
            searchState.setSpatialFilter(extent);
        }
    }

    function closeMap(): void {
        cleanUpLayers();
        deselectAll();
        onClose();
    }

    function deselectAll(): void {
        const selected = selectClick.getFeatures();
        if (selected.getLength() > 0) selected.clear();

        const selectedHover = hoverName.getFeatures();
        if (selectedHover.getLength() > 0) selectedHover.clear();

        setShowErrorMessage(false);
        
        map?.removeLayer(bBoxVectorLayer);
        setBBoxVectorLayer(new VectorLayer());

        setBBox(undefined);
        markerVector.getSource()?.clear();
        catchmentSource?.clear();
        catchmentBBoxSource?.clear();
        setBboxActive(false);
        setMarkerLonLat([]);
    }

    function cleanUpLayers(): void {
        if (!map) return;
    
        const layers = map.getAllLayers();
        if (layers.length <= 2) return;
    
        layers.slice(2).forEach(layer => {
            if (layer instanceof VectorLayer && layer !== markerVector) {
                map.removeLayer(layer);
            }
        });
    }

    function addMarker(): void {
        if (!map) return;
        const newDraw = new Draw({
            source: markerVector.getSource() ?? undefined,
            type: "Point"
        });
        draw.current = newDraw;
        newDraw.on("drawstart", () => source.clear());
        newDraw.on("drawend", (event) => {
            const geom = event.feature.getGeometry();
            if (geom instanceof Point) {
                const coords = geom.getCoordinates();
                const lonLat = toLonLat(coords);
                setMarkerLonLat(lonLat);
            }
        });
        map.addInteraction(newDraw);
    }

    function getCatchmentWrap(): void {
        deselectAll();
        setShowErrorMessage(false);
        if (markerLonLat) {
            processCatchment(markerLonLat);
        }
    }

    function resetInteractions() {
        map?.getInteractions().clear(); // This deletes ALL interactions! (zoom and drag as well)
        defaultInteractions().forEach((interaction) => map?.addInteraction(interaction));
    }

    const processCatchment = async (lonLat: number[]) => {
        setLoading(true);
        setShowErrorMessage(false);

        try {
            const response = await searchSrvc.processCatchment(lonLat);

            if (!response?.outputs?.polygon?.href) {
                throw new Error("Invalid catchment response structure");
            }

            const polygonUrl = response.outputs.polygon.href;

            const polygonResponse = await fetch(polygonUrl);

            if (!polygonResponse.ok) {
                throw new Error(`Failed to fetch polygon: ${polygonResponse.status}`);
            }

            const polygonGeoJson = await polygonResponse.json();

            const geoJSONFormat = new GeoJSON();

            const features = geoJSONFormat.readFeatures(polygonGeoJson, {
                featureProjection: "EPSG:3857",
            });

            const bbox = computeBBox(features);

            addCatchmentFeaturesToMap(features, bbox);

        } catch (error) {
            console.error("Error processing catchment:", error);
            setShowErrorMessage(true);
        } finally {
            setLoading(false);
        }
    };

    const addCatchmentFeaturesToMap = (features: Feature<Geometry>[], bbox: number[][]) => {
        if (!map) return;

        const catchmentFeatures = createCatchmentLayer(bbox, features);

        setCatchmentSource(catchmentFeatures.catchmentSource);
        setCatchmentBBoxSource(catchmentFeatures.vectorSourceBBox);
        
        map.addLayer(catchmentFeatures.catchmentLayer);
        map.addLayer(catchmentFeatures.vectorLayerBBox);

        const source = catchmentFeatures.catchmentLayer.getSource();

        if (source) {
            const extent = source.getExtent();
            map.getView().fit(extent, { duration: 1000 });
        }

        setBBox(catchmentFeatures.bboxFeatures);
    };

    useEffect(() => {
        if (!map) return;
    
        /**Full catchment mode */
        if (selectedOption === "full") {
            resetInteractions();
            if (bboxActive) {
                const drawInteraction = new Draw({
                    source,
                    type: "Circle",
                    geometryFunction: createBox(),
                });
                addInteraction(drawInteraction);
            } else {       
                map.addInteraction(selectClick);
                map.addInteraction(hoverName);
        
                const handleSelect = () => {
                    getBBox(selectClick.getFeatures().getArray());
                };
        
                const handleHover = () => {
                    setTooltipContent("");
                    if (hoverName.getFeatures().getLength() > 0) {
                        setTooltipContent(hoverName.getFeatures().item(0).getProperties().name);
                    }
                };
        
                selectClick.on("select", handleSelect);
                hoverName.on("select", handleHover);
                setBBox(undefined);
        
                return () => {
                    selectClick.un("select", handleSelect);
                };
            }
        } else {
            cleanUpLayers();
            deselectAll();
            resetInteractions();
            addMarker();
        }
    
        return () => {
            if (map) {
                removeInteraction();
            }
        };
    }, [map, bboxActive, selectedOption]);

    useEffect(() => {
        if (map) map.addLayer(markerVector);
    }, [map, markerVector]);

    if (!showPopup) return null;
    
    const isDeleteActive =
        (bBox && bBox.length > 0) ||
        (markerVector.getSource()?.getFeatures().length ?? 0) > 0;

    return (
        <Box className="popup-background-transparent">
            <Box className="popup-background">
                <Box className="popup-header">
                    <b>Select catchment areas</b>
                </Box>

                <Box className="map-container" position="relative">
                    <HStack spacing={4}>
                        <CatchmentOptions 
                            onChange={setSelectedOption} 
                            selectedOption={selectedOption} 
                        />
                    </HStack>

                    {showErrorMessage && <ErrorMessage message="Computation failed! The selected point either resulted in too many subcatchments or is not in Europe."/>}

                    {selectedOption === "full" && (
                        <Box position="absolute" bottom="-45px" right="10px" zIndex="10">
                            <DrawBboxButton 
                                bboxActive={bboxActive} 
                                onClick={()=>setBboxActive(!bboxActive)} 
                            />
                        </Box>
                    )}
                    <MapContainer mapId={MAPID} />
                    <TooltipBox content={tooltipContent} />

                    <Box className="legend">
                        <Legend />
                    </Box>
                </Box>

                <XButton handleClose={closeMap} />

                <Flex className="catchment-button-container">
                    <CatchmentButton 
                        active={isDeleteActive} 
                        onClick={deselectAll} 
                        text="Delete selection" 
                    />
                    {
                        selectedOption === "upstream" && 
                            <CatchmentButton 
                                active={markerLonLat && markerLonLat.length > 0 && !loading ? true : false} 
                                onClick={getCatchmentWrap} 
                                text="Compute catchment" 
                                loading={loading}
                            />
                    }
                    <CatchmentButton 
                        active={bBox ? true : false} 
                        onClick={setSearchArea} 
                        text="Apply bounding box" 
                    />
                </Flex>
            </Box>
        </Box>
    );
}