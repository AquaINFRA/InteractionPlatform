import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { Box, Flex, useToast } from "@open-pioneer/chakra-integration";
import { Link } from "react-router-dom";

import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { SolrSearchResultItem } from "../../services/SearchService";
import { PdfIcon, MetadataSourceIcon } from "../../components/Icons";

export interface StandardMetadataResponse extends SolrSearchResultItem {
    title: string;
    description: string;
    website: string;
    theme: Array<string>;
    parentStandard: string;
    relatedContent: Array<object>;
    uri: string;
    childStandard: string;
    document: string;
    id: string;
    sourceSystem_homepage: string;
    sourceSystem_title: string;
    xsd: string;
}

export interface StandardViewProps {
    item: StandardMetadataResponse;
}

export function StandardView(props: StandardViewProps) {
    const metadata = props.item;
    const toast = useToast();

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
                                    tag: "Parent standard",
                                    val: metadata.parentStandard
                                },
                                {
                                    tag: "Theme",
                                    val: metadata.theme
                                },
                                {
                                    tag: "Type",
                                    val: metadata.type
                                },
                                {
                                    tag: "URI",
                                    val: metadata.uri
                                },
                                {
                                    tag: "Child standard",
                                    val: metadata.childStandard
                                },
                                {
                                    tag: "XSD",
                                    val: metadata.xsd
                                }
                            ]}
                            visibleElements={3}
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
                    <Box className="actionButtonGroup" pt="74px">
                        {metadata.website ? (
                            <Link
                                to={metadata.website[0] as string}
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
                        ) : null}
                        {metadata.document ? (
                            <Link
                                to={metadata.document[0] as string}
                                className="actionButtonLink"
                                target="_blank"
                            >
                                <ActionButton
                                    label="Download as PDF"
                                    icon={<PdfIcon color="white" />}
                                    variant="solid"
                                    fun={() => void 0}
                                />
                            </Link>
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
                        {metadata.website ? (
                            <ActionButton
                                label="Copy URL"
                                icon={<LinkIcon color="#05668D" />}
                                variant="outline"
                                fun={() => copyToClipBoard(metadata.website)}
                            />
                        ) : null}
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}
