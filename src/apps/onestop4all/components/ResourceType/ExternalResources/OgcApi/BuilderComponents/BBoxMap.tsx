import { Box } from "@open-pioneer/chakra-integration";
import { MapContainer, useMap } from "@open-pioneer/experimental-ol-map";
import Draw, { createBox } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef, useState } from "react";
import { Stroke, Style } from "ol/style";
import { FacetBase } from "../../../../../views/Search/Facets/FacetBase/FacetBase";
import GeoJSON from "ol/format/GeoJSON";
import { Geometry, Polygon } from "ol/geom";
import Overlay from "ol/Overlay";

import { USED_EPSG_CODE } from "../../../../../views/Search/Facets/SpatialCoverageFacet/SpatialCoverageFacet";
import { DeleteBbox } from "../BuilderButtons/DeleteBboxBtn";
import { setupProjections } from "../../../Map/mapUtils";
import { DrawBboxButton } from "../../../../../views/Search/Facets/SpatialCoverageFacet/CatchmentComponents/DrawBboxButton";
import { Feature } from "ol";
import { Loading } from "./Loading";
import { FeatureInfoBtn } from "../BuilderButtons/FeatureInfoBtn";

setupProjections();

export interface SpatialCoverageFacetProps {
    mapId: string;
    onBboxChange: (bbox: Geometry) => void;
    ogcFeaturesExtent: number[];
    features?: string | null;
    delBbox: boolean;
}

