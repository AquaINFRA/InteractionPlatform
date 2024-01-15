import { Box, Button, Container, Flex, Spacer } from "@open-pioneer/chakra-integration";
import { useEffect, useRef, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

import { FilterIcon } from "../../components/Icons";
import { SearchBar } from "../../components/SearchBar";
import { BorderColor, PrimaryColor } from "../../Theme";
import { Chips } from "./Chips/Chips";
import { MobileFilterMenu } from "./Facets/MobileFilterMenu/MobileFilterMenu";
import { ResourceTypeFacet } from "./Facets/ResourceTypeFacet/ResourceTypeFacet";
import { SpatialCoverageFacet } from "./Facets/SpatialCoverageFacet/SpatialCoverageFacet";
import { SubjectFacet } from "./Facets/SubjectFacet/SubjectFacet";
import { DataProviderFacet } from "./Facets/DataProviderFacet/DataProviderFacet";
import { TemporalCoverageFacet } from "./Facets/TemporalCoverageFacet/TemporalCoverageFacet";
import { ResultCountSelector } from "./ResultCountSelector/ResultCountSelector";
import { ResultPaging } from "./ResultPaging/ResultPaging";
import { SearchResult } from "./SearchResult/SearchResult";
import { UrlSearchParameterType, UrlSearchParams, useSearchState } from "./SearchState";
//import { SortedBySelector } from "./SortedBySelector/SortedBySelector";

export function SearchView() {
    const searchState = useSearchState();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => searchState.search(), [searchParams]);

    useEffect(() => {
        const params: UrlSearchParams = {};

        if (searchState.searchTerm) {
            params[UrlSearchParameterType.Searchterm] = searchState.searchTerm;
        }

        if (searchState.selectedResourceTypes.length > 0) {
            params[UrlSearchParameterType.ResourceType] = searchState.selectedResourceTypes;
        }

        if (searchState.selectedSubjects.length > 0) {
            params[UrlSearchParameterType.Subjects] = searchState.selectedSubjects;
        }

        if (searchState.spatialFilter.length === 4) {
            params[UrlSearchParameterType.SpatialFilter] = searchState.spatialFilter.join(",");
        }

        if (searchState.pageSize && searchState.pageSize !== 10) {
            params[UrlSearchParameterType.PageSize] = `${searchState.pageSize}`;
        }

        if (searchState.pageStart && searchState.pageStart !== 0) {
            params[UrlSearchParameterType.PageStart] = `${searchState.pageStart}`;
        }

        if (searchState.temporalFilter) {
            params[
                UrlSearchParameterType.TemporalFilter
            ] = `${searchState.temporalFilter.startYear},${searchState.temporalFilter.endYear}`;
        }

        if (searchState.sorting) {
            params[UrlSearchParameterType.SortingFilter] = `${searchState.sorting.term}`;
        }

        if (searchState.selectedDataProvider.length > 0) {
            params[UrlSearchParameterType.DataProvider] = searchState.selectedDataProvider;
        }

        navigate({
            pathname: "/search",
            search: `?${createSearchParams({ ...params })}`
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        searchState.searchTerm,
        searchState.selectedResourceTypes,
        searchState.selectedSubjects,
        searchState.spatialFilter,
        searchState.pageSize,
        searchState.pageStart,
        searchState.temporalFilter,
        searchState.sorting,
        searchState.selectedDataProvider
    ]);

    const [openMenu, setOpenMenu] = useState(false);

    const menu = useRef(null);
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
                    <SearchBar></SearchBar>
                </Container>
            </Box>

            <Box height={{ base: "50px", custombreak: "80px" }}></Box>

            <Container maxW={{ base: "100%", custombreak: "80%" }}>
                <Flex gap="5vw">
                    {searchState.isLoaded ? (
                        <Box flex="1 1 100%" overflow="hidden">
                            <Flex flexDirection={{ base: "column", custombreak: "row" }}>
                                <Box className="results-count">
                                    {searchState.searchResults?.count} Results for your search
                                </Box>
                                <Box hideFrom="custombreak" padding="20px 0px">
                                    <ResultPaging />
                                </Box>
                                <Spacer></Spacer>
                                <Flex
                                    gap="10px"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    padding={{ base: "0 0 15px", custombreak: "0" }}
                                >
                                    <ResultCountSelector />
                                    <Box flex="0 0 1px" bgColor={BorderColor} alignSelf="stretch" />
                                    {/*<SortedBySelector />*/}
                                    <Box
                                        flex="0 0 1px"
                                        bgColor={BorderColor}
                                        alignSelf="stretch"
                                        hideFrom="custombreak"
                                    />
                                    <Box hideFrom="custombreak">
                                        <Button
                                            leftIcon={<FilterIcon />}
                                            variant="ghost"
                                            color={PrimaryColor}
                                            onClick={() => setOpenMenu(true)}
                                        >
                                            Filter
                                        </Button>
                                    </Box>
                                </Flex>
                            </Flex>
                            <Box hideBelow="custombreak" padding={{ base: "40px 0px" }}>
                                <Chips></Chips>
                            </Box>
                            <Box>
                                {searchState.searchResults?.results.map((e) => {
                                    return (
                                        <Box key={e.id}>
                                            <Box className="seperator"></Box>
                                            <Box padding={{ base: "40px 0px" }}>
                                                <SearchResult item={e} />
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                            <Box className="seperator"></Box>
                            <Box hideFrom="custombreak" padding="40px 0px">
                                <ResultPaging />
                            </Box>
                        </Box>
                    ) : (
                        <Box flex="1 1 100%" overflow="hidden">
                            Loading...
                        </Box>
                    )}

                    <Flex flex="0 0 30%" hideBelow="custombreak" flexDirection="column">
                        <Box>
                            <ResultPaging />
                        </Box>
                        <Box padding={"32px 0px"}>
                            <DataProviderFacet />
                        </Box>
                        <Box padding={"64px 0px 32px"} ref={menu}>
                            <ResourceTypeFacet></ResourceTypeFacet>
                        </Box>
                        <Box padding={"32px 0px"}>
                            <SubjectFacet></SubjectFacet>
                        </Box>
                        <Box padding={"32px 0px"}>
                            <SpatialCoverageFacet mapId="spatial-filter-map"></SpatialCoverageFacet>
                        </Box>
                        <Box padding={"32px 0px"}>
                            <TemporalCoverageFacet></TemporalCoverageFacet>
                        </Box>
                        <Spacer></Spacer>
                        <Box>
                            <ResultPaging />
                        </Box>
                    </Flex>
                </Flex>
                <MobileFilterMenu
                    openMenu={openMenu}
                    menuClosed={() => setOpenMenu(false)}
                ></MobileFilterMenu>
            </Container>
        </Box>
    );
}
