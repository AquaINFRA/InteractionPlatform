import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { Box, Flex, useToast } from "@open-pioneer/chakra-integration";
import { Link } from "react-router-dom";

import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { SolrSearchResultItem } from "../../services/SearchService";

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
                                    tag: "Type",
                                    val: metadata.type
                                },
                                {
                                    tag: "Keywords",
                                    val: metadata.keyword
                                },
                                {
                                    tag: "License",
                                    val: metadata.license
                                },
                                {
                                    tag: "Programming language",
                                    val: metadata.programmingLanguage
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
                    {metadata.codeRepository ? (
                        <Box className="actionButtonGroup" pt="74px">
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
        </Box>
    );
}