export function BBoxMap({ mapId, onBboxChange, ogcFeaturesExtent, features, delBbox }: SpatialCoverageFacetProps) {
    const { map } = useMap(mapId);
    const draw = useRef<Draw>();
    const [isLoading, setIsLoading] = useState(false);

    const [bboxActive, setBboxActive] = useState(false);
    const [featuresList, setFeaturesList] = useState<Feature[]>([]);
    
    const extentLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<Overlay | null>(null);

    const [featuresSource] = useState(new VectorSource());
    const [featuresLayer] = useState(
        new VectorLayer({
            source: featuresSource
        })
    );

    const [source] = useState(new VectorSource({ wrapX: false }));
    const [vector] = useState(
        new VectorLayer({
            source: source,
            style: new Style({
                stroke: new Stroke({
                    color: "black",
                    width: 2
                })
            })
        })
    );

    useEffect(() => {
        const coords = [1489200, 6894026, 1489200, 6894026];
        if (map) {
            if (ogcFeaturesExtent && ogcFeaturesExtent.length === 4) {
                const polygonCoords = [
                    [
                        [ogcFeaturesExtent[0], ogcFeaturesExtent[1]],
                        [ogcFeaturesExtent[2], ogcFeaturesExtent[1]],
                        [ogcFeaturesExtent[2], ogcFeaturesExtent[3]],
                        [ogcFeaturesExtent[0], ogcFeaturesExtent[3]],
                        [ogcFeaturesExtent[0], ogcFeaturesExtent[1]] 
                    ]
                ];
                const geometry = { type: "Polygon", coordinates: polygonCoords };
                const geoJSONFormat = new GeoJSON();
                const features = geoJSONFormat.readFeatures(geometry, {
                    featureProjection: "EPSG:3857"
                });
    
                const vectorSource = new VectorSource({
                    features: features
                });
    
                const vectorLayer = new VectorLayer({
                    source: vectorSource
                });
    
                const allLayers = map.getAllLayers();

                if (allLayers.length === 2 && allLayers[1]) {
                    map.removeLayer(allLayers[1]);
                }
                
                if (vectorLayer) {
                    extentLayerRef.current = vectorLayer;
                    map.addLayer(vectorLayer);
                }
            }

            if (vector) {
                map.addLayer(vector);
            }

            map.getView().fit(coords, { maxZoom: 2.6 });
            
            return () => {
                if (vector) {
                    map.removeLayer(vector);
                }
                if (extentLayerRef.current) {
                    map.removeLayer(extentLayerRef.current);
                    extentLayerRef.current = null;
                }
                if (draw.current) {
                    map.removeInteraction(draw.current);
                    draw.current = undefined;
                }
            };
        }
    }, [map, vector, ogcFeaturesExtent]);

    useEffect(() => {
        if (!features) return;
        fetchFeatures(features);
    }, [features]);

    useEffect(() => {

        if (!map || !featuresList) return;

        const geoJSONFormat = new GeoJSON();

        const olFeatures = geoJSONFormat.readFeatures(
            {
                type: "FeatureCollection",
                features: featuresList
            },
            {
                featureProjection: "EPSG:3857"
            }
        );
        featuresSource.clear();
        featuresSource.addFeatures(olFeatures);

        if (!map.getLayers().getArray().includes(featuresLayer)) {
            map.addLayer(featuresLayer);
        }

    }, [map, featuresList]);

    const [infoActive, setInfoActive] = useState(false);
    useEffect(() => {
        if (!map || !popupRef.current) return;

        // create overlay
        const overlay = new Overlay({
            element: popupRef.current,
            positioning: "bottom-center",
            stopEvent: false,
            offset: [0, -10]
        });

        overlayRef.current = overlay;
        map.addOverlay(overlay);

        const handleClick = (evt: any) => {
            console.log(infoActive);
            if (!infoActive) return;
            let featureFound = false;

            map.forEachFeatureAtPixel(evt.pixel, (feature) => {
                featureFound = true;

                const properties = feature.getProperties();
                console.log(properties);

                popupRef.current!.innerHTML = `
                    <strong>Feature Info</strong><br/>
                    ${Object.entries(properties)
        .filter(([k]) => k !== "geometry" /*&& 
            k !== "visit_date" && 
            k !== "longitude" && 
            k !== "latitude" &&
            k !== "color_id"*/
        )
        .map(([k, v]) => `${k}: ${v}`)
        .join("<br/>")}
                `;

                overlay.setPosition(evt.coordinate);
                return true;
            });

            if (!featureFound) {
                overlay.setPosition(undefined); // hide popup
            }
        };

        map.on("singleclick", handleClick);

        return () => {
            map.un("singleclick", handleClick);
            map.removeOverlay(overlay);
        };
    }, [map, infoActive]);
    
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

    function selectBbox(): void {
        if (bboxActive) {
            removeInteraction();
            setBboxActive(false);
        } else {
            addInteraction(
                new Draw({
                    source: source,
                    type: "Circle",
                    geometryFunction: createBox()
                })
            );
            setBboxActive(true);
        }
    }

    function addInteraction(newDraw: Draw) {
        removeInteraction();
        draw.current = newDraw;
        newDraw.on("drawstart", () => {
            source.clear();
        });
        newDraw.on("drawend", (event) => {
            const geometry = event.feature.getGeometry();
            if (geometry && map) {
                const sourceEPSG = map.getView().getProjection().getCode();
                const transformedBbox = geometry.clone().transform(sourceEPSG, USED_EPSG_CODE);
                onBboxChange(transformedBbox);
            }
        });
        map?.addInteraction(newDraw);
    }

    function removeInteraction() {
        if (draw.current) {
            map?.removeInteraction(draw.current);
        }
    }

    useEffect(() => {
        if (delBbox) {
            handleDeleteBbox();
            setBboxActive(false);
            removeInteraction();
        }
    }, [delBbox]);

    function handleDeleteBbox() {
        source.clear();
        onBboxChange(new Polygon([]));
    }

    function toggleInfoTool() {
        setInfoActive(prev => {
            const newValue = !prev;

            if (newValue) {
                setBboxActive(false);
                removeInteraction();
            }

            return newValue;
        });
    }

    function toggleDrawTool() {
        setBboxActive(prev => {
            const newValue = !prev;

            if (newValue) {
                setInfoActive(false);

                addInteraction(
                    new Draw({
                        source: source,
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

    return (
        <FacetBase title="Spatial Coverage" expanded={true}>
            <Box position="relative">
                <Box height="350px" position="relative">
                    {isLoading && (
                        <Loading />
                    )}
                    <Box position="absolute" bottom="130px" right="10px" zIndex="10">
                        <FeatureInfoBtn infoActive={infoActive} onClick={toggleInfoTool} />
                    </Box>
                    <Box position="absolute" bottom="75px" right="10px" zIndex="10">
                        <DrawBboxButton bboxActive={bboxActive} onClick={toggleDrawTool} />
                    </Box>
                    <DeleteBbox onClick={handleDeleteBbox} />
                    <MapContainer mapId={mapId} />
                    <div
                        ref={popupRef}
                        style={{
                            position: "absolute",
                            background: "white",
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid black",
                            minWidth: "150px"
                        }}
                    />
                </Box>
            </Box>
        </FacetBase>
    );
}
