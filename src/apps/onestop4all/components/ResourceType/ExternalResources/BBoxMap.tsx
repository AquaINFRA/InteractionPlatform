import { Box } from "@open-pioneer/chakra-integration";
import { MapContainer, useMap } from "@open-pioneer/experimental-ol-map";
import Draw, { createBox } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef, useState } from "react";
import { Stroke, Style } from "ol/style";
import { FacetBase } from "../../../views/Search/Facets/FacetBase/FacetBase";
import { DrawBboxButton } from "../../../views/Search/Facets/SpatialCoverageFacet/DrawBboxButton";
import { DeleteBbox } from "./DeleteBbox";

export interface SpatialCoverageFacetProps {
    mapId: string;
    onBboxChange: (bbox: number[]) => void;
}

const usedEPSGCode = "EPSG:4326";

export function BBoxMap({ mapId, onBboxChange }: SpatialCoverageFacetProps) {
    const { map } = useMap(mapId);
    const draw = useRef<Draw>();

    const coords = [1489200, 6894026, 1489200, 6894026];

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

    const [bboxActive, setBboxActive] = useState(false);

    useEffect(() => {
        if (map) {
            map.addLayer(vector);
            map.getView().fit(coords, { maxZoom: 2.6 });
            return () => {
                map.removeLayer(vector);
            };
        }
    }, [map, vector]);

    function selectBbox(): void {
        if (bboxActive) {
            removeInteraction();
            setBboxActive(false);
        } else {
            addInteraction(
                new Draw({
                    source: source,
                    type: "Circle",
                    geometryFunction: createBox(),
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
                const transformedBbox = geometry.clone().transform(sourceEPSG, usedEPSGCode);
                onBboxChange(transformedBbox.getExtent());
            }
        });
        map?.addInteraction(newDraw);
    }

    function removeInteraction() {
        if (draw.current) {
            map?.removeInteraction(draw.current);
        }
        source.clear();
    }

    function handleDeleteBbox() {
        removeInteraction();
        setBboxActive(false);
        onBboxChange([]);
    }

    return (
        <Box>
            <FacetBase title="Spatial Coverage" expanded={true}>
                <Box position="relative">
                    <Box height="200px" marginBottom="16px" position="relative">
                        <DrawBboxButton bboxActive={bboxActive} onClick={selectBbox} />
                        <DeleteBbox onClick={handleDeleteBbox} />
                        <MapContainer mapId={mapId} />
                    </Box>
                </Box>
            </FacetBase>
        </Box>
    );
}
