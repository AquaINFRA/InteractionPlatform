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
import { Api } from "../../components/ResourceType/Api_Identifier/Api";
//import { RelatedContent } from "../../components/ResourceType/RelatedContent/RelatedContent";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { ResultsNavigation } from "../../components/ResultsNavigation/ResultsNavigation";
import { InfoIcon } from "../../components/Icons";

export interface RepositoryMetadataResponse {
    title: string;
    description: string;
    type: string;
    homepage: string;
    theme: string;
    keyword: string;
    contactPoint_email: string;
    contactPoint_url: string;
    publisher: string;
    altLabel: string;
    catalogAccessType: string;
    dataAccessType: string;
    dataLicense: string;
    dataUploadRestriction: string;
    dataUploadType: string;
    language: string;
    publisher_alt: string;
    supportsMetadataStandard: string;
    uri: string;
    id: string;
    api: Array<object>;
}

export function RepositoryView() {
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
                            <ResourceTypeHeader resType="Repositories / Archives" />
                            {metadata.title ? (
                                <Box className="title" pt="15px">
                                    {metadata.title}
                                </Box>
                            ) : null}
                            <Box pt="36px">
                                <Metadata
                                    metadataElements={[
                                        {
                                            tag: "URL",
                                            val: metadata.homepage
                                        },
                                        {
                                            tag: "Theme",
                                            val: metadata.theme
                                        },
                                        {
                                            tag: "Keywords",
                                            val: metadata.keyword
                                        },
                                        {
                                            tag: "Label",
                                            val: "NFDI4Earth Label"
                                        },
                                        {
                                            tag: "Publisher",
                                            val: metadata.publisher
                                        },
                                        {
                                            tag: "Contact email",
                                            val: metadata.contactPoint_email
                                        },
                                        {
                                            tag: "Contact URL",
                                            val: metadata.contactPoint_url
                                        },
                                        {
                                            tag: "Alternative label",
                                            val: metadata.altLabel
                                        },
                                        {
                                            tag: "Catalog access type",
                                            val: metadata.catalogAccessType
                                        },
                                        {
                                            tag: "Data access type",
                                            val: metadata.dataAccessType
                                        },
                                        {
                                            tag: "Data license",
                                            val: metadata.dataLicense
                                        },
                                        {
                                            tag: "Data upload restriction",
                                            val: metadata.dataUploadRestriction
                                        },
                                        {
                                            tag: "Data upload type",
                                            val: metadata.dataUploadType
                                        },
                                        {
                                            tag: "Language",
                                            val: metadata.language
                                        },
                                        {
                                            tag: "Alternative publisher",
                                            val: metadata.publisher_alt
                                        },
                                        {
                                            tag: "Supports metadata standard",
                                            val: metadata.supportsMetadataStandard
                                        },
                                        {
                                            tag: "Type",
                                            val: metadata.type
                                        }
                                    ]}
                                    visibleElements={7}
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
                            {metadata.homepage || metadata.dataLicense ? (
                                <Box className="actionButtonGroup" pt="74px">
                                    {metadata.homepage ? (
                                        <Link
                                            to={metadata.homepage[0] as string}
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
                                    {metadata.dataLicense ? (
                                        <Link
                                            to={metadata.dataLicense[0] as string}
                                            className="actionButtonLink"
                                            target="_blank"
                                        >
                                            <ActionButton
                                                label="Open user policy"
                                                icon={<InfoIcon />}
                                                variant="outline"
                                                fun={() => void 0}
                                            />
                                        </Link>
                                    ) : null}
                                    {metadata.homepage ? (
                                        <ActionButton
                                            label="Copy URL"
                                            icon={<LinkIcon color="#05668D" />}
                                            variant="outline"
                                            fun={() => copyToClipBoard(metadata.homepage)}
                                        />
                                    ) : null}
                                </Box>
                            ) : null}
                            {/*{metadata.api ? (*/}
                            <Box pt="33px">
                                <Api api={metadata.api} />
                            </Box>
                            {/*) : null}*/}
                        </Box>
                    </Flex>
                    <Box w="100%" pt="80px">
                        {/*<RelatedContent relatedContentItems={metadataResponse["relatedContentItems"]} />*/}
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
