import { Box, Flex } from "@open-pioneer/chakra-integration";
import { Link } from "react-router-dom";

import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { SolrSearchResultItem } from "../../services/SearchService";
import { LastUpdate } from "../../components/ResourceType/Metadata/LastUpdate";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { MetadataSourceIcon } from "../../components/Icons";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ExternalResources } from "../../components/ResourceType/ExternalResources/ExternalResources";
import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";

export interface LinkObject {
    href: string;
    title: string;
    description: string;
    protocol: string;
    type: string;
}

export interface Geometry {
    type: string;
    coordinates: number[][];
}

export interface Properties {
    title: string;
    type: string;
    aicollection: string;
    description: string;
    created: string;
    keywords: string;
    language: string;
    rights: string;
    formats: string;
}

export interface DatasetMetadataResponse extends SolrSearchResultItem {
    properties: Properties;
    geometry: Geometry[];
    id: string;
    time: string;
    type: string;
    links: LinkObject[];
}

export interface DatasetViewProps {
    item: DatasetMetadataResponse;
}

export function DatasetView(props: DatasetViewProps) {
    const metadata = props.item;
    const doiBaseUrl = "https://www.doi.org/";
    console.log(metadata);

    return (
        <Box>
            <Flex gap="10%">
                <Box w="65%">
                    {metadata.properties.title ? (
                        <Box className="title" pt="15px">
                            {metadata.properties.title}
                        </Box>
                    ) : null}
                    <Box pt="36px">
                        <Metadata
                            metadataElements={[
                                {
                                    element: "keyword",
                                    tag:
                                        metadata.properties.keywords?.length > 1
                                            ? "Keywords"
                                            : "Keyword",
                                    val: metadata.properties.keywords
                                },
                                {
                                    element: "language",
                                    tag:
                                        metadata.properties.language?.length > 1
                                            ? "Languages"
                                            : "Language",
                                    val: metadata.properties.language
                                },
                                {
                                    element: "type",
                                    tag: "Type",
                                    val: metadata.properties.type
                                },
                                {
                                    element: "datePublished",
                                    tag: "Published",
                                    val: new Date(metadata.properties.created).toLocaleDateString()
                                },
                                {
                                    element: "Rights",
                                    tag: "Rights",
                                    val: metadata.properties.rights
                                },
                                {
                                    element: "Formats",
                                    tag:
                                        metadata.properties.formats?.length > 1
                                            ? "Formats"
                                            : "Format",
                                    val: metadata.properties.formats
                                }
                            ]}
                            visibleElements={2}
                            expandedByDefault={false}
                        />
                    </Box>
                    {metadata.properties.description ? (
                        <Box pt="80px">
                            <Abstract abstractText={metadata.properties.description} />
                        </Box>
                    ) : null}
                </Box>
                <Box w="25%">
                    {metadata.properties.created ? (
                        <Box pt="33">
                            <LastUpdate date={metadata.properties.created} />
                        </Box>
                    ) : null}
                    {metadata.links ? (
                        <Box pt="8px">
                            <ExternalResources links={metadata.links} />
                        </Box>
                    ) : null}
                </Box>
            </Flex>
        </Box>
    );
}
