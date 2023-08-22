import { Box, Container, Image, Flex, Divider, useToast } from "@open-pioneer/chakra-integration";
import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { useParams, Link } from "react-router-dom";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";

import { SearchBar } from "../../components/SearchBar";
import { ResourceTypeHeader } from "../../components/ResourceType/ResourceTypeHeader/ResourceTypeHeader";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { RelatedContent } from "../../components/ResourceType/RelatedContent/RelatedContent";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { ResultsNavigation } from "../../components/ResultsNavigation/ResultsNavigation";
import { PdfIcon, MetadataSourceIcon } from "../../components/Icons";

export interface RepositoryMetadataResponse {
    title: string;
    description: string;
    type: string;
    website: string;
    id: string;
    parentStandard: string;
    relatedContent: Array<object>;
    theme: Array<string>;
    uri: string;
}

export function StandardView() {
    const id = useParams().id as string;
    const searchSrvc = useService("onestop4all.SearchService");
    const [metadata, setMetadata] = useState<RepositoryMetadataResponse>();
    const toast = useToast();

    useEffect(() => {
        searchSrvc.getMetadata(id).then((result) => {
            setMetadata(result.results[0]);
        });
    }, [id]);

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

    //TEST DATA FOR RELATED CONTENT SECTION
    const relatedContent = [
        {
            title: "This is a related service with a title a bit longer than the allowed 100 characters (complete example)",
            resourceType: "Service",
            id: "1234"
        },
        {
            title: "This is a related standard (url missing)",
            resourceType: "Standard"
        },
        {
            title: "This is a related organisation (resource type missing)",
            id: "1234"
        },
        {
            resourceType: "Tool/Software",
            id: "1234"
        },
        {
            title: "This is a related lesson",
            resourceType: "Educational resource",
            id: "1234"
        }
    ];

    metadata ? (metadata.relatedContent = relatedContent) : null;

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
                            <ResourceTypeHeader resType="Standard" />
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
                            <ResultsNavigation result={1} of={100} />
                            <Box className="actionButtonGroup" pt="74px">
                                {metadata.website ? (
                                    <Link
                                        to={metadata.website[0] as string}
                                        className="actionButtonLink"
                                        target="_blank"
                                    >
                                        <ActionButton
                                            label="Visit repository"
                                            icon={<ExternalLinkIcon color="white" />}
                                            variant="solid"
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
                    <Box w="100%" pt="80px">
                        {metadata.relatedContent ? (
                            <RelatedContent relatedContentItems={metadata.relatedContent} />
                        ) : null}
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
