import { Box } from "@open-pioneer/chakra-integration";
import { MapContainer, useMap } from "@open-pioneer/experimental-ol-map";
import Draw, { createBox } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef, useState } from "react";
import { FacetBase } from "../../../../../views/Search/Facets/FacetBase/FacetBase";
import GeoJSON from "ol/format/GeoJSON";
import { Geometry, Point } from "ol/geom";
import Polygon from "ol/geom/Polygon";

import { DeleteBbox } from "../BuilderButtons/DeleteBboxBtn";
import { DrawBboxButton } from "../../../../../views/Search/Facets/SpatialCoverageFacet/CatchmentComponents/DrawBboxButton";
import { Feature } from "ol";
import { Loading } from "./Loading";
import { FeatureInfoBtn } from "../BuilderButtons/FeatureInfoBtn";
import { DrawnBboxVectorLayer, EPSG_CODE_3857, EPSG_CODE_4326, getBbox, getCatchment, PointFeatureVectorLayer, setupProjections, triggerSearch } from "../../../Map/geometryUtils";
import { SearchService } from "../../../../../services";
import { useService } from "open-pioneer:react-hooks";
import { transform } from "ol/proj";
import { FeaturePopupContent } from "./FeaturePopupContent";

setupProjections();

export interface SpatialCoverageFacetProps {
    mapId: string;
    onBboxChange: (bbox: Geometry) => void;
    ogcFeaturesExtent: number[];
    features?: string | null;
    delBbox: boolean;
    isOpen: boolean;
}

const COORDS = [1489200, 6894026, 1489200, 6894026];

