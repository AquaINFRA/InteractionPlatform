import { Box, Container, Image, Flex, Divider } from "@open-pioneer/chakra-integration";
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
import { MetadataSourceIcon, GoToOpenIssuesIcon } from "../../components/Icons";

export interface RepositoryMetadataResponse {
    name: string;
    description: string;
    codeRepository: string;
    type: string;
    keyword: string;
    license: string;
    uri: string;
    id: string;
}

export function ToolsSoftwareView() {
    const id = useParams().id as string;
    const searchSrvc = useService("onestop4all.SearchService");
    const [metadata, setMetadata] = useState<RepositoryMetadataResponse>();
    const toast = useToast();

    useEffect(() => {
        searchSrvc.getMetadata(id).then((result) => {
            setMetadata(result.results[0]);
        });
    }, [id]);

    const copyToClipBoard = (link: string) => {
        if (link != undefined) {
            navigator.clipboard.writeText(link);
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

    console.log(metadata);

    const metadataResponse = {
        resourceType: "Tools/Software",
        title: "IPFS Pinning Service for Open Climate Research Data",
        abstract:
            "The InterPlanetary File System (IPFS) is a novel decentralized file storage network that allows users to store and share files in a distributed manner, which can make it more resilient if individual infrastructure components fail. It also allows for faster access to content as users can get files directly from other users instead of having to go through a central server. However, one of the challenges of using IPFS is ensuring that the files remain available over time. This is where an IPFS pinning service offers a solution. An IPFS pinning service is a type of service that allows users to store and maintain the availability of their files on the IPFS network. The goal of an IPFS pinning service is to provide a reliable and trusted way for users to ensure that their files remain accessible on the IPFS network. This is accomplished by maintaining a copy of the file on the service's own storage infrastructure, which is then pinned to the IPFS network. This allows users to access the file even if the original source becomes unavailable. We explored the use of the IPFS for scientific data with a focus on climate data. We set up an IPFS node running on a cloud instance at the German Climate Computing Center where selected scientists can pin their data and make them accessible to the public via the IPFS infrastructure. IPFS is a good choice for climate data, because the open network architecture strengthens open science efforts and enables FAIR data processing workflows. Data within the IPFS is freely accessible to scientists regardless of their location and offers fast access rates to large files. In addition, data within the IPFS is immutable, which ensures that the content of a content identifier does not change over time. Due to the recent development of the IPFS, the project outcomes are novel data science developments for the earth system science and are potentially relevant building blocks to be included in the earth system science community.",
        authors: [
            {
                name: "Kulüke, Marco",
                orcid: null
            },
            {
                name: "Kindermann, Stephan",
                orcid: "0000-0001-9335-1093"
            },
            {
                name: "Kölling, Tobias",
                orcid: null
            }
        ],
        dateOfPublication: "02.02.2023",
        doi: "https://doi.org/10.5281/zenodo.7646356",
        url: "https://git.rwth-aachen.de/nfdi4earth/pilotsincubatorlab/incubator/ipfs-pinning-service",
        license: "CC BY 4.0",
        keywords: ["IPFS", "Pinning Service", "FAIR", "Open Science", "Climate"],
        relatedContentItems: [
            {
                resourceType: "Organisations",
                title: "Deutsches Klimarechenzentrum",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Repositories / Archives",
                title: "World Data Center for Climate",
                url: "https://www.nfdi4earth.de/"
            }
        ]
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
                            <ResourceTypeHeader resType={metadataResponse["resourceType"]} />
                            <Box className="title" pt="15px">
                                {metadataResponse["title"]}
                            </Box>
                            <Box pt="36px">
                                <Metadata
                                    metadataElements={[
                                        {
                                            tag: "Authors",
                                            val: metadataResponse["authors"]
                                        },
                                        {
                                            tag: "Date of publication",
                                            val: metadataResponse["dateOfPublication"]
                                        },
                                        { tag: "DOI", val: metadataResponse["doi"] },
                                        {
                                            tag: "URL",
                                            val: metadataResponse["url"]
                                        },
                                        {
                                            tag: "License",
                                            val: metadataResponse["license"]
                                        },
                                        { tag: "Keywords", val: metadataResponse["keywords"] }
                                    ]}
                                    visibleElements={4}
                                    expandedByDefault={true}
                                />
                            </Box>
                            <Box pt="80px">
                                <Abstract abstractText={metadataResponse["abstract"]} />
                            </Box>
                        </Box>
                        <Box w="25%">
                            <ResultsNavigation result={1} of={100} />
                            {metadata.codeRepository ? (
                                <Box className="actionButtonGroup" pt="74px">
                                    <ActionButton
                                        label="VISIT PROJECT PAGE"
                                        icon={<ExternalLinkIcon color="white" />}
                                        variant="solid"
                                        fun={() => void 0}
                                    />
                                    <ActionButton
                                        label="Copy URL"
                                        icon={<LinkIcon color="#05668D" />}
                                        variant="outline"
                                        fun={() => copyToClipBoard(metadata.codeRepository)}
                                    />
                                </Box>
                            ) : null}
                        </Box>
                    </Flex>
                    <Box w="100%" pt="80px">
                        <Box>
                            <RelatedContent
                                relatedContentItems={metadataResponse["relatedContentItems"]}
                            />
                        </Box>
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
