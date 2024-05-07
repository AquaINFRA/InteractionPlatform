// Import hooks
import { useEffect, useState, useRef } from "react";
import { useService } from "open-pioneer:react-hooks";
// Import OpenLayers-Map-Stuff
import { MapContainer, useMap } from "@open-pioneer/experimental-ol-map";
import Draw, { createBox } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Polygon } from "ol/geom";
import { defaults as defaultControls, Control } from "ol/control";
import { click, pointerMove } from "ol/events/condition.js";
import Select from "ol/interaction/Select.js";
// Import other components
import { Box, ButtonGroup } from "@open-pioneer/chakra-integration";
import { Legend } from "./Legend";
import { XButton } from "./XButton";
import { CatchmentOptions } from "./CatchmentOptions";
import { SearchButton } from "./SearchButton";
import { GetBBoxButton } from "./GetBBoxButton";
import { DeselectButton } from "./DeselectButton";
// Import Styles
import { hoverStyle, style, selectStyle, bBoxStyle } from "./Styles";
// Import GeoJSON
import GeoJSON from "ol/format/GeoJSON";
//import dataOld from "../../../../services/basins_eu_hydro_draft_10perc.json";
import dataNew from "../../../../services/hydro90m_basins_combined_v2_webmercator_1perc.json";
//import dataNewTopo from "../../../../services/hydro90m_basins_combined_v2_webmercator_1perc_topo.json";
// Search
import { useSearchState } from "../../SearchState";
import { Feature, MapBrowserEvent } from "ol";
import Geometry from "ol/geom";
import { Button } from "@open-pioneer/chakra-integration";
import DragBox from "ol/interaction/DragBox";
import Collection from "ol";
import Interaction from "ol/interaction/Interaction";
// Custom Control Buttons (not used currently)
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
    // console.log("Page reloaded!");
    /********************************Initialization******************************* */
    // Initialize the map
    const mapId = "popup";
    const { map } = useMap(mapId);
    const source = new VectorSource();
    const olMapRegistry = useService("ol-map.MapRegistry");

    // inititalize state
    const [renderState, setRenderState] = useState(false); //hook 11
    const draw = useRef<Draw>();

    const [vectorLayer, setVectorLayer] = useState(new VectorLayer({ source: source }));
    const [bBoxVectorLayer, setBBoxVectorLayer] = useState(new VectorLayer());

    const [areFeaturesSelected, setAreFeaturesSelected] = useState(false); //hook 15
    const [isBBoxDisplayed, setisBBoxDisplayed] = useState(false);

    const searchState = useSearchState();
    const [bBox, setBBox] = useState<Feature<any>[]>();

    const [drawing, setDrawing] = useState(false);

    // console.log(
    //     "Current states: drawing = " +
    //         drawing +
    //         ", areFeaturesSelected = " +
    //         areFeaturesSelected +
    //         ", isBBoxDisplayed =" +
    //         isBBoxDisplayed +
    //         ", selectedAreas = "
    // );

    // Center the map in Europe everytime the Popup gets opened
    useEffect(() => {
        if (map) {
            map.getView().setCenter([1169191, 6606967]);
            map.getView().setZoom(4);
        }
    }, [showPopup]);

    // Display the Catchment areas
    const geoJSONFormat = new GeoJSON();
    const features = geoJSONFormat.readFeatures(dataNew, {
        featureProjection: "EPSG:4326"
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

    /**************************Feature:getBBox & setSearchArea**************** */

    // Shows BBox containing all selected areas
    function getBBox() {
        // 1. Remove all but the first two layers
        const layers = map?.getAllLayers();
        if (map && layers && layers.length > 2) {
            layers.forEach((layer, i) => {
                if (i === 0 || i === 1) {
                    //
                } else {
                    if (layer instanceof VectorLayer) {
                        map.removeLayer(layer);
                    }
                }
            });
        }
        // 2. Compute BBox
        let extentArrays = [] as number[];
        const selectedFeatures = selectClick.getFeatures().getArray();
        selectedFeatures.forEach((area: any) => {
            extentArrays = extentArrays.concat(area.getGeometry().getExtent());
        });

        const xCoordinates = extentArrays.filter((_: any, index: any) => index % 2 === 0); // Even indices
        const yCoordinates = extentArrays.filter((_: any, index: any) => index % 2 !== 0); // Odd indices
        const minX = Math.min(...xCoordinates);
        const maxX = Math.max(...xCoordinates);
        const minY = Math.min(...yCoordinates);
        const maxY = Math.max(...yCoordinates);
        const bbox = [
            [minX, minY],
            [minX, maxY],
            [maxX, maxY],
            [maxX, minY],
            [minX, minY]
        ];
        const coordinates = bbox;
        // 3. Display BBox
        const geojson = {
            type: "Feature",
            properties: {},
            geometry: {
                type: "Polygon",
                coordinates: [coordinates] // Wrap coordinates in an array to represent a polygon
            }
        };
        const geoJSONFormat = new GeoJSON();
        const features = geoJSONFormat.readFeatures(geojson, {
            featureProjection: "EPSG:4326"
        });
        const vectorSourceBBox = new VectorSource({
            features: features
        });
        const vectorLayerBBox = new VectorLayer({
            source: vectorSourceBBox,
            style: bBoxStyle
        });
        // Update map and state
        map?.addLayer(vectorLayerBBox);
        setBBoxVectorLayer(vectorLayerBBox);
        setisBBoxDisplayed(true);
        setBBox(features);
    }
    // HANDLER: Starts a new Search with the spatial filter given by the BBox
    function setSearchArea(): void {
        const features = bBox;
        if (features) {
            const geom = features[0]?.getGeometry();
            if (geom && map) {
                const sourceEPSG = map.getView().getProjection().getCode();
                const transformedGeom = geom.clone().transform(sourceEPSG, "EPSG:4326");
                if (transformedGeom instanceof Polygon) {
                    const extent = transformedGeom.getExtent();
                    handleClose();
                    searchState.setSpatialFilter(extent);
                }
            }
            // console.log("setSearchArea() wurde aufgerufen!");
        }
    }

    /***********************Fix bug where map doesnt render*************************************************** */

    // Re-Renders Map if you re-open the popup
    function toggleRenderState() {
        if (renderState == true) setRenderState(false);
        else setRenderState(true);
    }
    useEffect(() => {
        if (showPopup) {
            toggleRenderState();
        } else {
            removeDraw(); // clean up map after closing
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
    }, [renderState]);

    /*********************************Various Buttons********************************* */
    function removeDraw() {
        if (draw.current) {
            map?.removeInteraction(draw.current);
        }
    }
    // HANDLER: Close the map
    function handleClose(): void {
        onClose();
        source.clear(); // clears the map
        removeDraw();
    }

    // HANDLER: Deselects all selectClick and selectHover (hover doesnt work yet)
    function deselectAll(): void {
        const selected = selectClick.getFeatures();
        if (selected.getLength() > 0) selected.clear();
        const selectedHover = selectHover.getFeatures();
        if (selectedHover.getLength() > 0) selectedHover.clear();
        map?.removeLayer(bBoxVectorLayer);
        setBBoxVectorLayer(new VectorLayer());
        setisBBoxDisplayed(false);
        setAreFeaturesSelected(false);
    }
    /***********************************Selectable Catchment areas ********************/
    // testing stuff
    const falsef = (event: any) => false;
    let condition = pointerMove;
    if (drawing) condition = falsef;

    // SelectHover
    const selectHover = new Select({
        condition: condition,
        style: hoverStyle,
        toggleCondition: function (event) {
            return false;
        },
        layers: [vectorLayer]
    });

    // SelectClick
    const [selectClick, setSelectClick] = useState<Select>(
        new Select({
            condition: click,
            style: selectStyle
        })
    );
    /************************Feature: Draw a box to select multiple areas************************** */
    // HANDLER: draw a box
    function handleSelectBox() {
        return;
    }

    useEffect(() => {
        if (map && showPopup) {
            map.addInteraction(selectHover);
            map.addInteraction(selectClick);
            selectClick.on("select", () => setAreFeaturesSelected(true));
        } else {
            // const selected = selectClick.getFeatures();
            // if (selected.getLength() > 0) selected.remove(selected.item(0));
            map?.removeInteraction(selectHover);
            map?.removeInteraction(selectClick);
            setAreFeaturesSelected(false);
        }
    }, [map, showPopup]);
    /**********************************Return***************************************** */
    if (!showPopup) return null;
    return (
        <Box className="popup-background-transparent">
            <Box className="popup-background">
                <Box height="65%" width="100%">
                    <MapContainer mapId={mapId} />
                </Box>
                <XButton handleClose={handleClose} />
                <Box display="flex" justifyContent="space-around">
                    <Box>
                        {/* <CatchmentOptions /> */}
                        <ButtonGroup orientation="vertical" marginTop="28px" spacing="1">
                            <GetBBoxButton active={areFeaturesSelected} onClick={getBBox} />
                            <DeselectButton
                                active={areFeaturesSelected || isBBoxDisplayed}
                                onClick={deselectAll}
                            />
                            <SearchButton active={isBBoxDisplayed} onClick={setSearchArea} />
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
