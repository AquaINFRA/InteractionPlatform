import { Box, Flex } from "@open-pioneer/chakra-integration";

import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Support } from "../../components/ResourceType/Support/Support";
import { SolrSearchResultItem } from "../../services/SearchService";

export interface LearningResourceMetadataResponse extends SolrSearchResultItem {
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
                    <Box pt="80px">
                        <Support />
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}
