import { useEffect, useState, useRef } from "react";
import { useService } from "open-pioneer:react-hooks";
import { MapContainer, useMap } from "@open-pioneer/experimental-ol-map";
import Draw, { createBox } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Geometry, Point, Polygon } from "ol/geom";
import { click, pointerMove } from "ol/events/condition";
import { Select } from "ol/interaction";
import { Feature } from "ol";
import { Icon, Style } from "ol/style";
import { toLonLat, transform } from "ol/proj";
import { Box, Flex, HStack } from "@open-pioneer/chakra-integration";
import { Legend } from "./PopupComponents/Legend";
import { XButton } from "./PopupComponents/XButton";
import { TooltipBox } from "./PopupComponents/TooltipBox";
import { ErrorMessage } from "./PopupComponents/ErrorMessage";
import { CatchmentOptions } from "./CatchmentComponents/CatchmentOptions";
import { CatchmentButton } from "./CatchmentComponents/CatchmentButton";
import { DrawBboxButton } from "./CatchmentComponents/DrawBboxButton";
import { hoverStyle, style, selectStyle } from "./Styles";
import { useSearchState } from "../../SearchState";
import { SearchService } from "../../../../services";
import { computeBBox, createBboxLayer, createCatchmentLayer, intersectsBBox } from "./geometryUtils";
import GeoJSON from "ol/format/GeoJSON";
import dataNew from "../../../../services/hydro90m_basins_combined_v2_webmercator_1perc.json";
import { defaults as defaultInteractions } from "ol/interaction.js";


interface PopupOverlayProps {
    showPopup: boolean;
    onClose: () => void;
    setSelectedOption: (value: string) => void;
    selectedOption: string;
}

