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

import Feature from "ol/Feature";

import { USED_EPSG_CODE } from "../../../../../views/Search/Facets/SpatialCoverageFacet/SpatialCoverageFacet";
import { DeleteBbox } from "../BuilderButtons/DeleteBboxBtn";
import { setupProjections } from "../../../Map/mapUtils";
import { DrawBboxButton } from "../../../../../views/Search/Facets/SpatialCoverageFacet/CatchmentComponents/DrawBboxButton";

setupProjections();

export interface SpatialCoverageFacetProps {
    mapId: string;
    onBboxChange: (bbox: Geometry) => void;
    ogcFeaturesExtent: number[];
}

export function BBoxMap({ mapId, onBboxChange, ogcFeaturesExtent }: SpatialCoverageFacetProps) {
    const { map } = useMap(mapId);
    const draw = useRef<Draw>();

    const [bboxActive, setBboxActive] = useState(false);

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

    const [featuresList, setFeaturesList] = useState<Feature[]>([]);

    const fetchFeatures = async (features: string) => {
        try {
            const res = await fetch(features);
            const json = await res.json();
            setFeaturesList(json.features);
        } catch (err) {
            console.log("Error fetching data:", err);
        }

    };

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
            };
        }
    }, [map, vector, ogcFeaturesExtent]);
    

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

    function handleDeleteBbox() {
        removeInteraction();
        source.clear();
        onBboxChange(new Polygon([]));
        setBboxActive(false);
    }

    return (
        <FacetBase title="Spatial Coverage" expanded={true}>
            <Box position="relative">
                <Box height="200px" position="relative">
                    <Box position="absolute" bottom="75px" right="10px" zIndex="10">
                        <DrawBboxButton bboxActive={bboxActive} onClick={selectBbox} />
                    </Box>
                    <DeleteBbox onClick={handleDeleteBbox} />
                    <MapContainer mapId={mapId} />
                </Box>
            </Box>
        </FacetBase>
    );
}
