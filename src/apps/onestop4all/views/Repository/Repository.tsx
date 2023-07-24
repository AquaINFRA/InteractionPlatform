import { Box, Container, Image, Flex, Divider } from "@open-pioneer/chakra-integration";
import { SearchBar } from "../../components/SearchBar";
import { ResourceTypeHeader } from "../../components/ResourceType/ResourceTypeHeader/ResourceTypeHeader";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { RelatedContent } from "../../components/ResourceType/RelatedContent/RelatedContent";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { ResultsNavigation } from "../../components/ResultsNavigation/ResultsNavigation";
import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { MetadataSourceIcon, InfoIcon } from "../../components/Icons";

export function RepositoryView() {
    const metadataResponse = {
        resourceType: "Repositories / Archives",
        title: "World Data Center for Climate",
        abstract:
            "The mission of World Data Center for Climate (WDCC) is to provide central support for the German and European climate research community. The WDCC is member of the ISC's World Data System. Emphasis is on development and implementation of best practice methods for Earth System data management. Data for and from climate research are collected, stored and disseminated. The WDCC is restricted to data products. Cooperations exist with thematically corresponding data centres of, e.g., earth observation, meteorology, oceanography, paleo climate and environmental sciences. The services of WDCC are also available to external users at cost price. A special service for the direct integration of research data in scientific publications has been developed. The editorial process at WDCC ensures the quality of metadata and research data in collaboration with the data producers. A citation code and a digital identifier (DOI) are provided and registered together with citation information at the DOI registration agency DataCite.",
        dateOfPublication: "04.03.2013",
        repositoryUrl: "https://wdc-climate.de",
        license: "other, Creative Commons",
        subjects: [
            "Natural Sciences",
            "Geosciences (including Geography)",
            "Atmospheric Science",
            "Oceanography",
            "Geology and Palaeontology",
            "Atmospheric Science and Oceanography"
        ],
        keywords: [
            "CERA database",
            "Structured graphics",
            "climate simulation",
            "cryosphere",
            "data assimilation",
            "earth science",
            "earth system sciences"
        ],
        label: "NFDI4Earth Label",
        relatedContentItems: [
            {
                resourceType: "Educational resources",
                title: "Earth System Science Data Analytics: Introduction to Python",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Educational resources",
                title: "How to create publishable netcdf-data",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Educational resources",
                title: "How to create publishable netcdf-data",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Educational resources",
                title: "How to create publishable netcdf-data",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Educational resources",
                title: "How to create publishable netcdf-data",
                url: "https://www.nfdi4earth.de/"
            }
        ]
    };

    const fun = () => {
        console.log("This is a fun");
    };

    return (
        <Box>
            <Box position="relative">
                <Image src="/image2.png" width="100%" />
            </Box>

            <Box position="absolute" width="100%" marginTop="-70px">
                <Container maxW="80%">
                    <SearchBar></SearchBar>
                </Container>
            </Box>

            <Container maxW="80%">
                <Box height="80px" />
                <Flex gap="10%">
                    <Box w="65%">
                        <ResourceTypeHeader resType={metadataResponse["resourceType"]} />
                        <Box className="title" pt="15px">
                            {metadataResponse["title"]}
                        </Box>
                        <Box pt="36px">
                            <Metadata
                                metadataElements={[
                                    {
                                        tag: "Date of publication",
                                        val: metadataResponse["dateOfPublication"]
                                    },
                                    {
                                        tag: "Repository URL",
                                        val: metadataResponse["repositoryUrl"]
                                    },
                                    {
                                        tag: "License",
                                        val: metadataResponse["license"]
                                    },
                                    {
                                        tag: "Subjects",
                                        val: metadataResponse["subjects"]
                                    },
                                    {
                                        tag: "Keywords",
                                        val: metadataResponse["keywords"]
                                    },
                                    {
                                        tag: "Label",
                                        val: metadataResponse["label"]
                                    }
                                ]}
                                visibleElements={3}
                                expandedByDefault={true}
                            />
                        </Box>
                        <Box pt="80px">
                            <Abstract abstractText={metadataResponse["abstract"]} />
                        </Box>
                    </Box>
                    <Box w="25%">
                        <ResultsNavigation result={1} of={100} />
                        <Box className="actionButtonGroup" pt="74px">
                            <ActionButton
                                label="Visit repository"
                                icon={<ExternalLinkIcon color="white" />}
                                variant="solid"
                                fun={fun}
                            />
                            <ActionButton
                                label="Open user policy"
                                icon={<InfoIcon />}
                                variant="outline"
                                fun={fun}
                            />
                            <ActionButton
                                label="Visit metadata source"
                                icon={<MetadataSourceIcon color="#05668D" />}
                                variant="outline"
                                fun={fun}
                            />
                            <ActionButton
                                label="Copy permalink"
                                icon={<LinkIcon color="#05668D" />}
                                variant="outline"
                                fun={fun}
                            />
                        </Box>
                    </Box>
                </Flex>
                <Box w="100%" pt="80px">
                    <RelatedContent relatedContentItems={metadataResponse["relatedContentItems"]} />
                    <Flex gap="10%" alignItems="center" pt="120px">
                        <Divider className="seperator" w="65%" />
                        <Box w="25%">
                            <ResultsNavigation result={1} of={100} />
                        </Box>
                    </Flex>
                </Box>
                <Box pt="135px" />
            </Container>
        </Box>
    );
}