export function PopupOverlay({ showPopup, onClose, selectedOption, setSelectedOption }: PopupOverlayProps) {
    const searchSrvc = useService("onestop4all.SearchService") as SearchService;
    const searchState = useSearchState();
    const mapId = "popup";
    const map = useMap(mapId).map;

    //Center to Europe
    useEffect(() => {
        if (!map) return;
        map.getView().setCenter([1169191, 6606967]);
        map.getView().setZoom(4);
    }, [showPopup]);

    const [bboxActive, setBboxActive] = useState(false);
    const [source] = useState(new VectorSource({ wrapX: false }));
    const draw = useRef<Draw>();
    const [tooltipContent, setTooltipContent] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [markerLonLat, setMarkerLonLat] = useState<number[]>();

    const markerSource = new VectorSource();
    const markerVector = new VectorLayer({
        source: markerSource,
        style: new Style({
            image: new Icon({ src: "/marker.svg", anchor: [0.5, 1] })
        })
    });

    // Layer for the bounding boxes
    const [bBoxVectorLayer, setBBoxVectorLayer] = useState(new VectorLayer());
    const [catchmentSource, setCatchmentSource] = useState(new VectorSource());
    const [catchmentBBoxSource, setCatchmentBBoxSource] = useState(new VectorSource());
    const [bBox, setBBox] = useState<Feature<any>[]>();

    // Display the Catchment areas
    const geoJSONFormat = new GeoJSON();
    const features = geoJSONFormat.readFeatures(dataNew, {
        featureProjection: "EPSG:4326"
    });

    const vectorSource = new VectorSource({
        features: features
    });

    const [vectorLayer, setVectorLayer] = useState(
        new VectorLayer({
            source: vectorSource,
            style: function (feature) {
                style.getFill().setColor("rgba(0,0,0,0");
                return style;
            }
        })
    );

    const hoverName = new Select({
        condition: pointerMove,
        style: hoverStyle,
        toggleCondition: function (event) {
            return false;
        },
        layers: [vectorLayer]
    });

    const selectClick = new Select({
        condition: click,
        style: selectStyle
    });

    function addInteraction(newDraw: Draw) {
        draw.current = newDraw;
    
        // Clear previous drawings
        newDraw.on("drawstart", () => {
            source.clear();
        });
    
        newDraw.on("drawend", (event) => {
            const feature = event.feature;
            const geometry = feature.getGeometry() as Polygon;
        
            if (geometry) {
                const coords = geometry.getCoordinates()[0];
                if (!coords) return;
                const geoCoords = coords.map((coord: any) => transform(coord, "EPSG:3857", "EPSG:4326"));
                const intersectingFeatures = intersectsBBox(geoCoords);
                getBBox(intersectingFeatures);
            }
        });
    
        map?.addInteraction(newDraw);
    }

    const [renderState, setRenderState] = useState(false);

    const toggleRenderState = () => setRenderState((prev) => !prev);
    
    useEffect(() => {
        if (!map) return;
        map.render();
        toggleRenderState();
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

    /**Shows BBox containing all selected areas*/
    function getBBox(features: any) {
        cleanUpLayers();
        if (!map) return;

        const coordinates = computeBBox(features);
        const bboxLayer = createBboxLayer(coordinates);

        const source = new VectorSource({
            features: features, // Add intersecting features
        });
    
        const vectorLayer = new VectorLayer({
            source: source,
            style: selectStyle, // Apply select style globally
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
        const transformedGeom = geom.clone().transform(sourceEPSG, "EPSG:4326");
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

    /**HANDLER: Deselects all selectClick and hoverName (hover doesnt work yet)*/
    function deselectAll(): void {
        const selected = selectClick.getFeatures();
        setShowErrorMessage(false);
        if (selected.getLength() > 0) selected.clear();
        const selectedHover = hoverName.getFeatures();
        if (selectedHover.getLength() > 0) selectedHover.clear();
        map?.removeLayer(bBoxVectorLayer);
        setBBoxVectorLayer(new VectorLayer()); // clean up?
        setBBox(undefined);
        markerSource.clear();
        catchmentSource?.clear();
        catchmentBBoxSource?.clear();
        setBboxActive(false);
        //setMarkerLonLat([]);
    }

    /**Remove all but the first two layers */
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
            source: markerSource,
            type: "Point"
        });
        draw.current = newDraw;
        newDraw.on("drawstart", () => markerSource.clear());
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
        markerLonLat ? processCatchment(markerLonLat) : null;
    }

    const processCatchment = async (lonLat: number[]) => {
        setLoading(true);
        try{
            searchSrvc.processCatchment(lonLat)
                .then((response) => {
                    if (response) {
                        const polygon_url = response.outputs.polygon.href;
                        fetch(polygon_url).then((response2) => {
                            response2.json().then((polygon) => {
                                const geoJSONFormat = new GeoJSON();
                                const features = geoJSONFormat.readFeatures(polygon, {
                                    featureProjection: "EPSG:3857"
                                });
                                addCatchmentFeaturesToMap(features, computeBBox(features));
                                setLoading(false);
                            });
                        });
                    } else {
                        setLoading(false);
                        throw new Error("Unexpected response: " + JSON.stringify(response));
                    }
                })
                .catch ((err) => {
                    console.log(err);
                    setLoading(false);
                    setShowErrorMessage(true);
                });
        } catch (error) {
            setLoading(false);
            console.error("Error processing catchment:", error);
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
            cleanUpLayers();
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
                        setTooltipContent(hoverName.getFeatures().item(0).getProperties().rb_name);
                    }
                };
        
                selectClick.on("select", handleSelect);
                hoverName.on("select", handleHover);
        
                return () => {
                    selectClick.un("select", handleSelect);
                };
            }
        /** Upstream catchment mode */
        } else {
            cleanUpLayers();
            deselectAll();
            map?.getInteractions().clear(); // This deletes ALL interactions! (zoom and drag as well)
            defaultInteractions().forEach((interaction) => map?.addInteraction(interaction));
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
    
    const isDeleteActive = (bBox && bBox?.length > 0) || markerSource?.getFeatures().length > 0;

    return (
        <Box className="popup-background-transparent">
            <Box className="popup-background">
                <Box className="popup-header">
                    <b>Select catchment areas</b>
                </Box>

                <Box className="map-container" position="relative">
                    <HStack spacing={4}>
                        <CatchmentOptions onChange={setSelectedOption} selectedOption={selectedOption} />
                    </HStack>

                    {showErrorMessage && <ErrorMessage message="Computation failed! The selected point either resulted in too many subcatchments or is not in Europe."/>}

                    {selectedOption === "full" && (
                        <Box position="absolute" bottom="-45px" right="10px" zIndex="10">
                            <DrawBboxButton bboxActive={bboxActive} onClick={()=>setBboxActive(!bboxActive)} />
                        </Box>
                    )}
                    <MapContainer mapId={mapId} />
                    <TooltipBox content={tooltipContent} />

                    <Box className="legend">
                        <Legend />
                    </Box>
                </Box>

                <XButton handleClose={closeMap} />
                <Flex className="catchment-button-container">
                    <CatchmentButton active={isDeleteActive} onClick={deselectAll} text="Delete selection" />
                    {selectedOption === "upstream" && <CatchmentButton active={markerLonLat && markerLonLat.length > 0 && !loading ? true : false} onClick={getCatchmentWrap} text="Compute catchment" loading={loading}/>}
                    <CatchmentButton active={bBox ? true : false} onClick={setSearchArea} text="Apply bounding box" />
                </Flex>
            </Box>
        </Box>
    );
}