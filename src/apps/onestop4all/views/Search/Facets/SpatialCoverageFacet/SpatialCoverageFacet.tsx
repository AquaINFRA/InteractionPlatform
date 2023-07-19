import { Box, Button, IconButton } from "@open-pioneer/chakra-integration";
import { MapContainer, useMap } from "@open-pioneer/experimental-ol-map";
import { Feature } from "ol";
import { Polygon } from "ol/geom";
import Point from "ol/geom/Point";
import { fromExtent } from "ol/geom/Polygon";
import Draw, { createBox } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PointSelectIcon, RectangleSelectIcon } from "../../../../components/Icons";
import { FacetBase } from "../FacetBase/FacetBase";

const usedEPSGCode = "EPSG:4326";
export function SpatialCoverageFacet() {
    const MAP_ID = "spatial-coverage-map";
    const { map } = useMap(MAP_ID);
    const searchSrv = useService("onestop4all.SearchService");
    const navigate = useNavigate();

    const [currentSpatial] = useState(searchSrv.getSpatialFilter());

    const source = new VectorSource({ wrapX: false });
    const vector = new VectorLayer({
        source: source
    });

    let draw: Draw;

    useEffect(() => {
        if (map) {
            const mapEPSG = map.getView().getProjection().getCode();
            if (currentSpatial.length === 2) {
                const point = new Point(currentSpatial).transform(usedEPSGCode, mapEPSG);
                const pointFeature = new Feature<Point>(point);
                source.addFeature(pointFeature);
            }

            if (currentSpatial.length === 4) {
                const bbox = fromExtent(currentSpatial).transform(usedEPSGCode, mapEPSG);
                const bboxFeature = new Feature<Polygon>(bbox);
                source.addFeature(bboxFeature);
            }

            map.addLayer(vector);
            return () => {
                map.removeLayer(vector);
            };
        }
    }, [map, currentSpatial]);

    function setSearchArea(): void {
        const features = source.getFeatures();
        const geom = features[0]?.getGeometry();
        if (geom && map) {
            const sourceEPSG = map.getView().getProjection().getCode();
            const transformedGeom = geom.clone().transform(sourceEPSG, usedEPSGCode);
            if (transformedGeom instanceof Point) {
                const coords = transformedGeom.getCoordinates();
                searchSrv.setSpatialFilter(coords);
            }
            if (transformedGeom instanceof Polygon) {
                const extent = transformedGeom.getExtent();
                searchSrv.setSpatialFilter(extent);
            }
            searchSrv.navigateToCurrentSearch(navigate);
        }
    }

    function selectBbox(): void {
        if (draw) {
            map?.removeInteraction(draw);
        }
        draw = new Draw({
            source: source,
            type: "Circle",
            geometryFunction: createBox()
        });
        draw.on("drawstart", () => source.clear());
        map?.addInteraction(draw);
    }

    function selectPoint(): void {
        if (draw) {
            map?.removeInteraction(draw);
        }
        draw = new Draw({
            source: source,
            type: "Point"
        });
        draw.on("drawstart", () => source.clear());
        map?.addInteraction(draw);
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
                        onClick={() => selectBbox()}
                        icon={<RectangleSelectIcon />}
                    />
                    <IconButton
                        aria-label="point select"
                        size="xs"
                        position="absolute"
                        zIndex="1000"
                        right="10px"
                        bottom="10px"
                        onClick={() => selectPoint()}
                        icon={<PointSelectIcon />}
                    />
                    <MapContainer mapId={MAP_ID} />
                </Box>
                <Button width="100%" onClick={() => setSearchArea()}>
                    set search area
                </Button>
            </FacetBase>
        </Box>
    );
}
