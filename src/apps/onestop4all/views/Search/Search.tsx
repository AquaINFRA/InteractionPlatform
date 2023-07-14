import { Box, Button, Container, Flex, Spacer } from "@open-pioneer/chakra-integration";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import { FilterIcon } from "../../components/Icons";
import { ResultsNavigation } from "../../components/ResultsNavigation/ResultsNavigation";
import { SearchBar } from "../../components/SearchBar";
import { SearchParameterType, SearchResultItem } from "../../services/SearchService";
import { BorderColor, PrimaryColor } from "../../Theme";
import { ResourceType } from "../Start/ResourceEntry/ResourceEntry";
import { ResourceTypeFacet } from "./Facets/ResourceTypeFacet/ResourceTypeFacet";
import { SpatialCoverageFacet } from "./Facets/SpatialCoverageFacet/SpatialCoverageFacet";
import { SubjectFacet } from "./Facets/SubjectFacet/SubjectFacet";
import { TemporalCoverageFacet } from "./Facets/TemporalCoverageFacet/TemporalCoverageFacet";
import { ResultCountSelector } from "./ResultCountSelector/ResultCountSelector";
import { SearchResult } from "./SearchResult/SearchResult";
import { SortedBySelector } from "./SortedBySelector/SortedBySelector";

export function SearchView() {
    const [search] = useSearchParams();
    const [resultCount] = useState(2567);

    const searchterm = search.get(SearchParameterType.Searchterm);
    const resourceType = search.getAll(SearchParameterType.ResourceType);

    const searchResults: SearchResultItem[] = [
        {
            id: 1,
            title: "NFDI Consortium Earth System Sciences - Proposal 2020 revised",
            abstract:
                "Bernard, Lars; Braesicke, Peter; Bertelmann, Roland; Frickenhaus, Stephan; Gödde,Hildegard; + 13 more",
            date: new Date(2021, 10),
            resourceType: ResourceType.Documents
        },
        {
            id: 2,
            title: "World Data Center for Climate",
            abstract:
                "The mission of World Data Center for Climate (WDCC) is to provide central support for the German and European climate research community. The WDCC is member of the ISC's World Data System. Emphasis is on development and implementation of best practice methods for Earth System data management. Data for and from climate research are collected, stored and disseminated. The WDCC is restricted to data products. Cooperations exist with thematically corresponding data centres of, e.g., earth observation, meteorology, oceanography, paleo climate and environmental sciences. The services of WDCC are also available to external users at cost price. A special service for the direct integration of research data in scientific publications has been developed. The editorial process at WDCC ensures the quality of metadata and research data in collaboration with the data producers. A citation code and a digital identifier (DOI) are provided and registered together with citation information at the DOI registration agency DataCite.",
            date: new Date(2018, 11),
            resourceType: ResourceType.Repos
        },
        {
            id: 3,
            title: "World Data Center for Climate",
            abstract:
                "The mission of World Data Center for Climate (WDCC) is to provide central support for the German and European climate research community. The WDCC is member of the ISC's World Data System. Emphasis is on development and implementation of best practice methods for Earth System data management. Data for and from climate research are collected, stored and disseminated. The WDCC is restricted to data products. Cooperations exist with thematically corresponding data centres of, e.g., earth observation, meteorology, oceanography, paleo climate and environmental sciences. The services of WDCC are also available to external users at cost price. A special service for the direct integration of research data in scientific publications has been developed. The editorial process at WDCC ensures the quality of metadata and research data in collaboration with the data producers. A citation code and a digital identifier (DOI) are provided and registered together with citation information at the DOI registration agency DataCite.",
            location: "Hamburg",
            resourceType: ResourceType.Organisations
        },
        {
            id: 4,
            title: "Author guidelines",
            abstract: "Thomas Rose, Dominik C. Hezel",
            date: new Date(2023, 2),
            resourceType: ResourceType.Articles
        },
        {
            id: 5,
            title: "Earth System Science Data Analytics: Foundations of Image Processing",
            abstract: "Farzaneh Sadeghi, Carsten Keßler",
            date: new Date(2030, 5),
            resourceType: ResourceType.Educational
        },
        {
            id: 6,
            title: "IPFS Pinning Service for Open Climate Research Data",
            abstract:
                "The InterPlanetary File System (IPFS) is a novel decentralized file storage network that allows users to store and share files in a distributed manner, which can make it more resilient if individual infrastructure components fail. It also allows for faster access to content as users can get files directly from other users instead of having to go through a central server. However, one of the challenges of using IPFS is ensuring that the files remain available over time. This is where an IPFS pinning service offers a solution. An IPFS pinning service is a type of service that allows users to store and maintain the availability of their files on the IPFS network. The goal of an IPFS pinning service is to provide a reliable and trusted way for users to ensure that their files remain accessible on the IPFS network. This is accomplished by maintaining a copy of the file on the service's own storage infrastructure, which is then pinned to the IPFS network. This allows users to access the file even if the original source becomes unavailable.       We explored the use of the IPFS for scientific data with a focus on climate data. We set up an IPFS node running on a cloud instance at the German Climate Computing Center where selected scientists can pin their data and make them accessible to the public via the IPFS infrastructure. IPFS is a good choice for climate data, because the open network architecture strengthens open science efforts and enables FAIR data processing workflows. Data within the IPFS is freely accessible to scientists regardless of their location and offers fast access rates to large files. In addition, data within the IPFS is immutable, which ensures that the content of a content identifier does not change over time. Due to the recent development of the IPFS, the project outcomes are novel data science developments for the earth system science and are potentially relevant building blocks to be included in the earth system science community.",
            date: new Date(2022, 1),
            resourceType: ResourceType.Tools
        },
        {
            id: 7,
            title: "WMS-Dienst des Deutschen Wetterdienst",
            abstract:
                "Über diesen Dienst werden die statistischen Daten der Stadt Osnabrück bereitgestellt.",
            resourceType: ResourceType.Services
        },
        {
            id: 8,
            title: "OGC Web Map Service",
            abstract: "Open Geospatial Consortium",
            date: new Date(2014, 6),
            resourceType: ResourceType.Standards
        }
    ];

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
                    <SearchBar searchTerm={searchterm}></SearchBar>
                </Container>
            </Box>

            <Box height={{ base: "50px", custombreak: "80px" }}></Box>

            <Container maxW={{ base: "100%", custombreak: "80%" }}>
                <Flex gap="5vw">
                    <Box flex="1 1 100%" overflow="hidden">
                        <Flex flexDirection={{ base: "column", custombreak: "row" }}>
                            <Box className="results-count">
                                {resultCount} Results for your search
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
                                    >
                                        Filter
                                    </Button>
                                    TODO: FilterMenu
                                </Box>
                            </Flex>
                        </Flex>
                        <Box className="seperator" hideFrom="custombreak"></Box>
                        <Box hideBelow="custombreak" paddingBottom={{ base: "40px" }}>
                            TODO: Search-chips
                        </Box>
                        <Box>
                            {searchResults.map((e) => {
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
                    <Flex flex="0 0 30%" hideBelow="custombreak" flexDirection="column">
                        <Box>
                            <ResultsNavigation result={1} of={100} />
                        </Box>
                        <Box padding={"64px 0px 32px"}>
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
            </Container>
        </Box>
    );
}
