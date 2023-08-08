import { Box, Container, Image, Flex, Divider } from "@open-pioneer/chakra-integration";
//import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
//import { useToast } from "@open-pioneer/chakra-integration";

import { SearchBar } from "../../components/SearchBar";
import { ResourceTypeHeader } from "../../components/ResourceType/ResourceTypeHeader/ResourceTypeHeader";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
//import { RelatedContent } from "../../components/ResourceType/RelatedContent/RelatedContent";
//import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { ResultsNavigation } from "../../components/ResultsNavigation/ResultsNavigation";
//import { MetadataSourceIcon, GoToOpenIssuesIcon } from "../../components/Icons";

export interface ArticleMetadataResponse {
    name: string;
    description: string;
    type: string;
    author: string;
    articleBody: string;
    keyword: string;
    language: string;
}

export function ArticleView() {
    const id = useParams().id as string;
    const searchSrvc = useService("onestop4all.SearchService");
    const [metadata, setMetadata] = useState<ArticleMetadataResponse>();
    //const toast = useToast();

    useEffect(() => {
        searchSrvc.getMetadata(id).then((result) => {
            setMetadata(result.results[0]);
        });
    }, [id]);

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

    console.log(metadata);

    return (
        <Box>
            <Box position="relative">
                <Image src="/image2.png" width="100%" />
            </Box>

            <Box position="absolute" width="100%" marginTop="-70px">
                <Container maxW="80%">
                    <SearchBar></SearchBar>
                </Container>
            </Box>
            {metadata != undefined ? (
                <Container maxW="80%">
                    <Box height="80px" />
                    <Flex gap="10%">
                        <Box w="65%">
                            <ResourceTypeHeader resType="Articles" />
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
                        </Box>
                        <Box w="25%">
                            <ResultsNavigation result={1} of={100} />
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
                                        fun={{}}
                                    />
                                </Link>
                                <ActionButton
                                    label="GO TO OPEN ISSUES"
                                    icon={<GoToOpenIssuesIcon />}
                                    variant="outline"
                                    fun={{}}
                                />
                                <ActionButton
                                    label="VISIT METADATA SOURCE"
                                    icon={<MetadataSourceIcon color="#05668D" />}
                                    variant="outline"
                                    fun={{}}
                                />
                                <ActionButton
                                    label="COPY URL"
                                    icon={<LinkIcon color="#05668D" />}
                                    variant="outline"
                                    fun={() => copyToClipBoard(metadata.homepage)}
                                />
                                </Box>*/}
                        </Box>
                    </Flex>
                    <Box w="100%" pt="80px">
                        <Box>
                            {/*<RelatedContent relatedContentItems={metadataResponse["relatedContentItems"]} />*/}
                        </Box>
                        <Flex gap="10%" alignItems="center" pt="120px">
                            <Divider className="seperator" w="65%" />
                            <Box w="25%">
                                <ResultsNavigation result={1} of={100} />
                            </Box>
                        </Flex>
                    </Box>
                    <Box pt="135px" />
                </Container>
            ) : (
                <></>
            )}
        </Box>
    );
}
