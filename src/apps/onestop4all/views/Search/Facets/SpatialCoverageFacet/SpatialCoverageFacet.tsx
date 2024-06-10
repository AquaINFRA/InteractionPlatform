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
import { QuestionmarkIcon, RectangleSelectIcon } from "../../../../components/Icons";
import { ActiveControlColor, PrimaryColor } from "../../../../Theme";
import { useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";
import { PopupOverlay } from "./PopupOverlay";
import { Questionmark } from "../../../../components/Questionmark";
import { Stroke, Style } from "ol/style";
import { DatasetMetadataResponse } from "../../../Dataset/Dataset";
import {
    SearchResultItem,
    SolrSearchResultItem,
    ZenodoResultItem
} from "../../../../services/SearchService";
import { useService } from "open-pioneer:react-hooks";
import { ResourceType, getResourceType } from "../../../../services/ResourceTypeUtils";

export interface SpatialCoverageFacetProps {
    mapId: string;
}

const usedEPSGCode = "EPSG:4326";

export function SpatialCoverageFacet({ mapId }: SpatialCoverageFacetProps) {
    const { map } = useMap(mapId);

    const searchState = useSearchState();

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
    const searchSrvc = useService("onestop4all.SearchService");
    const draw = useRef<Draw>();

    const [resultsSource] = useState(new VectorSource());
    const [resultsVector] = useState(
        new VectorLayer({
            source: resultsSource
        })
    );
    const [resultsGeometries, setResultsGeometries] = useState([]);
    const [resourceType, setResourceType] = useState<ResourceType>();
    const [searchResult, setSearchResult] = useState<SolrSearchResultItem | ZenodoResultItem>();

    useEffect(() => {
        const displayedResults = searchState.searchResults?.results.slice(
            searchState.pageStart * searchState.pageSize,
            (searchState.pageStart + 1) * searchState.pageSize
        );

        displayedResults?.map((r) => {
            const tmp = resultsGeometries.slice() as any[];
            tmp.push(getGeometry(r));
            console.log(tmp);
        });
    }, [searchState]);

    const getGeometry = (result: SearchResultItem) => {
        searchSrvc.getMetadata(result.id).then((result) => {
            if (result) {
                //no zenodo case
                setSearchResult(result.response);
                setResourceType(getResourceType(result.response.properties.type));
            } else return null;
        });
        switch (resourceType) {
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
                const item = searchResult as DatasetMetadataResponse;
                return item.geometry;
            }
            case ResourceType.Series: {
                const item = searchResult as DatasetMetadataResponse;
                return item.geometry;
            }
            case ResourceType.Model: {
                const item = searchResult as DatasetMetadataResponse;
                return item.geometry;
            }
            case ResourceType.Service: {
                const item = searchResult as DatasetMetadataResponse;
                return item.geometry;
            }
            case ResourceType.DownloadableData: {
                const item = searchResult as DatasetMetadataResponse;
                return item.geometry;
            }
            case ResourceType.OfflineData: {
                const item = searchResult as DatasetMetadataResponse;
                return item.geometry;
            }
            case ResourceType.LiveData: {
                const item = searchResult as DatasetMetadataResponse;
                return item.geometry;
            }
            case ResourceType.Software: {
                return null;
            }
            default:
                throw new Error(`Unknown resourceType: '${resourceType}'`);
        }
    };

    const [bboxActive, setBboxActive] = useState(false);
    const [disabled, setDisable] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (map) {
            map.addLayer(vector);
            map.addLayer(resultsVector);
            return () => {
                map.removeLayer(vector);
            };
        }
    }, [map, vector, resultsVector]);

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

    // Hinzufügen des neuen Layers mit dem Polygon
    useEffect(() => {
        if (map) {
            const dummyExtent = [
                8.313468364098577, 50.00682302553727, 14.250194672173054, 53.08784577957255
            ];
            const dummyFeature = fromExtent(dummyExtent).transform(
                usedEPSGCode,
                map?.getView().getProjection().getCode()
            );

            const polygonFeature = new Feature({
                geometry: dummyFeature
            });

            resultsSource.addFeature(polygonFeature);
        }
    }, [map, source]);

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
                        <IconButton
                            aria-label="rectangle select"
                            size="lg"
                            position="absolute"
                            zIndex="1000"
                            right="10px"
                            bottom="45px"
                            rounded={"lg"}
                            title="Click here to draw a bounding box"
                            bg={bboxActive ? ActiveControlColor : PrimaryColor}
                            onClick={() => selectBbox()}
                            icon={<RectangleSelectIcon />}
                        />
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
