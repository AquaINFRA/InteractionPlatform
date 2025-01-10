import { Box, Container, Divider, Flex, Skeleton } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ResultsNavigation } from "../../components/ResultsNavigation/ResultsNavigation";
import { SearchBar } from "../../components/SearchBar";
import { getResourceType, ResourceType } from "../../services/ResourceTypeUtils";
import { SearchService, SolrSearchResultItem } from "../../services/SearchService";
import { DatasetMetadataResponse, DatasetView } from "../Dataset/Dataset";
import { useSearchState } from "../Search/SearchState";
import { BackToSearchLink } from "../../components/BackToSearchLink/BackToSearchLink";
import { ResourceTypeLabel } from "../../components/ResourceTypeLabel/ResourceTypeLabel";
import { ZenodoMetadataResponse, ZenodoView } from "../Zenodo/Zenodo";
import { DkpView } from "../Zenodo/DkpView";

export function Result() {
    const resultId = useParams().id as string;
    const searchSrvc = useService("onestop4all.SearchService") as SearchService; 
    const [searchResult, setSearchResult] = useState<SolrSearchResultItem | ZenodoMetadataResponse>();
    const [resourceType, setResourceType] = useState<ResourceType>();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [result, setResult] = useState<number>();
    const [resultCount, setResultCount] = useState<number>();
    const searchState = useSearchState();

    useEffect(() => {
        if (history.state && history.state.usr && history.state.usr.resultPage) {
            setResult(history.state.usr.resultPage);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history.state.usr]);

    useEffect(() => {
        setLoading(true);
        searchSrvc.getMetadata(resultId).then((result) => {
            console.log(resultId);
            if (result) {
                if (result.provider === "zenodo") {
                    result.response.provider = "Zenodo";
                    setSearchResult(result.response);
                    console.log(result.response.metadata.keywords);
                    setResourceType(getResourceType(result.response.metadata.resource_type.type));
                    setLoading(false);
                } else if (result.provider?.includes("zenodo")) { //ONLY A TEMPORARY FUNCTION
                    searchSrvc.getMetadataSandbox(resultId).then((result) => {
                        if (result) {
                            //result.response.provider = "Zenodo";
                            setSearchResult(result.response);
                            //console.log(result);
                            setResourceType(getResourceType("data-to-knowledge package"));
                            setLoading(false);
                        }
                    });
                } else {
                    fetch("https://vm4072.kaj.pouta.csc.fi/ddas/oapir/collections/" + result.provider).then((res) => 
                        res.json().then((res) => {
                            result.response.provider = res.description;
                            setSearchResult(result.response);
                            setResourceType(getResourceType(result.response.properties.type));
                            setLoading(false);
                        })
                    );
                    
                }
            } else {
                throw new Error("Unexpected response: " + JSON.stringify(result));
            }
        });
    }, [resultId, searchSrvc]);

    useEffect(() => {
        if (searchState.searchResults) {
            setResultCount(searchState.searchResults.count);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getResourceView(): import("react").ReactNode {
        console.log(resourceType);
        switch (resourceType) {
            case ResourceType.Dataset: {
                if (searchResult?.provider === "Zenodo") {
                    const item = searchResult as ZenodoMetadataResponse;
                    return <ZenodoView item={item} />;
                } else {
                    const item = searchResult as DatasetMetadataResponse;
                    return <DatasetView item={item} />;
                }
            }
            case ResourceType.Series:
            case ResourceType.Model:
            case ResourceType.Service:
            case ResourceType.DownloadableData:
            case ResourceType.OfflineData:
            case ResourceType.LiveData: {
                const item = searchResult as DatasetMetadataResponse;
                return <DatasetView item={item} />;
            }
            case ResourceType.Software:
            case ResourceType.Workflow:
            case ResourceType.Publication:
            case ResourceType.Presentation:
            case ResourceType.Video:
            case ResourceType.Lesson:
            case ResourceType.Other:
            case ResourceType.Image:
            case ResourceType.Poster:
            case ResourceType.PhysicalObject:
            case ResourceType.Event: {
                const item = searchResult as ZenodoMetadataResponse;
                return <ZenodoView item={item} />;
            }
            case ResourceType.DKP: {
                const item = searchResult as ZenodoMetadataResponse;
                return <DkpView item={item} />;
            }
            default:
                throw new Error(`Unknown resourceType: '${resourceType}'`);
        }
    }

    function stepBack(): void {
        if (result) {
            fetchResultId(result - 1);
        }
    }

    function stepForward(): void {
        if (result) {
            fetchResultId(result + 1);
        }
    }

    function stepToEnd(): void {
        if (resultCount) {
            fetchResultId(resultCount);
        }
    }

    function stepToStart(): void {
        if (result) {
            fetchResultId(1);
        }
    }

    function fetchResultId(result: number) {
        const resultId =
            searchState && searchState.searchResults
                ? searchState.searchResults.results[result - 1]?.id
                : null;
        if (resultId) {
            navigate(`/result/${resultId}`, { state: { resultPage: result } });
            setResult(result);
        }
    }

    function renderPaging(): import("react").ReactNode {
        if (result !== undefined && resultCount !== undefined) {
            return (
                <ResultsNavigation
                    result={result}
                    of={resultCount}
                    label_result="result"
                    label_of="of"
                    stepBack={stepBack}
                    stepFoward={stepForward}
                    stepToEnd={stepToEnd}
                    stepToStart={stepToStart}
                />
            );
        } else {
            return <></>;
        }
    }

    return (
        <Box className="search-view">
            <Box position="relative">
                <Box className="header-image" />
            </Box>

            <Box
                position="absolute"
                width="100%"
                marginTop={{ base: "-40px", custombreak: "-50px" }}
            >
                <Container maxW={{ base: "100%", custombreak: "80%" }}>
                    <SearchBar />
                </Container>
            </Box>

            <Box height={{ base: "50px", custombreak: "80px" }} />

            <Container maxW={{ base: "100%", custombreak: "80%" }}>
                {/* Desktop Header */}
                <Flex gap="10%" hideBelow="custombreak">
                    <Box w="65%">
                        <Flex alignItems="center" gap="12px">
                            <BackToSearchLink
                                visible={result !== undefined && resultCount !== undefined}
                            />
                            <Divider className="resTypeHeaderLine" />
                            <ResourceTypeLabel
                                resType={resourceType}
                                loading={loading}
                                iconAlign="right"
                            />
                        </Flex>
                        {loading ? <Skeleton /> : <></>}
                    </Box>
                    <Box w="25%">{renderPaging()}</Box>
                </Flex>

                {/* Mobile Header */}
                <Box hideFrom="custombreak">
                    <Box pt="50px">{renderPaging()}</Box>
                    <Flex alignItems="center" gap="12px" pt={"20px"}>
                        <ResourceTypeLabel
                            resType={resourceType}
                            loading={loading}
                            iconAlign="left"
                        />
                        <Divider />
                    </Flex>
                </Box>

                {/* Content */}
                {loading ? (
                    <></>
                ) : (
                    <>
                        <Box>{getResourceView()}</Box>
                    </>
                )}
                {/* Desktop footer */}
                <Flex gap="10%" alignItems="center" pt="120px" hideBelow="custombreak">
                    <Divider className="seperator" w="65%" />
                    <Box w="25%">{renderPaging()}</Box>
                </Flex>

                {/* Mobile footer */}
                <Box hideFrom="custombreak">
                    <Box pt={"10"}>{renderPaging()}</Box>
                    <Flex alignItems="center" gap="12px" pt="25px">
                        <Divider />
                        <BackToSearchLink
                            visible={result !== undefined && resultCount !== undefined}
                        />
                        <Divider />
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
}
