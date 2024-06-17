import { Box, Button, IconButton, Tooltip } from "@open-pioneer/chakra-integration";
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
import { ActiveControlColor, PrimaryColor, PrimaryColor40 } from "../../../../Theme";
import { useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";
import { PopupOverlay } from "./PopupOverlay";
import { Questionmark } from "../../../../components/Questionmark";
import { Stroke, Style } from "ol/style";
import { DatasetMetadataResponse } from "../../../Dataset/Dataset";
import { SolrSearchResultItem } from "../../../../services/SearchService";
import { ResourceType, getResourceType } from "../../../../services/ResourceTypeUtils";
import GeoJSON from "ol/format/GeoJSON";
import Select from "ol/interaction/Select.js";
import { hoverStyle, selectStyle } from "./Styles";
import { click, pointerMove } from "ol/events/condition";
import { useNavigate } from "react-router-dom";
import { DrawBboxButton } from "./DrawBboxButton";

export interface SpatialCoverageFacetProps {
    mapId: string;
}

const usedEPSGCode = "EPSG:4326";

export function SpatialCoverageFacet({ mapId }: SpatialCoverageFacetProps) {
    const { map } = useMap(mapId);
    const draw = useRef<Draw>();

    const searchState = useSearchState();

    // VectorLayer to display the Spatial filter
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

    // VectorLayer to display the search results
    const [resultsSource] = useState(new VectorSource());
    const [resultsVector] = useState(
        new VectorLayer({
            source: resultsSource,
            style: new Style({
                stroke: new Stroke({
                    color: PrimaryColor40,
                    width: 1
                })
            })
        })
    );
    //Display search results on map
    let index = 0;
    const maxNumberOfBoxesShown = 20;
    const [idMap, setIdMap] = useState(new Map());
    useEffect(() => {
        // Clear Layer
        resultsSource.clear();
        if (searchState.searchResults) {
            // Compute results that are displayed on the current page
            const displayedResults = searchState.searchResults.results.slice(
                searchState.pageStart * searchState.pageSize,
                (searchState.pageStart + 1) * searchState.pageSize
            );
            displayedResults?.map((r: any) => {
                if (getGeometry(r) != null) {
                    // Convert into features
                    const geoJSONFormat = new GeoJSON();
                    const tmp = geoJSONFormat.readFeatures(getGeometry(r), {
                        featureProjection: "EPSG:3857"
                    });
                    // Save extent-id-pairs in a map
                    idMap.set(getGeometry(r)!.coordinates, r.id);
                    if (index < maxNumberOfBoxesShown) {
                        index++;
                        // Add feature to map
                        for (const t of tmp) {
                            t.setId(r.id);
                            resultsSource.addFeature(t);
                        }
                    }
                }
            });
        }
    }, [searchState.searchResults, resultsSource, searchState.pageStart]);

    const [bboxActive, setBboxActive] = useState(false);
    const [disabled, setDisable] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    // Navigate to a result when the corresponding box is clicked on the map
    function navigateTo(itemId: string): void {
        // calculate result page
        const idx = searchState.searchResults?.results.findIndex((r) => r.id === itemId) || 0;
        const resultPage = idx + 1; //+ searchState.pageSize * searchState.pageStart;
        navigate(`/result/${itemId}`, { state: { resultPage } });
        window.scrollTo(0, 0);
    }
    // Inititalize map layers
    useEffect(() => {
        if (map) {
            map.addLayer(vector);
            map.addLayer(resultsVector);
            map.addInteraction(selectClick);
            map.addInteraction(selectHover);
            selectClick.on("select", () => {
                const selected = selectClick.getFeatures().item(0);
                if (selected.getId() && typeof selected.getId() == "string") {
                    const selectedId = selected.getId() as string;
                    navigateTo(selectedId);
                }
            });
            return () => {
                map.removeLayer(vector);
                map.removeLayer(resultsVector);
                map.removeInteraction(selectClick);
                map.removeInteraction(selectHover);
            };
        }
    }, [map, vector, resultsVector]);

    // Display spatial filter on map
    useEffect(() => {
        if (map && searchState.spatialFilter !== undefined) {
            const mapEPSG = map.getView().getProjection().getCode();
            source.clear();
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

    // Performs a new search with the selected spatial extent
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
    // Toggles the drawing of the bbox
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
    // For all results that have a spatial extent information (i.e. datasets),
    // the function returns this geometry
    function getGeometry(result: SolrSearchResultItem) {
        if (result) {
            //no zenodo case
        } else return null;
        switch (getResourceType(result.properties.type)) {
            case ResourceType.Repos: {
                return null;
            }
            case ResourceType.Organisations: {
                return null;
            }
            case ResourceType.Tools: {
                return null;
            }
            case ResourceType.Standards: {
                return null;
            }
            case ResourceType.Learning_Resource: {
                return null;
            }
            case ResourceType.Articles: {
                return null;
            }
            case ResourceType.Dataset: {
                const item = result as DatasetMetadataResponse;
                return item.geometry;
            }
            case ResourceType.Series: {
                const item = result as DatasetMetadataResponse;
                return item.geometry;
            }
            case ResourceType.Model: {
                const item = result as DatasetMetadataResponse;
                return item.geometry;
            }
            case ResourceType.Service: {
                const item = result as DatasetMetadataResponse;
                return item.geometry;
            }
            case ResourceType.DownloadableData: {
                const item = result as DatasetMetadataResponse;
                return item.geometry;
            }
            case ResourceType.OfflineData: {
                const item = result as DatasetMetadataResponse;
                return item.geometry;
            }
            case ResourceType.LiveData: {
                const item = result as DatasetMetadataResponse;
                return item.geometry;
            }
            case ResourceType.Software: {
                return null;
            }
            default:
                throw new Error(
                    `Unknown resourceType: '${getResourceType(result.properties.type)}'`
                );
        }
    }

    /*************************************Select areas************************* */
    // SelectClick
    const [selectClick, setSelectClick] = useState<Select>(
        new Select({
            condition: click,
            style: selectStyle
        })
    );
    // SelectHover
    const selectHover = new Select({
        condition: pointerMove,
        style: hoverStyle,
        toggleCondition: function (event) {
            return false;
        },
        layers: [resultsVector]
    });

    return (
        <Box>
            <FacetBase title="Spatial Coverage" expanded>
                <Box position="relative">
                    <Box height="300px" marginBottom="16px" position="relative">
                        <Box position="absolute" right="10px" bottom="100px">
                            <Questionmark
                                size="lg"
                                label="Click the button below and draw a bounding box to find resources relevant for that area"
                            />
                        </Box>
                        <DrawBboxButton bboxActive={bboxActive} onClick={selectBbox} />
                        <MapContainer mapId={mapId} />
                    </Box>
                    <Box>
                        <Button width="100%" onClick={() => setSearchArea()}>
                            set search area
                        </Button>
                    </Box>
                    <Button width="100%" onClick={() => setShowPopup(true)} marginTop="8px">
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
