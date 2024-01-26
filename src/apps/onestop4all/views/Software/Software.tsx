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
import { CopyToClipboardButton } from "../../components/ResourceType/ActionButton/CopyToClipboardButton";

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
                    {metadata.identifier || metadata.codeRepository ? (
                        <Box className="actionButtonGroup" pt="40px">
                            <>
                                {metadata.identifier ? (
                                    <Link
                                        to={metadata.identifier["@id"] as string}
                                        className="actionButtonLink"
                                        target="_blank"
                                    >
                                        <ActionButton
                                            label="Go to archive"
                                            icon={<ExternalLinkIcon color="white" />}
                                            variant="solid"
                                            fun={() => void 0}
                                        />
                                    </Link>
                                ) : null}
                                {metadata.codeRepository ? (
                                    <Link
                                        to={metadata.codeRepository["@id"] as string}
                                        className="actionButtonLink"
                                        target="_blank"
                                    >
                                        <ActionButton
                                            label="Go to repository"
                                            icon={<ExternalLinkIcon color="white" />}
                                            variant="solid"
                                            fun={() => void 0}
                                        />
                                    </Link>
                                ) : null}
                                {metadata.identifier ? (
                                    <CopyToClipboardButton
                                        label="Copy DOI"
                                        data={metadata.identifier["@id"]}
                                    />
                                ) : null}
                                {metadata.distribution ? (
                                    <Link
                                        to={metadata.distribution["@id"] as string}
                                        className="actionButtonLink"
                                        target="_blank"
                                    >
                                        <ActionButton
                                            label="Download"
                                            icon={<DownloadIcon color="#05668D" />}
                                            variant="outline"
                                            fun={() => void 0}
                                        />
                                    </Link>
                                ) : null}
                                {metadata.distribution ? (
                                    <Link
                                        to={"http://127.0.0.1:8080/tool_runner?tool_id=aquainfra_ddas&URL=" + metadata.distribution["@id"] as string}
                                        className="actionButtonLink"
                                        target="_blank"
                                    >
                                        <ActionButton
                                            label="Import to Galaxy"
                                            icon={<DownloadIcon color="#05668D" />}
                                            variant="outline"
                                            fun={() => void 0}
                                        />
                                    </Link>
                                ) : null}
                            </>
                        </Box>
                    ) : null}
                </Box>
            </Flex>
        </Box>
    );
}
