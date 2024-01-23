import { Box, Flex } from "@open-pioneer/chakra-integration";
import { Link } from "react-router-dom";

import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { SolrSearchResultItem, ZenodoResultItem } from "../../services/SearchService";
import { LastUpdate } from "../../components/ResourceType/Metadata/LastUpdate";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { MetadataSourceIcon } from "../../components/Icons";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ExternalResources } from "../../components/ResourceType/ExternalResources/ExternalResources";
import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Map } from "../../components/ResourceType/Map/Map";

export interface SoftwareViewProps {
    item: ZenodoResultItem;
}

export function SoftwareView(props: any) {
    const metadata = props.item[1];
    //const doiBaseUrl = "https://www.doi.org/";
    console.log(metadata);

    return (
        <Box>
            <Flex gap="10%">
                <Box w="65%">
                    {metadata.title ? (
                        <Box className="title" pt="15px">
                            {metadata.title}
                        </Box>
                    ) : null}
                    <Box pt="36px">
                        <Metadata
                            metadataElements={[
                                {
                                    element: "identifier",
                                    tag: "Identifier",
                                    val: metadata.identifier["@id"]
                                },
                                {
                                    element: "programmingLanguage",
                                    tag:
                                        metadata.programmingLanguage?.length > 1
                                            ? "Programming language"
                                            : "Programming languages",
                                    val: metadata.programmingLanguage
                                },
                                {
                                    element: "Type",
                                    tag: metadata["@type"].length > 1 ? "Types" : "Type",
                                    val: metadata["@type"]
                                },
                                {
                                    element: "datePublished",
                                    tag: "Published",
                                    val: new Date(metadata.datePublished).toLocaleDateString()
                                },
                                {
                                    element: "Licenses",
                                    tag: "Licenses",
                                    val: metadata.license["@id"]
                                },
                                {
                                    element: "Version",
                                    tag: "Version",
                                    val: metadata.version
                                }
                            ]}
                            visibleElements={2}
                            expandedByDefault={false}
                        />
                    </Box>
                    {metadata.description ? (
                        <Box pt="80px">
                            <Abstract abstractText={metadata.description} />
                        </Box>
                    ) : null}
                </Box>
                <Box w="25%">
                    {/*metadata.properties.created ? (
                        <Box pt="33">
                            <LastUpdate date={metadata.properties.created} />
                        </Box>
                    ) : null*/}
                    {/*metadata.links ? (
                        <Box pt="8px">
                            <ExternalResources links={metadata.links} />
                        </Box>
                    ) : null*/}
                </Box>
            </Flex>
        </Box>
    );
}
