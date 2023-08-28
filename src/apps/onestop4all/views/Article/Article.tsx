import { Box, Flex } from "@open-pioneer/chakra-integration";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";

import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Support } from "../../components/ResourceType/Support/Support";
import { TOC } from "../../components/ResourceType/TOC/TOC";
import { SolrSearchResultItem } from "../../services/SearchService";

//import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
//import { useToast } from "@open-pioneer/chakra-integration";
//import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
//import { MetadataSourceIcon, GoToOpenIssuesIcon } from "../../components/Icons";
export interface ArticleMetadataResponse extends SolrSearchResultItem {
    name: string;
    description: string;
    author: string;
    articleBody: string;
    keyword: string;
    language: string;
    relatedContent: Array<object>;
}

export interface ArticleViewProps {
    item: ArticleMetadataResponse;
}

export function ArticleView(props: ArticleViewProps) {
    const metadata = props.item;
    //const toast = useToast();

    /*ONLY NEEDED IF THERE WILL BE A URL const copyToClipBoard = (link: string) => {
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
    };*/

    //TEST DATA FOR RELATED CONTENT SECTION
    /*metadata
        ? (metadata.relatedContent = [
            {
                title: "This is a related service with a title a bit longer than the allowed 100 characters (complete example)",
                resourceType: "Services",
                id: "1234"
            },
            { title: "This is a related standard (url missing)", resourceType: "Standards" },
            { title: "This is a related organisation (resource type missing)", id: "1234" },
            { resourceType: "Tools/Software", id: "1234" },
            {
                title: "This is a related lesson",
                resourceType: "Educational resources",
                id: "1234"
            }
        ])
        : null;*/

    console.log(metadata);

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
                                }
                            ]}
                            visibleElements={2}
                            expandedByDefault={false}
                        />
                    </Box>
                    <Box pt="80px">
                        <ReactMarkdown components={ChakraUIRenderer()}>
                            {metadata.articleBody[0] ? metadata.articleBody[0] : ""}
                        </ReactMarkdown>
                    </Box>
                    <Box pt="80px">
                        <Support />
                    </Box>
                </Box>
                <Box w="25%">
                    {/*THERE IS CURRENTLY NO URL <Box className="actionButtonGroup" pt="74px">
                                <Link
                                    to={metadata.homepage[0] as string}
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
                                    label="GO TO OPEN ISSUES"
                                    icon={<GoToOpenIssuesIcon />}
                                    variant="outline"
                                    fun={() => void 0}
                                />
                                <ActionButton
                                    label="VISIT METADATA SOURCE"
                                    icon={<MetadataSourceIcon color="#05668D" />}
                                    variant="outline"
                                    fun={() => void 0}
                                />
                                <ActionButton
                                    label="COPY URL"
                                    icon={<LinkIcon color="#05668D" />}
                                    variant="outline"
                                    fun={() => copyToClipBoard(metadata.homepage)}
                                />
                                </Box>*/}
                    {metadata.articleBody[0] ? <TOC md={metadata.articleBody[0]} /> : null}
                </Box>
            </Flex>
        </Box>
    );
}
