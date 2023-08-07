import { Box, Button, IconButton } from "@open-pioneer/chakra-integration";
import { MapContainer, useMap } from "@open-pioneer/experimental-ol-map";
import { Feature } from "ol";
import { Polygon } from "ol/geom";
import { fromExtent } from "ol/geom/Polygon";
import Draw, { createBox } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef, useState } from "react";

import { RectangleSelectIcon } from "../../../../components/Icons";
import { Active_Control, PrimaryColor } from "../../../../Theme";
import { useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";

const usedEPSGCode = "EPSG:4326";
export function SpatialCoverageFacet() {
    const MAP_ID = "spatial-coverage-map";
    const { map } = useMap(MAP_ID);

    const searchState = useSearchState();

    const [source] = useState(new VectorSource({ wrapX: false }));
    const [vector] = useState(
        new VectorLayer({
            source: source
        })
    );
    const draw = useRef<Draw>();

    const [bboxActive, setBboxActive] = useState(false);

    useEffect(() => {
        if (map) {
            map.addLayer(vector);
            return () => {
                map.removeLayer(vector);
            };
        }
    }, [map, vector]);

    useEffect(() => {
        if (map && searchState.spatialFilter !== undefined) {
            const mapEPSG = map.getView().getProjection().getCode();

            if (searchState.spatialFilter.length === 4) {
                const bbox = fromExtent(searchState.spatialFilter).transform(usedEPSGCode, mapEPSG);
                const bboxFeature = new Feature<Polygon>(bbox);
                source.addFeature(bboxFeature);
            }

            if (searchState.spatialFilter.length === 0) {
                source.clear();
            }
        }
    }, [map, searchState.spatialFilter, source]);

    function setSearchArea(): void {
        const features = source.getFeatures();
        const geom = features[0]?.getGeometry();
        if (geom && map) {
            const sourceEPSG = map.getView().getProjection().getCode();
            const transformedGeom = geom.clone().transform(sourceEPSG, usedEPSGCode);
            if (transformedGeom instanceof Polygon) {
                const extent = transformedGeom.getExtent();
                searchState.setSpatialFilter(extent);
            }
        }
    }

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
        newDraw.on("drawstart", () => source.clear());
        map?.addInteraction(newDraw);
    }

    function removeInteraction() {
        if (draw.current) {
            map?.removeInteraction(draw.current);
        }
    }

    return (
        <Box>
            <FacetBase title="Spatial Coverage" expanded>
                <Box height="300px" marginBottom="16px" position="relative">
                    <IconButton
                        aria-label="rectangle select"
                        size="xs"
                        position="absolute"
                        zIndex="1000"
                        right="10px"
                        bottom="45px"
                        bg={bboxActive ? Active_Control : PrimaryColor}
                        onClick={() => selectBbox()}
                        icon={<RectangleSelectIcon />}
                    />
                    {/* <IconButton
                        aria-label="point select"
                        size="xs"
                        position="absolute"
                        zIndex="1000"
                        right="10px"
                        bottom="10px"
                        onClick={() => selectPoint()}
                        icon={<PointSelectIcon />}
                    /> */}
                    <MapContainer mapId={MAP_ID} />
                </Box>
                <Button width="100%" onClick={() => setSearchArea()}>
                    set search area
                </Button>
            </FacetBase>
        </Box>
    );
}
