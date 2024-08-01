import { Box, Button, Container, Flex, Skeleton, Spacer, Stack } from "@open-pioneer/chakra-integration";
import { useEffect, useRef, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

import { FilterIcon } from "../../components/Icons";
import { SearchBar } from "../../components/SearchBar";
import { BorderColor, PrimaryColor } from "../../Theme";
import { Chips } from "./Chips/Chips";
import { MobileFilterMenu } from "./Facets/MobileFilterMenu/MobileFilterMenu";
import { SpatialCoverageFacet } from "./Facets/SpatialCoverageFacet/SpatialCoverageFacet";
import { DataProviderFacet } from "./Facets/DataProviderFacet/DataProviderFacet";
import { ResultCountSelector } from "./ResultCountSelector/ResultCountSelector";
import { ResultPaging } from "./ResultPaging/ResultPaging";
import { SearchResult } from "./SearchResult/SearchResult";
import { UrlSearchParameterType, UrlSearchParams, useSearchState } from "./SearchState";
import { RelatedTerms } from "./Facets/RelatedTerms/RelatedTerms";
import { DownloadOptionFacet } from "./Facets/DownloadOptionFacet/DownloadOptionFacet";
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

        if (searchState.spatialFilter.length === 4) {
            params[UrlSearchParameterType.SpatialFilter] = searchState.spatialFilter.join(",");
        }

        if (searchState.pageSize && searchState.pageSize !== 10) {
            params[UrlSearchParameterType.PageSize] = `${searchState.pageSize}`;
        }

        if (searchState.pageStart && searchState.pageStart !== 0) {
            params[UrlSearchParameterType.PageStart] = `${searchState.pageStart}`;
        }

        if (searchState.sorting) {
            params[UrlSearchParameterType.SortingFilter] = `${searchState.sorting.term}`;
        }

        if (searchState.selectedDataProvider.length > 0) {
            params[UrlSearchParameterType.DataProvider] = searchState.selectedDataProvider;
        }

        if (searchState.downloadOption) {
            params[UrlSearchParameterType.DownloadOption] = `${searchState.downloadOption}`;
        }

        navigate({
            pathname: "/search",
            search: `?${createSearchParams({ ...params })}`
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        searchState.searchTerm,
        searchState.spatialFilter,
        //searchState.pageSize,
        //searchState.pageStart,
        searchState.sorting,
        searchState.selectedDataProvider,
        searchState.downloadOption
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
                    <SearchBar />
                </Container>
            </Box>

            <Box height={{ base: "100px", custombreak: "60px" }}></Box>

            <Container maxW={{ base: "100%", custombreak: "80%" }}>
                <Flex gap="5vw">
                    {searchState.isLoaded ? (
                        <Box flex="1 1 100%" >
                            {/* Desktop view */}
                            <Box className="relatedTermsBox">
                                {searchState.searchTerm != "" ? <RelatedTerms /> : null}
                            </Box>
                            {/* Mobile view */}
                            {/*<Box className="relatedTermsBox" id="mobileRelatedTerms">
                                <RelatedTerms />
                            </Box>*/}
                            <Flex flexDirection={{ base: "column", custombreak: "row" }}>
                                <Box className="results-count">
                                    {searchState.selectedDataProvider.length > 0 &&
                                    !searchState.searchResults?.count
                                        ? "0"
                                        : searchState.searchResults?.count}{" "}
                                    {searchState.searchResults?.count ||
                                    searchState.selectedDataProvider.length > 0
                                        ? "Results for your search"
                                        : "Select a data provider on the right"}
                                </Box>
                                <Box hideFrom="custombreak" padding="20px 0px">
                                    <ResultPaging />
                                </Box>
                                <Spacer />
                                <Flex
                                    gap="10px"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    padding={{ base: "0 0 15px", custombreak: "0" }}
                                >
                                    {/*<ResultCountSelector />*/}
                                    <Box bgColor={BorderColor} alignSelf="stretch" />
                                    {/*<SortedBySelector />*/}
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
                                <Chips />
                            </Box>
                            <Box>
                                {searchState.searchResults?.results
                                    .slice(
                                        searchState.pageStart * searchState.pageSize,
                                        (searchState.pageStart + 1) * searchState.pageSize
                                    )
                                    .map((e) => {
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
                            <Box className="seperator" />
                            <Box hideFrom="custombreak" padding="40px 0px">
                                <ResultPaging />
                            </Box>
                        </Box>
                    ) : (
                        <Box
                            flex="1 1 100%"
                            overflow="hidden"
                            paddingTop={{ base: "7%", custombreak: "0%" }}
                        >
                            Your request is currently being processed and may take a few seconds. 
                            For performance reasons, the number of search results will be limited to a maximum of 100 prioritized hits.
                            Hence, there might be more search results than indicated.
                            <Stack pt={3}>
                                <Skeleton height='20px' />
                                <Skeleton height='20px' />
                            </Stack>
                        </Box>
                    )}

                    <Flex flex="0 0 35%" hideBelow="custombreak" flexDirection="column">
                        <Box>
                            <ResultPaging />
                        </Box>
                        <Box padding={"32px 0px"}>
                            <DataProviderFacet />
                        </Box>
                        <Box padding={"32px 0px"}>
                            <DownloadOptionFacet />
                        </Box>
                        <Box padding={"32px 0px"}>
                            <SpatialCoverageFacet mapId="spatial-filter-map" />
                        </Box>
                        <Spacer />
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
