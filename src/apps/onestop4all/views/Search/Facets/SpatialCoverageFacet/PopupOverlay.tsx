import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    IconButton,
    Radio,
    RadioGroup,
    Stack
} from "@open-pioneer/chakra-integration";
import { CloseIcon } from "@chakra-ui/icons";
import { MapContainer, useMap } from "@open-pioneer/experimental-ol-map";
import Draw, { createBox } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature, View } from "ol";
import { Polygon } from "ol/geom";
import { fromExtent } from "ol/geom/Polygon";
import { remove } from "ol/array";
import { useRef } from "react";
import { select } from "d3";
import { useService } from "open-pioneer:react-hooks";
import { defaults as defaultControls, Control } from "ol/control";
import GeoJSON from "ol/format/GeoJSON";
import data1 from "../../../../services/dummy.json";
import data from "../../../../services/basins_eu_hydro_draft_100perc_orig.json";

interface PopupOverlayProps {
    showPopup: boolean;
    onClose: () => void;
}
export class DrawControl extends Control {
    private handle: () => void;
    constructor(handle: () => void, className: string, buttonText: string) {
        const button = document.createElement("button");
        button.innerHTML = buttonText;
        const element = document.createElement("div");
        element.className = "ol-unselectable ol-control";
        element.classList.add(className);
        element.appendChild(button);
        super({
            element: element
        });
        this.handle = handle;
        button.addEventListener("click", this.handle.bind(this), false);
    }
}
const PopupOverlay: React.FC<PopupOverlayProps> = ({ showPopup, onClose }) => {
    const mapId = "popup";
    const { map } = useMap(mapId);
    const [source] = useState(new VectorSource());
    const [vector] = useState(new VectorLayer({ source: source }));
    const [bboxActive, setBboxActive] = useState(false);
    const draw = useRef<Draw>();
    const [bgcolor, setbgcolor] = useState("grey");
    const [hover, setHover] = useState({
        bg: "grey"
    });
    const PrimaryColor = "#05668D";
    const olMapRegistry = useService("ol-map.MapRegistry");
    const [renderState, setRenderState] = useState(false);

    const [vectorLayer, setVectorLayer] = useState(new VectorLayer({ source: source }));
    map?.getView().setCenter([1169191, 6606967]);
    map?.getView().setZoom(4);

    const geoJSONFormat = new GeoJSON();
    const features = geoJSONFormat.readFeatures(data, {
        featureProjection: "EPSG:3857"
    });

    const vectorSource = new VectorSource({
        features: features
    });

    const vectorLayer2 = new VectorLayer({
        source: vectorSource
    });

    useEffect(() => {
        if (!map) return;
        /*const vectorSource = new VectorSource({
            features: new GeoJSON().readFeatures(data)
        });

        // Create a vector layer
        const newVectorLayer = new VectorLayer({
            source: vectorSource
        });*/

        // Add the vector layer to the map
        map.getLayers().forEach((layer) => {
            if (layer instanceof VectorLayer) {
                map.removeLayer(layer);
            }
        });
        map.addLayer(vectorLayer2);
        setVectorLayer(vectorLayer2);
        // Fetch your GeoJSON file
        /*fetch("src/apps/onestop4all/views/Search/Facets/SpatialCoverageFacet/dummy.geojson")
            .then((response) => response.json())
            .then((data) => {
                // Create a vector source
                const vectorSource = new VectorSource({
                    features: new GeoJSON().readFeatures(data)
                });

                // Create a vector layer
                const newVectorLayer = new VectorLayer({
                    source: vectorSource
                });

                // Add the vector layer to the map
                map.addLayer(newVectorLayer);
                setVectorLayer(newVectorLayer);
            })
            .catch((error) => {
                console.error("Error loading GeoJSON file:", error);
            });
 */
        return () => {
            if (vectorLayer) {
                map.removeLayer(vectorLayer);
            }
        };
    }, [map]);

    const drawPolygonControl = new DrawControl(addPolygon, "draw-polygon", "P");
    map?.addControl(drawPolygonControl);
    const drawCircleControl = new DrawControl(addCircle, "draw-circle", "C");
    map?.addControl(drawCircleControl);
    const drawMarkerControl = new DrawControl(addMarker, "draw-marker", "M");
    map?.addControl(drawMarkerControl);

    // fixes bug where the map is not displayed if the popup is opened for the second time
    function changeRenderState() {
        if (renderState == true) setRenderState(false);
        else setRenderState(true);
    }
    useEffect(() => {
        if (showPopup) {
            changeRenderState();
        }
    }, [showPopup]);
    //re-renders the map everytime the popup is opened
    useEffect(() => {
        const fetchMap = async () => {
            try {
                const map = await olMapRegistry.getMap(mapId);
                map.render();
            } catch (error) {
                console.error("Fehler beim Abrufen der Karte:", error);
            }
        };
        fetchMap();
    }, [renderState]);

    useEffect(() => {
        if (map) {
            map.addLayer(vector);
        }
    }, [map, vector]);

    function addInteraction(newDraw: Draw) {
        removeInteraction();
        draw.current = newDraw;
        newDraw.on("drawstart", () => source.clear());
        newDraw.on("drawend", (event) => {
            const feature = event.feature;
            console.log("Fertig gezeichnet:", feature);
        });
        map?.addInteraction(newDraw);
    }

    function removeInteraction() {
        if (draw.current) {
            map?.removeInteraction(draw.current);
        }
    }

    useEffect(() => {
        if (showPopup) {
            // addInteraction(
            //     new Draw({
            //         source: source,
            //         type: "Circle",
            //         geometryFunction: createBox()
            //     })
            // );
        } else {
            removeInteraction();
        }
    }, [showPopup]);

    function handleClose(): void {
        onClose();
        source.clear(); // clears the map
        setbgcolor("grey");
        setHover({
            bg: "grey"
        });
        removeInteraction();
    }

    function setSearchArea(): void {
        const features = source.getFeatures();
        const geom = features[0]?.getGeometry();
        if (geom && map) {
            const sourceEPSG = map.getView().getProjection().getCode();
            console.log(sourceEPSG);
            const transformedGeom = geom.clone().transform(sourceEPSG, "EPSG:4326");
            if (transformedGeom instanceof Polygon) {
                const extent = transformedGeom.getExtent();
                console.log("Selected extent:", extent);
                // weiterverarbeitung
            }
        }
    }
    // Handler für das Hinzufügen von Polygonen
    function addPolygon(): void {
        addInteraction(
            new Draw({
                source: source,
                type: "Polygon"
            })
        );
        setbgcolor(PrimaryColor);
        setHover({ bg: PrimaryColor });
    }
    // Handler für das Hinzufügen von Kreisen
    function addCircle(): void {
        addInteraction(
            new Draw({
                source: source,
                type: "Circle"
            })
        );
    }
    // Handler für das Hinzufügen von Markern
    function addMarker(): void {
        addInteraction(
            new Draw({
                source: source,
                type: "Point"
            })
        );
    }

    if (!showPopup) return null;
    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100%"
            backgroundColor="rgba(0, 0, 0, 0.6)"
            zIndex="9999"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                width="80%"
                height="80%"
                backgroundColor="white"
                padding="20px"
                position="relative"
            >
                <Box height="80%" width="100%">
                    <MapContainer mapId={mapId} />
                </Box>
                <IconButton
                    position="absolute"
                    top="10px"
                    right="10px"
                    aria-label="Close"
                    onClick={handleClose}
                    icon={<CloseIcon />}
                />
                <RadioGroup defaultValue="default" marginTop="20px">
                    <Stack spacing={5} direction="row">
                        <Radio value="option1">Option 1</Radio>
                        <Radio value="option2">Option 2</Radio>
                        <Radio value="default">Default</Radio>
                    </Stack>
                </RadioGroup>
                <ButtonGroup>
                    {/* <Button height="5vh" width="10vw" fontSize="0.7vw" onClick={addMarker}>
                        Add Marker
                    </Button>
                    <Button height="5vh" width="10vw" fontSize="0.7vw" onClick={addPolygon}>
                        Add Polygon
                    </Button>
                    <Button height="5vh" width="10vw" fontSize="0.7vw" onClick={addCircle}>
                        Add Circle
                    </Button> */}
                    <Button
                        bg={bgcolor}
                        _hover={hover}
                        height="5vh"
                        fontSize="0.7vw"
                        onClick={setSearchArea}
                    >
                        Search for datasets that overlap with this area
                    </Button>
                    <Button height="5vh" width="10vw" fontSize="0.7vw" onClick={handleClose}>
                        Close Popup
                    </Button>
                </ButtonGroup>
            </Box>
        </Box>
    );
};

export default PopupOverlay;
