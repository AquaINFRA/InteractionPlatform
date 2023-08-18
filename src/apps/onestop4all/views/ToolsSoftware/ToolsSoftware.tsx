import { Box, Container, Image, Flex, Divider } from "@open-pioneer/chakra-integration";
import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { useParams, Link } from "react-router-dom";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { useToast } from "@open-pioneer/chakra-integration";

import { SearchBar } from "../../components/SearchBar";
import { ResourceTypeHeader } from "../../components/ResourceType/ResourceTypeHeader/ResourceTypeHeader";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { RelatedContent } from "../../components/ResourceType/RelatedContent/RelatedContent";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { ResultsNavigation } from "../../components/ResultsNavigation/ResultsNavigation";

export interface RepositoryMetadataResponse {
    name: string;
    description: string;
    codeRepository: string;
    type: string;
    keyword: string;
    license: string;
    uri: string;
    id: string;
    relatedContent: Array<object>;
}

export function ToolsSoftwareView() {
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
    /*metadata
        ? (metadata.relatedContent = [
            {
                title: "This is a related service with a title a bit longer than the allowed 100 characters (complete example)",
                resourceType: "Services",
                id: "1234"
            },
            {
                title: "This is a related standard (url missing)",
                resourceType: "Standards"
            },
            {
                title: "This is a related organisation (resource type missing)",
                id: "1234"
            },
            {
                resourceType: "Tools/Software",
                id: "1234"
            },
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
                            <ResourceTypeHeader resType="Tools/Software" />
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
                                            tag: "Keywords",
                                            val: metadata.keyword
                                        },
                                        {
                                            tag: "License",
                                            val: metadata.license
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
                            <ResultsNavigation result={1} of={100} />
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
                    <Box w="100%" pt="80px">
                        {metadata.relatedContent ? (
                            <RelatedContent relatedContentItems={metadata.relatedContent} />
                        ) : null}
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
