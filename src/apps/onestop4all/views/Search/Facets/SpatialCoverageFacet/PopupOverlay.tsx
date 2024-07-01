// Import hooks
import { useEffect, useState, useRef } from "react";
import { useService } from "open-pioneer:react-hooks";
// Import OpenLayers-Map-Stuff
import { MapContainer, useMap } from "@open-pioneer/experimental-ol-map";
import Draw, { createBox } from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Geometry, Point, Polygon } from "ol/geom";
import { defaults as defaultControls, Control } from "ol/control";
import { click, pointerMove } from "ol/events/condition.js";
import Select from "ol/interaction/Select.js";
// Import other components
import { Box, ButtonGroup, Flex, Tooltip } from "@open-pioneer/chakra-integration";
import { Legend } from "./Legend";
import { XButton } from "./XButton";
import { CatchmentOptions } from "./CatchmentOptions";
import { CatchmentButton } from "./CatchmentButton";
import { SearchButton } from "./SearchButton";
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
import { defaults as defaultInteractions, defaults } from "ol/interaction.js";
import { Icon, Style } from "ol/style";
import { toLonLat } from "ol/proj";

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
    /********************************Initialization******************************* */
    // Initialize the map
    const mapId = "popup";
    const { map } = useMap(mapId);
    const olMapRegistry = useService("ol-map.MapRegistry");

    // Center the map in Europe everytime the Popup gets opened
    useEffect(() => {
        if (map) {
            map.getView().setCenter([1169191, 6606967]);
            map.getView().setZoom(4);
        }
    }, [showPopup]);

    // inititalize states
    const [renderState, setRenderState] = useState(false); //hook 11

    // Layer for the bounding boxes
    const [bBoxVectorLayer, setBBoxVectorLayer] = useState(new VectorLayer());
    // Layer to draw a marker on (in upstream mode)
    const [markerSource] = useState(new VectorSource());
    const [markerVector] = useState(
        new VectorLayer({
            source: markerSource,
            style: new Style({
                image: new Icon({
                    src: "/marker.svg",
                    anchor: [0.5, 1]
                })
            })
        })
    );
    // Layer to display the upstream catchment areas (response from pygeoapi)
    const [catchmentSource, setCatchmentSource] = useState(new VectorSource());
    const [catchmentLayer, setCatchmentLayer] = useState(new VectorLayer());

    const [bBox, setBBox] = useState<Feature<any>[]>();
    // Booleans
    const [areFeaturesSelected, setAreFeaturesSelected] = useState(false); //hook 15
    const [isBBoxDisplayed, setisBBoxDisplayed] = useState(false);
    const [drawing, setDrawing] = useState(false);
    const [loading, setLoading] = useState(false); // shows if curl request is pending

    const searchState = useSearchState();

    // Tooltip state (content + position)
    const [tooltipContent, setTooltipContent] = useState("");
    const [tooltipPos, setTooltipPos] = useState({ x: "0", y: "0" });

    // Catchment option state (full or upstream catchment)
    const [selectedOption, setSelectedOption] = useState("full");

    // Marker state
    const draw = useRef<Draw>();
    const [markerLon, setMarkerLon] = useState(0);
    const [markerLat, setMarkerLat] = useState(0);

    // Display the Catchment areas
    const geoJSONFormat = new GeoJSON();
    const features = geoJSONFormat.readFeatures(dataNew, {
        featureProjection: "EPSG:4326"
    });

    const vectorSource = new VectorSource({
        features: features
    });

    const [vectorLayer, setVectorLayer] = useState(
        new VectorLayer({
            source: vectorSource,
            style: function (feature) {
                const color = feature.get("COLOR") || "#eeeeee";
                style.getFill().setColor("rgba(0,0,0,0");
                return style;
            }
        })
    );

    useEffect(() => {
        if (!map) return;
        map.getLayers().forEach((layer) => {
            if (layer instanceof VectorLayer) {
                map.removeLayer(layer);
            }
        });
        map.addLayer(vectorLayer);
        return () => {
            if (vectorLayer) {
                map.removeLayer(vectorLayer);
            }
        };
    }, [map]);

    /**************************Feature:getBBox & setSearchArea**************** */

    /**Computes the bounding box of a set of features and returns its coordinates */
    function computeBBox(features: Feature<Geometry>[]) {
        let extentArrays = [] as number[];
        features.forEach((area: any) => {
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
        return bbox;
    }
    /**Remove all but the first two layers */
    function cleanUpLayers(): void {
        const layers = map?.getAllLayers();
        if (map && layers && layers.length > 2) {
            layers.forEach((layer, i) => {
                if (i === 0 || i === 1) {
                    //
                } else {
                    if (layer instanceof VectorLayer && layer != markerVector) {
                        map.removeLayer(layer);
                    }
                }
            });
        }
    }
    /**Shows BBox containing all selected areas*/
    function getBBox() {
        // 1. Remove all but the first two layers
        cleanUpLayers();
        // 2. Compute BBox
        const coordinates = computeBBox(selectClick.getFeatures().getArray());
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
    /**HANDLER: Starts a new search with the spatial filter given by the bbox*/
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
    /**Remove draw interaction */
    function removeDraw() {
        if (draw.current) {
            markerSource.clear();
            map?.removeInteraction(draw.current);
        }
    }
    /**HANDLER: Close the map*/
    function handleClose(): void {
        onClose();
        removeDraw();
    }

    /**HANDLER: Deselects all selectClick and selectHover (hover doesnt work yet)*/
    function deselectAll(): void {
        const selected = selectClick.getFeatures();
        if (selected.getLength() > 0) selected.clear();
        const selectedHover = selectHover.getFeatures();
        if (selectedHover.getLength() > 0) selectedHover.clear();
        map?.removeLayer(bBoxVectorLayer);
        setBBoxVectorLayer(new VectorLayer()); // clean up?
        setisBBoxDisplayed(false);
        setAreFeaturesSelected(false);
        markerSource.clear();
        catchmentSource?.clear();
    }
    /**Adds marker interaction to the map */
    function addMarker(): void {
        removeDraw(); // setting a marker removes the old marker
        const newDraw = new Draw({
            source: markerSource,
            type: "Point"
        });
        draw.current = newDraw;
        newDraw.on("drawstart", () => markerSource.clear());
        /**Get the coordinates of the marker to perform a request */
        newDraw.on("drawend", (event) => {
            const geom = event.feature.getGeometry();
            if (geom instanceof Point) {
                const coords = geom.getCoordinates();
                const lonLat = toLonLat(coords);
                setMarkerLon(lonLat[0]!);
                setMarkerLat(lonLat[1]!);
            }
        });
        map?.addInteraction(newDraw);
    }
    /** Executes getCatchment with the coordinates of the marker */
    function getCatchmentWrap(): void {
        setLoading(true);
        getCatchment(markerLon, markerLat);
    }
    /** Performs a https request to the pygeoapi, the resulting link is then processed */
    const getCatchment = (lon: number, lat: number) => {
        const proxyUrl = "http://localhost:8081/";
        const targetUrl =
            "https://aqua.igb-berlin.de/pygeoapi-dev/processes/get-upstream-dissolved/execution";
        const url = proxyUrl + targetUrl;

        const data = {
            inputs: {
                lon: lon,
                lat: lat,
                comment: "Nordoestliche Schlei, bei Rabenholz"
            }
        };

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log("Result:", result);
                const href = result.outputs.polygon.href;
                fetchGeoJSON(href); // Abrufen des GeoJSON von der href URL
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    /** Performs a https request to the pygeoapi, gets a geoJSON as response */
    const fetchGeoJSON = (url: string) => {
        // clean up?
        const proxyUrl = "http://localhost:8081/";
        const fetchUrl = proxyUrl + url;

        fetch(fetchUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((geojson) => {
                console.log("GeoJSON:", geojson);
                addGeoJSONToMap(geojson);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };
    /** Displays the geoJSON */
    const addGeoJSONToMap = (geojson: any) => {
        setLoading(false);
        const geoJSONFormat = new GeoJSON();
        const features = geoJSONFormat.readFeatures(geojson, {
            featureProjection: "EPSG:3857" // Anpassung der Projektion, falls notwendig
        });

        const catchmentSource = new VectorSource({
            //clean up?
            features: features
        });

        const catchmentLayer = new VectorLayer({
            source: catchmentSource
        });
        setCatchmentSource(catchmentSource);
        setCatchmentLayer(catchmentLayer);
        if (map) {
            map.addLayer(catchmentLayer);
        } else {
            console.error("Map not found!");
        }
    };
    /***********************************Selectable Catchment areas ********************/

    /**Hover over areas to highlight them */
    const selectHover = new Select({
        condition: pointerMove,
        style: hoverStyle,
        toggleCondition: function (event) {
            return false;
        },
        layers: [vectorLayer]
    });

    /**Click to select areas */
    const [selectClick, setSelectClick] = useState<Select>(
        new Select({
            condition: click,
            style: selectStyle
        })
    );
    /************************Manage all interactions************************** */

    useEffect(() => {
        /**Full catchment mode */
        if (map && showPopup && selectedOption == "full") {
            removeDraw();
            // activate selects
            map.addInteraction(selectHover);
            map.addInteraction(selectClick);
            selectClick.on("select", () => {
                setAreFeaturesSelected(true);
                getBBox();
            });

            // Display names when hovered over
            selectHover.on("select", (event) => {
                const xPos = event.mapBrowserEvent.originalEvent.offsetX - 20;
                const yPos = event.mapBrowserEvent.originalEvent.offsetY - 20;
                setTooltipContent("");
                if (selectHover.getFeatures().getLength() > 0) {
                    setTooltipContent(selectHover.getFeatures().item(0).getProperties().rb_name);
                }
                setTooltipPos({
                    x: xPos.toString(),
                    y: yPos.toString()
                });
                // console.log(xPos, yPos);
            });
        } else {
            /** Upstream catchment mode */
            if (map) {
                deselectAll();
                map?.getInteractions().clear(); // This deletes ALL interactions! (zoom and drag as well)
                defaultInteractions().forEach((interaction) => map?.addInteraction(interaction));
                setAreFeaturesSelected(false);
                // Add click interaction for adding/removing markers
                addMarker();
            }
        }
    }, [map, showPopup, selectedOption]);

    useEffect(() => {
        if (map) {
            map.addLayer(markerVector);
        }
    }, [map, markerVector]);
    /**********************************Return***************************************** */
    if (!showPopup) return null;
    return (
        <Box className="popup-background-transparent">
            <Box className="popup-background">
                <Box className="popup-header">
                    <b>Select catchment areas</b>
                </Box>

                <Box className="map-container">
                    <CatchmentOptions
                        onChange={setSelectedOption}
                        selectedOption={selectedOption}
                    />
                    {loading && "Loading..."}
                    <MapContainer mapId={mapId} />
                    <Tooltip
                        label={tooltipContent}
                        isOpen={true}
                        placement="right"
                        bg="white"
                        color="black"
                        border="1px solid black"
                        p="5px"
                        zIndex="9990"
                    >
                        <Box
                            position="absolute"
                            top="10%"
                            right="12%"
                            zIndex="9999"
                            pointerEvents="none"
                            bg="black"
                        ></Box>
                    </Tooltip>

                    <Box className="legend">
                        <Legend />
                    </Box>
                </Box>

                <XButton handleClose={handleClose} />
                <Flex className="catchment-button-container">
                    <CatchmentButton
                        active={
                            areFeaturesSelected ||
                            isBBoxDisplayed ||
                            markerSource?.getFeatures().length > 0
                        }
                        onClick={deselectAll}
                        text="Delete selection"
                    />
                    {selectedOption == "upstream" ? (
                        <CatchmentButton
                            active={true}
                            onClick={getCatchmentWrap}
                            text="Compute catchment"
                        />
                    ) : null}
                    <CatchmentButton
                        active={isBBoxDisplayed}
                        onClick={setSearchArea}
                        text="Apply bounding box"
                    />
                </Flex>
            </Box>
        </Box>
    );
}