export function BBoxMap({ mapId, onBboxChange, ogcFeaturesExtent, features, delBbox, isOpen }: SpatialCoverageFacetProps) {
    const { map } = useMap(mapId);
    const searchSrvc = useService("onestop4all.SearchService") as SearchService;

    const draw = useRef<Draw>();
    
    const [isLoading, setIsLoading] = useState(false);
    const [featuresList, setFeaturesList] = useState<Feature[]>([]);
    const [showSearchButton, setShowSearchButton] = useState(false);
    const [bboxButtonActive, setBboxButtonActive] = useState(false);
    const [infoButtonActive, setInfoButtonActive] = useState(true);
    
    const featuresExtentRef = useRef<VectorLayer<VectorSource> | null>(null);
    const catchmentRef = useRef<VectorSource | null>(null);
    const catchmentExtentRef = useRef<VectorLayer<VectorSource> | null>(null);

    const [catchmentLayer, setCatchmentLayer] = useState<VectorLayer<VectorSource> | null>(null);

    const [selectedFeature, setSelectedFeature] = useState<{ properties: any, coords: number[] } | null>(null);

    const [pointFeaturesSource] = useState(new VectorSource());
    const [pointFeaturesLayer] = useState(PointFeatureVectorLayer(pointFeaturesSource));

    const [bboxSource] = useState(new VectorSource({ wrapX: false }));
    const [bboxLayer] = useState(DrawnBboxVectorLayer(bboxSource));

    //Fetch point features
    useEffect(() => {
        if (!features) return;
        fetchFeatures(features);
    }, [features]);

    useEffect(() => {
        if (isOpen) {
            setInfoButtonActive(true);
        }
    }, [isOpen]);

    //Set features extent 
    useEffect(() => {
        if (!map || !ogcFeaturesExtent || ogcFeaturesExtent.length !== 4) return;

        const extentLayer = getBbox(ogcFeaturesExtent, EPSG_CODE_3857);

        // Remove previous extent layer
        if (featuresExtentRef.current) {
            map.removeLayer(featuresExtentRef.current);
        }

        featuresExtentRef.current = extentLayer;
        map.addLayer(extentLayer);
        map.getView().fit(COORDS, { maxZoom: 2.6 });

        return () => {
            if (featuresExtentRef.current) {
                map.removeLayer(featuresExtentRef.current);
                featuresExtentRef.current = null;
            }
        };
    }, [map, ogcFeaturesExtent]);

    //set drawn bbox
    useEffect(() => {
        if (!map || !bboxLayer) return;

        map.addLayer(bboxLayer);

        return () => {
            map.removeLayer(bboxLayer);
        };
    }, [map, bboxLayer]);

    //add features to map
    useEffect(() => {
        if (!map || !featuresList) return;

        const geoJSONFormat = new GeoJSON();
        const olFeatures = geoJSONFormat.readFeatures(
            {
                type: "FeatureCollection",
                features: featuresList
            },
            {
                featureProjection: EPSG_CODE_3857
            }
        );
        pointFeaturesSource.clear();
        pointFeaturesSource.addFeatures(olFeatures);

        if (!map.getLayers().getArray().includes(pointFeaturesLayer)) {
            map.addLayer(pointFeaturesLayer);
        }

    }, [map, featuresList]);

    useEffect(() => {
        const currentMap = map;
        return () => {
            cleanUp(currentMap);
        };
    }, [map]);

    //Get feature info
    useEffect(() => {
        if (!map) return;

        const handleClick = (evt: any) => {
            if (!infoButtonActive) return;
            map.forEachFeatureAtPixel(evt.pixel, (feature) => {
                const geometry = feature.getGeometry();
                const props = feature.getProperties();

                if (!geometry || !(geometry instanceof Point)) return false;

                const coords3857 = geometry.getCoordinates();
                const coords = transform(coords3857, EPSG_CODE_3857, EPSG_CODE_4326);
                setCatchment(coords);

                setSelectedFeature({
                    properties: props,
                    coords: coords,
                });
                return true;
            });
        };

        map.on("singleclick", handleClick);
        return () => map.un("singleclick", handleClick);
    }, [map, infoButtonActive]);

    useEffect(() => {
        return () => {
            if (catchmentLayer && map) {
                map.removeLayer(catchmentLayer);
            }
        };
    }, [catchmentLayer, map]);

    useEffect(() => {
        if (delBbox) {
            handleDeleteBbox();
            //console.log("deactivate");
            ///setInfoButtonActive(false);
            removeInteraction();
        }
    }, [delBbox]);
    
    const fetchFeatures = async (features: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(features);
            const json = await res.json();
            setFeaturesList(json.features);
        } catch (err) {
            console.log("Error fetching data:", err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const setCatchment = async (lonLat: number[]) => {
        try {
            setIsLoading(true);
            const catchment = await getCatchment(lonLat, searchSrvc);

            if (!map || !catchment || catchment.length === 0) {
                setShowSearchButton(false); // hide button if no catchment
                return;
            }

            // Clear previous catchment
            if (catchmentLayer) {
                map.removeLayer(catchmentLayer);
            }

            const catchmentSource = new VectorSource({
                features: catchment
            });

            catchmentRef.current = catchmentSource;

            const newCatchmentLayer = new VectorLayer({
                source: catchmentSource
            });

            map.addLayer(newCatchmentLayer);
            setCatchmentLayer(newCatchmentLayer);

            // Fit map view to the catchment
            // Remove previous extent layer
            if (catchmentExtentRef.current) {
                map.removeLayer(catchmentExtentRef.current);
            }

            const catchmentExtent = catchmentSource.getExtent();

            if (catchmentExtent) {
                const catchmentExtentLayer = getBbox(catchmentExtent, EPSG_CODE_4326);
                catchmentExtentRef.current = catchmentExtentLayer;
                map.addLayer(catchmentExtentLayer);
            }

            map.getView().fit(catchmentExtent, { maxZoom: 12, padding: [50, 50, 50, 50] });
            setShowSearchButton(true);

        } catch (error) {
            console.error("Error processing catchment:", error);
        } finally {
            setIsLoading(false);
            if (!catchmentRef.current || catchmentRef.current.getFeatures().length === 0) {
                setShowSearchButton(false);
            }
        }
    };

    function addInteraction(newDraw: Draw) {
        removeInteraction();
       
        draw.current = newDraw;
        
        newDraw.on("drawstart", () => {
            bboxSource.clear();
        });
        
        newDraw.on("drawend", (event) => {
            const geometry = event.feature.getGeometry();
            if (geometry && map) {
                const sourceEPSG = map.getView().getProjection().getCode();
                const transformedBbox = geometry.clone().transform(sourceEPSG, EPSG_CODE_4326);
                onBboxChange(transformedBbox);
            }
        });
        
        map?.addInteraction(newDraw);
    }

    function removeInteraction() {
        if (draw.current) {
            map?.removeInteraction(draw.current);
            draw.current = undefined;
        }
    }

    useEffect(() => {
        if (delBbox) {
            handleDeleteBbox();
            setBboxButtonActive(false);
            removeInteraction();
        }
    }, [delBbox]);

    function handleDeleteBbox() {
        bboxSource.clear();
        onBboxChange(new Polygon([]));
    }

    function toggleInfoTool() {
        setInfoButtonActive(prev => {
            const newValue = !prev;

            if (newValue) {
                setBboxButtonActive(false);
                removeInteraction();
            }

            return newValue;
        });
    }

    function toggleDrawTool() {
        setBboxButtonActive(prev => {
            const newValue = !prev;

            if (newValue) {
                setInfoButtonActive(false);

                addInteraction(
                    new Draw({
                        source: bboxSource,
                        type: "Circle",
                        geometryFunction: createBox()
                    })
                );
            } else {
                removeInteraction();
            }

            return newValue;
        });
    }

    function cleanUp(currentMap?: typeof map) {
        if (!currentMap) return;

        currentMap.getInteractions().forEach((interaction) => {
            if (interaction instanceof Draw) {
                currentMap.removeInteraction(interaction);
            }
        });

        draw.current = undefined;

        pointFeaturesSource.clear();

        if (catchmentExtentRef.current) {
            currentMap.removeLayer(catchmentExtentRef.current);
        }

        console.log("cleanUp done");
    }

    return (
        <FacetBase title="Spatial Coverage" expanded={true}>
            <Box position="relative">
                <Box height="20vw" position="relative">
                    {
                        isLoading &&
                            <Loading />
                    }
                    {
                        features && 
                            <Box position="absolute" bottom="20px" right="130px" zIndex="10">
                                <FeatureInfoBtn 
                                    infoActive={infoButtonActive} 
                                    onClick={toggleInfoTool} 
                                />
                            </Box>
                    }
                    <Box position="absolute" bottom="20px" right="70px" zIndex="10">
                        <DrawBboxButton 
                            bboxActive={bboxButtonActive} 
                            onClick={toggleDrawTool} 
                        />
                    </Box>
                    <DeleteBbox onClick={handleDeleteBbox} />
                    <MapContainer mapId={mapId} />
                    {
                        selectedFeature &&
                            <Box
                                position="absolute"
                                top="5px"
                                right="5px"
                                zIndex="1000"
                                backgroundColor={"white"}
                            >
                                <FeaturePopupContent
                                    properties={selectedFeature.properties}
                                    onClick={() => {
                                        triggerSearch(catchmentRef);
                                    }}
                                    showButton={showSearchButton}
                                />
                            </Box>
                    }
                </Box>
            </Box>
        </FacetBase>
    );
}
