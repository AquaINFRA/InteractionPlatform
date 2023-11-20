import { Box, Flex } from "@open-pioneer/chakra-integration";
import { Link } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { SolrSearchResultItem } from "../../services/SearchService";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { MetadataSourceIcon } from "../../components/Icons";
import { CopyToClipboardButton } from "../../components/ResourceType/ActionButton/CopyToClipboardButton";

export interface LearningResourceMetadataResponse extends SolrSearchResultItem {
    name: string;
    description: string;
    language: string;
    relatedContent: Array<object>;
    license: string;
    type: string;
    url: string;
    keyword: string; //
    publisher_alt: string;
    publisher: string;
    learningResourceType: string;
    datePublished: string;
    competencyRequired: string;
    about: string;
}

export interface LearningResourceViewProps {
    item: LearningResourceMetadataResponse;
}

export function LearningResourceView(props: LearningResourceViewProps) {
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
                                    element: "author",
                                    tag: metadata.author?.length > 1 ? "Authors" : "Author",
                                    val: metadata.author
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
                                    element: "language",
                                    tag: metadata.language?.length > 1 ? "Languages" : "Language",
                                    val: metadata.language
                                },
                                {
                                    element: "type",
                                    tag: "Type",
                                    val: metadata.type
                                },
                                {
                                    element: "publisher",
                                    tag:
                                        metadata.publisher?.length > 1 ? "Publishers" : "Publisher",
                                    val: metadata.publisher
                                },
                                {
                                    element: "publisherAlt",
                                    tag:
                                        metadata.publisher_alt?.length > 1
                                            ? "Alternative publishers"
                                            : "Alternative publisher",
                                    val: metadata.publisher_alt
                                },
                                {
                                    element: "learningResourceType",
                                    tag:
                                        metadata.learningResourceType?.length > 1
                                            ? "Learning resource types"
                                            : "Learning resource type",
                                    val: metadata.learningResourceType
                                },
                                {
                                    element: "competencyRequired",
                                    tag: "Competency required",
                                    val: metadata.competencyRequired
                                },
                                {
                                    element: "datePublished",
                                    tag: "Published",
                                    val: metadata.datePublished
                                        ? new Date(metadata.datePublished).getUTCFullYear()
                                        : undefined
                                },
                                {
                                    element: "about",
                                    tag: "About",
                                    val: metadata.about
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
                    {metadata.url || metadata.sourceSystem_homepage ? (
                        <Box className="actionButtonGroup" pt="74px">
                            {metadata.url ? (
                                <>
                                    <Link
                                        to={metadata.url[0] as string}
                                        className="actionButtonLink"
                                        target="_blank"
                                    >
                                        <ActionButton
                                            label="Visit website"
                                            icon={<ExternalLinkIcon color="white" />}
                                            variant="solid"
                                            fun={() => void 0}
                                        />
                                    </Link>
                                    <CopyToClipboardButton data={metadata.url} label="Copy URL" />
                                </>
                            ) : null}
                            {metadata.sourceSystem_id ? (
                                <Link
                                    to={metadata.sourceSystem_id as string}
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
