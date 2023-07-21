import { Box, Button, Container, Flex, Spacer } from "@open-pioneer/chakra-integration";
import { useRef, useState } from "react";

import { FilterIcon } from "../../components/Icons";
import { ResultsNavigation } from "../../components/ResultsNavigation/ResultsNavigation";
import { SearchBar } from "../../components/SearchBar";
import { BorderColor, PrimaryColor } from "../../Theme";
import { Chips } from "./Chips/Chips";
import { MobileFilterMenu } from "./Facets/MobileFilterMenu/MobileFilterMenu";
import { ResourceTypeFacet } from "./Facets/ResourceTypeFacet/ResourceTypeFacet";
import { SpatialCoverageFacet } from "./Facets/SpatialCoverageFacet/SpatialCoverageFacet";
import { SubjectFacet } from "./Facets/SubjectFacet/SubjectFacet";
import { TemporalCoverageFacet } from "./Facets/TemporalCoverageFacet/TemporalCoverageFacet";
import { ResultCountSelector } from "./ResultCountSelector/ResultCountSelector";
import { SearchResult } from "./SearchResult/SearchResult";
import { useSearchState } from "./SearchState";
import { SortedBySelector } from "./SortedBySelector/SortedBySelector";

export function SearchView() {
    const searchState = useSearchState();

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
                                <Box hideFrom="custombreak" padding="10px 0px">
                                    <ResultsNavigation result={1} of={100} />
                                </Box>
                                <Spacer></Spacer>
                                <Flex
                                    gap="10px"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    padding={{ base: "0 0 15px", custombreak: "0" }}
                                >
                                    <ResultCountSelector></ResultCountSelector>
                                    <Box flex="0 0 1px" bgColor={BorderColor} alignSelf="stretch" />
                                    <SortedBySelector></SortedBySelector>
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
                            <Box className="seperator" hideFrom="custombreak"></Box>
                            <Box hideBelow="custombreak" padding={{ base: "40px 0px" }}>
                                <Chips></Chips>
                            </Box>
                            <Box>
                                {searchState.searchResults?.results.map((e) => {
                                    return (
                                        <Box key={e.id}>
                                            <Box className="seperator"></Box>
                                            <Box padding={{ base: "40px 0px" }}>
                                                <SearchResult item={e}></SearchResult>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>
                            <Box className="seperator"></Box>
                            <Box hideFrom="custombreak">
                                <ResultsNavigation result={1} of={100} />
                            </Box>
                        </Box>
                    ) : (
                        <Box flex="1 1 100%" overflow="hidden">
                            Loading...
                        </Box>
                    )}

                    <Flex flex="0 0 30%" hideBelow="custombreak" flexDirection="column">
                        <Box>
                            <ResultsNavigation result={1} of={100} />
                        </Box>
                        <Box padding={"64px 0px 32px"} ref={menu}>
                            <ResourceTypeFacet></ResourceTypeFacet>
                        </Box>
                        <Box padding={"32px 0px"}>
                            <SubjectFacet></SubjectFacet>
                        </Box>
                        <Box padding={"32px 0px"}>
                            <SpatialCoverageFacet></SpatialCoverageFacet>
                        </Box>
                        <Box padding={"32px 0px"}>
                            <TemporalCoverageFacet></TemporalCoverageFacet>
                        </Box>
                        <Spacer></Spacer>
                        <Box>
                            <ResultsNavigation result={1} of={100} />
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
