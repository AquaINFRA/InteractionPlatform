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

import { Fill, Stroke, Style, Circle } from "ol/style.js";
import { click, pointerMove } from "ol/events/condition.js";
import Select from "ol/interaction/Select.js";
// Import other components
import { Box, ButtonGroup } from "@open-pioneer/chakra-integration";
import { Legend } from "./Legend";
import { XButton } from "./XButton";
import { RadioButtons } from "./RadioButtons";
import { SearchButton } from "./SearchButton";
import { GetBBoxButton } from "./GetBBoxButton";
// Import GeoJSON
import GeoJSON, { GeoJSONObject } from "ol/format/GeoJSON";
import dataOld from "../../../../services/basins_eu_hydro_draft_10perc.json";
import dataNew from "../../../../services/hydro90m_basins_combined_v2_webmercator_1perc.json";
import dataNewTopo from "../../../../services/hydro90m_basins_combined_v2_webmercator_1perc_topo.json";

export const lineBlue = "rgba(0, 176, 255, 0.8)";
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

    const mapId = "popup";
    const { map } = useMap(mapId);
    const source = new VectorSource();
    const vector = new VectorLayer({ source: source });
    const olMapRegistry = useService("ol-map.MapRegistry");
    const [renderState, setRenderState] = useState(false);
    const draw = useRef<Draw>();
    const PrimaryColor = "#05668D";

    const [vectorLayer, setVectorLayer] = useState(new VectorLayer({ source: source }));
    const [bBoxVectorLayer, setBBoxVectorLayer] = useState(new VectorLayer());

    const [selectedFeatures, setSelectedFeatures] = useState(false);
    const [displayedBBox, setDisplayedBBox] = useState(false);
    useEffect(() => {
        if (map) {
            map.getView().setCenter([1169191, 6606967]);
            map.getView().setZoom(4);
        }
    }, [showPopup]);

    const geoJSONFormat = new GeoJSON();
    const features = geoJSONFormat.readFeatures(dataNew, {
        featureProjection: "EPSG:4326"
    });

    const style = new Style({
        fill: new Fill({
            color: "#eeeeee"
        }),
        stroke: new Stroke({
            color: lineBlue,
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

    function getBBox() {

        const selectedFeatures = selectClick;
        console.log("Selected features:", selectedFeatures);

        const dummyBBox: GeoJSONObject = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        coordinates: [
                            [
                                [8.735599670457958, 52.62891991717626],
                                [8.735599670457958, 49.473874845712004],
                                [15.396136170854135, 49.473874845712004],
                                [15.396136170854135, 52.62891991717626],
                                [8.735599670457958, 52.62891991717626]
                            ]
                        ],
                        type: "Polygon"
                    }
                }
            ]
        };
        const geoJSONFormat = new GeoJSON();
        const features = geoJSONFormat.readFeatures(dummyBBox, {
            featureProjection: "EPSG:3857"
        });
        const vectorSourceBBox = new VectorSource({
            features: features
        });
        const bBoxStyle = new Style({
            stroke: new Stroke({
                color: "rgba(0, 19, 255, 1)",
                width: 2,
                lineDash: [4],
                lineCap: "square"
            })
        });
        const vectorLayerBBox = new VectorLayer({
            source: vectorSourceBBox,
            style: bBoxStyle
        });

        map?.addLayer(vectorLayerBBox);
        setBBoxVectorLayer(vectorLayerBBox);
        /*activate second button*/
        setDisplayedBBox(true);
    }

    function changeRenderState() {
        if (renderState == true) setRenderState(false);
        else setRenderState(true);
    }
    useEffect(() => {
        if (showPopup) {
            changeRenderState();
        }
    }, [showPopup]);

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

    useEffect(() => {
        if (!showPopup) {
            removeInteraction();
            map?.removeLayer(bBoxVectorLayer);
            clearSelectedFeatures();
        }
    }, [showPopup]);

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

    function handleClose(): void {
        onClose();
        source.clear(); // clears the map
        removeInteraction();
    }

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
        console.log("setSearchArea() wurde aufgerufen!");
    }

    const fill = new Fill({
        color: "rgba(255,255,255,0.4)"
    });
    const stroke = new Stroke({
        color: "#3399CC",
        width: 1.25
    });

    function addPolygon(): void {
        addInteraction(
            new Draw({
                source: source,
                type: "Polygon",
                style: new Style({
                    image: new Circle({
                        fill: fill,
                        stroke: stroke,
                        radius: 5
                    }),
                    fill: fill,
                    stroke: stroke
                })
            })
        );
    }

    const hoverStyle = new Style({
        fill: new Fill({
            color: "rgba(0, 0, 255, 0.2)"
        }),
        stroke: new Stroke({
            color: lineBlue,
            width: 2
        })
    });

    const selectHover = new Select({
        condition: pointerMove,
        style: hoverStyle
    });

    const selectClick = new Select({
        condition: click,
        style: hoverStyle
    });

    function clearSelectedFeatures() {
        const selected = selectClick.getFeatures();
        if (selected.getLength() > 0) selected.clear();
        const hovered = selectHover.getFeatures();
        if (hovered.getLength() > 0) hovered.clear();
    }

    useEffect(() => {
        if (map && showPopup) {
            map.addInteraction(selectHover);
            map.addInteraction(selectClick);
            selectClick.on("select", (e) => {
                setSelectedFeatures(true);
                console.log(e.target.getFeatures());
            });
        } else {
            const selected = selectClick.getFeatures();
            if (selected.getLength() > 0) selected.remove(selected.item(0));
            map?.removeInteraction(selectHover);
            map?.removeInteraction(selectClick);
            setSelectedFeatures(false);
        }
    }, [map, showPopup]);

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
                        <ButtonGroup orientation="vertical" marginTop="2px">
                            <GetBBoxButton active={selectedFeatures} onClick={getBBox} />
                            <SearchButton active={displayedBBox} onClick={setSearchArea} />
                        </ButtonGroup>
                    </Box>
                    <Box marginTop="20px">
                        <Legend />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
