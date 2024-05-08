import { Box, Button, IconButton } from "@open-pioneer/chakra-integration";
import { MapContainer, useMap } from "@open-pioneer/experimental-ol-map";
import { Feature } from "ol";
import { Polygon } from "ol/geom";
import { fromExtent } from "ol/geom/Polygon";
import Draw, { createBox } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { useEffect, useRef, useState } from "react";

import { DisableOverlay } from "../../../../components/DisableOverlay/DisableOverlay";
import { RectangleSelectIcon } from "../../../../components/Icons";
import { ActiveControlColor, PrimaryColor } from "../../../../Theme";
import { useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";
import { PopupOverlay } from "./PopupOverlay";

export interface SpatialCoverageFacetProps {
    mapId: string;
}

const usedEPSGCode = "EPSG:4326";

export function SpatialCoverageFacet({ mapId }: SpatialCoverageFacetProps) {
    const { map } = useMap(mapId);

    const searchState = useSearchState();

    const [source] = useState(new VectorSource({ wrapX: false }));
    const [vector] = useState(new VectorLayer({ source: source }));
    const draw = useRef<Draw>();

    const [bboxActive, setBboxActive] = useState(false);
    const [disabled, setDisable] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

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
            source.clear();
            if (searchState.spatialFilter.length === 4) {
                const bbox = fromExtent(searchState.spatialFilter).transform(usedEPSGCode, mapEPSG);
                const bboxFeature = new Feature<Polygon>(bbox);
                source.addFeature(bboxFeature);
            }

            setDisable(searchState.spatialFilterDisabled);

            if (searchState.spatialFilter.length === 0) {
                source.clear();
            }
        }
    }, [map, searchState.spatialFilter, searchState.spatialFilterDisabled, source]);

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
                <Box position="relative">
                    <Box height="300px" marginBottom="16px" position="relative">
                        <IconButton
                            aria-label="rectangle select"
                            size="xs"
                            position="absolute"
                            zIndex="1000"
                            right="10px"
                            bottom="45px"
                            bg={bboxActive ? ActiveControlColor : PrimaryColor}
                            onClick={() => selectBbox()}
                            icon={<RectangleSelectIcon />}
                        />
                        <MapContainer mapId={mapId} />
                    </Box>
                    <Box id="popupOverlay1">
                        <Button width="100%" onClick={() => setSearchArea()}>
                            set search area
                        </Button>
                    </Box>
                    <Button
                        width="100%"
                        onClick={() => setShowPopup(true)}
                        marginTop="8px" // Fügt einen Abstand zwischen den Buttons hinzu
                    >
                        set catchment area
                    </Button>
                    {disabled && (
                        <DisableOverlay label="The spatial filter is disabled because the current selection does not have spatial information."></DisableOverlay>
                    )}
                    <PopupOverlay showPopup={showPopup} onClose={() => setShowPopup(false)} />
                </Box>
            </FacetBase>
        </Box>
    );
}
