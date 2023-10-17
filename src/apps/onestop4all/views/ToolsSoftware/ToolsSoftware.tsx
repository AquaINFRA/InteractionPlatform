import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@open-pioneer/chakra-integration";
import { Link } from "react-router-dom";

import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { SolrSearchResultItem } from "../../services/SearchService";
import { MetadataSourceIcon } from "../../components/Icons";
import { CopyToClipboardButton } from "../../components/ResourceType/ActionButton/CopyToClipboardButton";

export interface ToolsSoftwareMetadataResponse extends SolrSearchResultItem {
    name: string;
    description: string;
    codeRepository: string;
    keyword: string;
    license: string;
    uri: string;
    relatedContent: Array<object>;
    programmingLanguage: Array<string>;
    sourceSystem_homepage: string;
    sourceSystem_title: string;
}

export interface ToolsSoftwareViewProps {
    item: ToolsSoftwareMetadataResponse;
}

export function ToolsSoftwareView(props: ToolsSoftwareViewProps) {
    const metadata = props.item;

    return (
        <Box>
            <Flex gap="10%">
                <Box w="65%">
                    {metadata.name ? (
                        <Box className="title" pt="15px">
                            {metadata.name}
                        </Box>
                    ) : (
                        ""
                    )}
                    <Box pt="36px">
                        <Metadata
                            metadataElements={[
                                {
                                    element: "type",
                                    tag: "Type",
                                    val: metadata.type
                                },
                                {
                                    element: "keyword",
                                    tag: metadata.keyword?.length > 1 ? "Keywords" : "Keyword",
                                    val: metadata.keyword
                                },
                                {
                                    element: "license",
                                    tag: metadata.license?.length > 1 ? "Licenses" : "License",
                                    val: metadata.license
                                },
                                {
                                    element: "porgrammingLanguage",
                                    tag:
                                        metadata.programmingLanguage?.length > 1
                                            ? "Programming languages"
                                            : "Programming language",
                                    val: metadata.programmingLanguage
                                }
                            ]}
                            visibleElements={2}
                            expandedByDefault={true}
                        />
                    </Box>
                    {metadata.description ? (
                        <Box pt="80px">
                            <Abstract abstractText={metadata.description} />
                        </Box>
                    ) : null}
                </Box>
                <Box w="25%">
                    {metadata.codeRepository || metadata.sourceSystem_homepage ? (
                        <Box className="actionButtonGroup" pt="74px">
                            {metadata.codeRepository ? (
                                <>
                                    <Link
                                        to={metadata.codeRepository[0] as string}
                                        className="actionButtonLink"
                                        target="_blank"
                                    >
                                        <ActionButton
                                            label="VISIT PROJECT PAGE"
                                            icon={<ExternalLinkIcon color="white" />}
                                            variant="solid"
                                            fun={() => void 0}
                                        />
                                    </Link>
                                    <CopyToClipboardButton
                                        data={metadata.codeRepository}
                                        label="Copy URL"
                                    />
                                </>
                            ) : null}
                            {metadata.sourceSystem_homepage ? (
                                <Link
                                    to={metadata.sourceSystem_homepage[0] as string}
                                    className="actionButtonLink"
                                    target="_blank"
                                >
                                    <ActionButton
                                        label="Visit metadata source"
                                        icon={<MetadataSourceIcon color="white" />}
                                        variant="outline"
                                        fun={() => void 0}
                                    />
                                </Link>
                            ) : null}
                        </Box>
                    ) : null}
                </Box>
            </Flex>
        </Box>
    );
}
