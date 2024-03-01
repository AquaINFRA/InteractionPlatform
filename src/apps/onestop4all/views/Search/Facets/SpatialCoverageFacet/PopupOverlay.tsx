// Import hooks
import { useEffect, useState, useRef } from "react";
import { useService } from "open-pioneer:react-hooks";
// Import OpenLayers-Map
import { MapContainer, useMap } from "@open-pioneer/experimental-ol-map";
import Draw from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Polygon } from "ol/geom";
import { defaults as defaultControls, Control } from "ol/control";
import { intersects } from "ol/extent";
import View from "ol";

import { Fill, Stroke, Style } from "ol/style.js";
import { altKeyOnly, click, pointerMove } from "ol/events/condition.js";
import Select from "ol/interaction/Select.js";
// Import other components
import { Box, ButtonGroup } from "@open-pioneer/chakra-integration";
import { Legend } from "./Legend";
import { XButton } from "./XButton";
import { RadioButtons } from "./RadioButtons";
import { SearchButton } from "./SearchButton";
import { GetBboxButton } from "./GetBboxButton";
// Import GeoJSON
import GeoJSON from "ol/format/GeoJSON";
import data from "../../../../services/basins_eu_hydro_draft_10perc.json";

// Custom OpenLayer-styled control class
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
interface PopupOverlayProps {
    showPopup: boolean;
    onClose: () => void;
}

export function PopupOverlay({ showPopup, onClose }: PopupOverlayProps) {
    /* *********************************Initializing***************************************/

    // Initialize the map
    const mapId = "popup";
    const { map } = useMap(mapId);
    const source = new VectorSource();
    const vector = new VectorLayer({ source: source });
    const olMapRegistry = useService("ol-map.MapRegistry");
    const [renderState, setRenderState] = useState(false);
    const draw = useRef<Draw>();
    const PrimaryColor = "#05668D";

    const [vectorLayer, setVectorLayer] = useState(new VectorLayer({ source: source }));
    // Center the Map in Europe
    useEffect(() => {
        // useEffect to center the map just at the start
        if (map) {
            map.getView().setCenter([1169191, 6606967]);
            map.getView().setZoom(4);
        }
    }, [showPopup]);

    // Read the GeoJSON
    const geoJSONFormat = new GeoJSON();
    const features = geoJSONFormat.readFeatures(data, {
        featureProjection: "EPSG:3857"
    });

    // Create Array with only the Features that are within the maps extend
    function filterFeatures() {
        console.log("filterFeatures");
        const visibleFeatures: any[] = [];
        if (map) {
            // Get map extent
            const mapExtent = map.getView().calculateExtent(map.getSize());

            // filter features

            features.forEach((feature) => {
                // Check if feature is within extent
                const featureGeometry = feature.getGeometry()!;
                if (intersects(mapExtent, featureGeometry.getExtent())) {
                    visibleFeatures.push(feature);
                }
            });
        }
        //console.log("Angezeigte Features: " + visibleFeatures.length);

        return visibleFeatures;
    }
    // Update the map
    function reloadFeatures() {
        if (!map) return;
        map.getLayers().forEach((layer) => {
            if (layer instanceof VectorLayer) {
                map.removeLayer(layer);
            }
        });
        const vectorSourceFilter = new VectorSource({
            features: filterFeatures()
        });

        const vectorLayerFilter = new VectorLayer({
            source: vectorSourceFilter
        });
        map.addLayer(vectorLayerFilter);
        setVectorLayer(vectorLayerFilter);
        console.log("Reload");
    }

    // // Listen to "moveend" event
    // map?.on("moveend", (event) => {
    //     reloadFeatures();
    // });

    const style = new Style({
        fill: new Fill({
            color: "#eeeeee"
        }),
        stroke: new Stroke({
            color: "rgba(0, 176, 255, 0.8)",
            width: 1
        })
    });

    const vectorSource = new VectorSource({
        features: features
    });

    const vectorLayer2 = new VectorLayer({
        source: vectorSource,
        style: function (feature) {
            const color = feature.get("COLOR") || "#eeeeee";
            style.getFill().setColor("rgba(0,0,0,0");
            return style;
        }
    });

    // Clear map and add layer with the geoJSON-features
    useEffect(() => {
        if (!map) return;
        map.getLayers().forEach((layer) => {
            if (layer instanceof VectorLayer) {
                map.removeLayer(layer);
            }
        });
        map.addLayer(vectorLayer2);
        setVectorLayer(vectorLayer2);
        return () => {
            if (vectorLayer) {
                map.removeLayer(vectorLayer);
            }
        };
    }, [map]);

    /************************************************************************** */

    // add OpenLayer-styled control buttons for drawing
    const drawPolygonControl = new DrawControl(addPolygon, "draw-polygon", "P");
    map?.addControl(drawPolygonControl);
    const drawCircleControl = new DrawControl(addCircle, "draw-circle", "C");
    map?.addControl(drawCircleControl);
    const drawMarkerControl = new DrawControl(addMarker, "draw-marker", "M");
    map?.addControl(drawMarkerControl);

    // **************************useEffect-hooks******************************************

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
    }, [changeRenderState]);

    // Adds new Layer to draw on
    // useEffect(() => {
    //     if (map) {
    //         map.addLayer(vector);
    //     }
    // }, [map, vector]);

    // Removes Interactions after closing the Popup
    useEffect(() => {
        if (!showPopup) {
            removeInteraction();
        }
    }, [showPopup]);

    //*************************Drawing logic*********************************** */

    //Adds Interaction-object for drawing
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
    //Removes Interaction-object
    function removeInteraction() {
        if (draw.current) {
            map?.removeInteraction(draw.current);
        }
    }

    /**********************handler for buttons************************* */

    // Handler for the close-buttons
    function handleClose(): void {
        onClose();
        source.clear(); // clears the map
        removeInteraction();
    }
    // Handler for the search-button
    function setSearchArea(): void {
        const features = source.getFeatures();
        const geom = features[0]?.getGeometry();
        if (geom && map) {
            const sourceEPSG = map.getView().getProjection().getCode();
            console.log("sourceEPSG:" + sourceEPSG);
            const transformedGeom = geom.clone().transform(sourceEPSG, "EPSG:4326");
            if (transformedGeom instanceof Polygon) {
                const extent = transformedGeom.getExtent();
                console.log("Selected extent:", extent);
                // weiterverarbeitung
            }
        }
    }
    // Handler for adding polygons
    function addPolygon(): void {
        addInteraction(
            new Draw({
                source: source,
                type: "Polygon"
            })
        );
    }
    // Handler for adding circles
    function addCircle(): void {
        addInteraction(
            new Draw({
                source: source,
                type: "Circle"
            })
        );
    }
    // Handler for adding markers
    function addMarker(): void {
        addInteraction(
            new Draw({
                source: source,
                type: "Point"
            })
        );
    }

    /*****************************return ************************************** */

    if (!showPopup) return null;
    return (
        <Box className="popup-background-transparent">
            <Box className="popup-background">
                <Box height="80%" width="100%">
                    <MapContainer mapId={mapId} />
                </Box>
                <XButton handleClose={handleClose} />
                <Box display="flex" justifyContent="space-around">
                    <Box>
                        <RadioButtons />
                        <ButtonGroup>
                            <GetBboxButton onClick={filterFeatures} />
                            <SearchButton onClick={setSearchArea} active={true} />
                        </ButtonGroup>
                    </Box>
                    <Box marginTop="20px">
                        <Legend />
                        {/* <Button height="5vh" width="10vw" fontSize="0.7vw" onClick={handleClose}>
                            Close Popup
                        </Button> */}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
