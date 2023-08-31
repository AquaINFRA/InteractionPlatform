import { Box, Flex } from "@open-pioneer/chakra-integration";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import { useRef } from "react";

import { LastUpdate } from "../../components/ResourceType/Metadata/LastUpdate";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Support } from "../../components/ResourceType/Support/Support";
import { TOC } from "../../components/ResourceType/TOC/TOC";
import { SolrSearchResultItem } from "../../services/SearchService";

export interface LHB_ArticleMetadataResponse extends SolrSearchResultItem {
    name: string;
    description: string;
    author: string;
    articleBody: string;
    keyword: string;
    language: string;
    relatedContent: Array<object>;
    sourceSystem_homepage: string;
    sourceSystem_title: string;
    targetGroup: string;
    isPartOf: string;
    additionalType: string;
    about: string;
}

export interface ArticleViewProps {
    item: LHB_ArticleMetadataResponse;
}

export function LHB_ArticleView(props: ArticleViewProps) {
    const metadata = props.item;
    const elementRef = useRef(null);

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
                                    tag: "Description",
                                    val: metadata.description
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
                                    tag: "Source",
                                    val:
                                        metadata.sourceSystem_title &&
                                        metadata.sourceSystem_homepage
                                            ? [
                                                  metadata.sourceSystem_title,
                                                  metadata.sourceSystem_homepage
                                              ]
                                            : undefined
                                },
                                {
                                    tag: "About",
                                    val: metadata.about
                                },
                                {
                                    tag: "Target group",
                                    val: metadata.targetGroup
                                },
                                {
                                    tag: "Is part of",
                                    val: metadata.isPartOf
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
                    <Box pt="80px" ref={elementRef}>
                        <ReactMarkdown components={ChakraUIRenderer()}>
                            {metadata.articleBody
                                ? metadata.articleBody[0]
                                    ? metadata.articleBody[0]
                                    : ""
                                : ""}
                        </ReactMarkdown>
                    </Box>
                    <Box pt="80px">
                        <Support />
                    </Box>
                </Box>
                <Box w="25%">
                    {metadata.dateModified ? (
                        <Box pt="33">
                            <LastUpdate date={metadata.dateModified} />
                        </Box>
                    ) : null}
                    {metadata.articleBody ? (
                        metadata.articleBody[0] ? (
                            <TOC elementRef={elementRef} />
                        ) : null
                    ) : null}
                </Box>
            </Flex>
        </Box>
    );
}
