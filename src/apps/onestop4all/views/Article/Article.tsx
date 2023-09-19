import { Box, Flex } from "@open-pioneer/chakra-integration";
import { Link } from "react-router-dom";

import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { SolrSearchResultItem } from "../../services/SearchService";
import { LastUpdate } from "../../components/ResourceType/Metadata/LastUpdate";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { MetadataSourceIcon } from "../../components/Icons";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";

export interface ArticleMetadataResponse extends SolrSearchResultItem {
    name: string;
    dateModified: string;
    description: string;
    author: string;
    keyword: string;
    language: string;
    relatedContent: Array<object>;
    sourceSystem_homepage: string;
    sourceSystem_title: string;
    datePublished: string;
    license: string;
    additionalType: string;
}

export interface ArticleViewProps {
    item: ArticleMetadataResponse;
}

export function ArticleView(props: ArticleViewProps) {
    const metadata = props.item;

    return (
        <Box>
            <Flex gap="10%">
                <Box w="65%">
                    {metadata.name ? (
                        <Box className="title" pt="15px">
                            {metadata.name}
                        </Box>
                    ) : null}
                    <Box pt="36px">
                        <Metadata
                            metadataElements={[
                                {
                                    tag: "Author",
                                    val: metadata.author
                                },
                                {
                                    tag: "Keywords",
                                    val: metadata.keyword
                                },
                                {
                                    tag: "Language",
                                    val: metadata.language
                                },
                                {
                                    tag: "Type",
                                    val: metadata.type
                                },
                                {
                                    tag: "Published",
                                    val: metadata.datePublished
                                },
                                {
                                    tag: "License",
                                    val: metadata.license
                                },
                                {
                                    tag: "Additional type",
                                    val: metadata.additionalType
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
                    {metadata.sourceSystem_homepage ? (
                        <Box className="actionButtonGroup" pt="74px">
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
                    {metadata.dateModified ? (
                        <Box pt="33">
                            <LastUpdate date={metadata.dateModified} />
                        </Box>
                    ) : null}
                </Box>
            </Flex>
        </Box>
    );
}
