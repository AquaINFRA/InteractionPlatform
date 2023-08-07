import { Box, Container, Image, Flex, Divider, Button } from "@open-pioneer/chakra-integration";
import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { useParams, Link } from "react-router-dom";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { useToast } from "@open-pioneer/chakra-integration";

import { SearchBar } from "../../components/SearchBar";
import { ResourceTypeHeader } from "../../components/ResourceType/ResourceTypeHeader/ResourceTypeHeader";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { RelatedContent } from "../../components/ResourceType/RelatedContent/RelatedContent";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { ResultsNavigation } from "../../components/ResultsNavigation/ResultsNavigation";
import { MetadataSourceIcon, InfoIcon } from "../../components/Icons";

export interface RepositoryMetadataResponse {
    title: string;
    description: string;
    type: string;
    homepage: string;
    theme: string;
    keyword: string;
    contactPoint_email: string;
    publisher: string;
    altLabel: string;
    catalogAccessType: string;
    dataAccessType: string;
    dataLicense: string;
    dataUploadRestriction: string;
    dataUploadType: string;
    language: string;
    publisher_alt: string;
    supportsMetadataStandard: string;
}

export function RepositoryView() {
    const id = useParams().id as string;
    const searchSrvc = useService("onestop4all.SearchService");
    const [metadata, setMetadata] = useState<RepositoryMetadataResponse>();
    const toast = useToast();

    useEffect(() => {
        searchSrvc.getMetadata(id).then((result) => {
            setMetadata(result.results[0]);
        });
    }, [id]);

    console.log(metadata);
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
        console.log(metadata);
    };

    const copyToClipBoard = () => {
        if (metadata != undefined) {
            navigator.clipboard.writeText(metadata.homepage);
            //TO DO: There is sth. wrong with the tooltip!
            //TO DO: Create reusable function/component out of it
            return toast({
                title: "Copied to clipboard",
                status: "success",
                duration: 2000,
                position: "bottom-right",
                isClosable: true
            });
        } else {
            return toast({
                title: "Could not copy to clipboard",
                status: "error",
                duration: 2000,
                position: "bottom-right",
                isClosable: true
            });
        }
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
            {metadata != undefined ? (
                <Container maxW="80%">
                    <Box height="80px" />
                    <Flex gap="10%">
                        <Box w="65%">
                            <ResourceTypeHeader resType="Repositories / Archives" />
                            <Box className="title" pt="15px">
                                {metadata.title}
                            </Box>
                            <Box pt="36px">
                                <Metadata
                                    metadataElements={[
                                        {
                                            tag: "URL",
                                            val: metadata.homepage
                                        },
                                        {
                                            tag: "Theme",
                                            val: metadata.theme
                                        },
                                        {
                                            tag: "Keywords",
                                            val: metadata.keyword
                                        },
                                        {
                                            tag: "Label",
                                            val: "NFDI4Earth Label"
                                        },
                                        {
                                            tag: "Publisher",
                                            val: metadata.publisher
                                        },
                                        {
                                            tag: "Contact",
                                            val: metadata.contactPoint_email
                                        },
                                        {
                                            tag: "Alternative label",
                                            val: metadata.altLabel
                                        },
                                        {
                                            tag: "Catalog access type",
                                            val: metadata.catalogAccessType
                                        },
                                        {
                                            tag: "Data access type",
                                            val: metadata.dataAccessType
                                        },
                                        {
                                            tag: "Data license",
                                            val: metadata.dataLicense
                                        },
                                        {
                                            tag: "Data upload restriction",
                                            val: metadata.dataUploadRestriction
                                        },
                                        {
                                            tag: "Data upload type",
                                            val: metadata.dataUploadType
                                        },
                                        {
                                            tag: "Language",
                                            val: metadata.language
                                        },
                                        {
                                            tag: "Alternative publisher",
                                            val: metadata.publisher_alt
                                        },
                                        {
                                            tag: "Supports metadata standard",
                                            val: metadata.supportsMetadataStandard
                                        },
                                        {
                                            tag: "Type",
                                            val: metadata.type
                                        }
                                    ]}
                                    visibleElements={6}
                                    expandedByDefault={false}
                                />
                            </Box>
                            <Box pt="80px">
                                <Abstract abstractText={metadata.description} />
                            </Box>
                        </Box>
                        <Box w="25%">
                            <ResultsNavigation result={1} of={100} />
                            <Box className="actionButtonGroup" pt="74px">
                                <Link
                                    to={metadata.homepage[0] as string}
                                    className="actionButtonLink"
                                    target="_blank"
                                >
                                    <ActionButton
                                        label="Visit repository"
                                        icon={<ExternalLinkIcon color="white" />}
                                        variant="solid"
                                        fun={fun}
                                    />
                                </Link>
                                <Link
                                    to={metadata.dataLicense[0] as string}
                                    className="actionButtonLink"
                                    target="_blank"
                                >
                                    <ActionButton
                                        label="Open user policy"
                                        icon={<InfoIcon />}
                                        variant="outline"
                                        fun={fun}
                                    />
                                </Link>
                                <ActionButton
                                    label="Copy permalink"
                                    icon={<LinkIcon color="#05668D" />}
                                    variant="outline"
                                    fun={copyToClipBoard}
                                />
                            </Box>
                        </Box>
                    </Flex>
                    <Box w="100%" pt="80px">
                        <RelatedContent
                            relatedContentItems={metadataResponse["relatedContentItems"]}
                        />
                        <Flex gap="10%" alignItems="center" pt="120px">
                            <Divider className="seperator" w="65%" />
                            <Box w="25%">
                                <ResultsNavigation result={1} of={100} />
                            </Box>
                        </Flex>
                    </Box>
                    <Box pt="135px" />
                </Container>
            ) : (
                <></>
            )}
        </Box>
    );
}
