import { Box, Container, Image, Flex, Divider } from "@open-pioneer/chakra-integration";
import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { useParams, Link } from "react-router-dom";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { useToast } from "@open-pioneer/chakra-integration";

import { SearchBar } from "../../components/SearchBar";
import { ResourceTypeHeader } from "../../components/ResourceType/ResourceTypeHeader/ResourceTypeHeader";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
//import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
//import { RelatedContent } from "../../components/ResourceType/RelatedContent/RelatedContent";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { ResultsNavigation } from "../../components/ResultsNavigation/ResultsNavigation";
import { Contact } from "../../components/ResourceType/Contact/Contact";

export interface OrganisationMetadataResponse {
    name: string;
    name_alt: string;
    type: string;
    homepage: string;
    uri: string;
    id: string;
    rorId: string;
    geometry: string;
    sameAs: string;
    altLabel: string;
    countryName: string;
    locality: string;
    subOrganizationOf: string;
}

export function OrganisationView() {
    const id = useParams().id as string;
    const searchSrvc = useService("onestop4all.SearchService");
    const [metadata, setMetadata] = useState<OrganisationMetadataResponse>();
    const toast = useToast();

    useEffect(() => {
        searchSrvc.getMetadata(id).then((result) => {
            setMetadata(result.results[0]);
        });
    }, [id]);

    const copyToClipBoard = (link: string) => {
        if (link != undefined) {
            navigator.clipboard.writeText(link);
            //TO DO-1: There is sth. wrong with the tooltip!
            //TO DO-2: Create reusable function/component out of it
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
                            <ResourceTypeHeader resType="Organisations" />
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
                                            tag: "URL",
                                            val: metadata.homepage
                                        },
                                        {
                                            tag: "ROR ID",
                                            val: metadata.rorId
                                                ? "https://ror.org/" + metadata.rorId
                                                : undefined
                                        },
                                        {
                                            tag: "Alternative name",
                                            val: metadata.name_alt
                                        },
                                        {
                                            tag: "Type",
                                            val: metadata.type
                                        },
                                        {
                                            tag: "Geometry",
                                            val: metadata.geometry
                                        },
                                        {
                                            tag: "Same as",
                                            val: metadata.sameAs
                                        },
                                        {
                                            tag: "Alternative label",
                                            val: metadata.altLabel
                                        },
                                        {
                                            tag: "Country name",
                                            val: metadata.countryName
                                        },
                                        {
                                            tag: "Locality",
                                            val: metadata.locality
                                        },
                                        {
                                            tag: "Suborganisation of",
                                            val: metadata.subOrganizationOf
                                        }
                                    ]}
                                    visibleElements={2}
                                    expandedByDefault={false}
                                />
                            </Box>
                        </Box>
                        {metadata.homepage ? (
                            <Box w="25%">
                                <ResultsNavigation result={1} of={100} />
                                <Box className="actionButtonGroup" pt="74px">
                                    <Link
                                        to={metadata.homepage[0] as string}
                                        className="actionButtonLink"
                                        target="_blank"
                                    >
                                        <ActionButton
                                            label="Visit repository"
                                            icon={<ExternalLinkIcon color="white" />}
                                            variant="solid"
                                            fun={{}}
                                        />
                                    </Link>
                                    <ActionButton
                                        label="Copy URL"
                                        icon={<LinkIcon color="#05668D" />}
                                        variant="outline"
                                        fun={() => copyToClipBoard(metadata.homepage)}
                                    />
                                </Box>
                            </Box>
                        ) : null}
                    </Flex>
                    {metadata.geometry ? (
                        <Box pt="80px">
                            <Contact
                                address={{
                                    tag: "Location",
                                    val: metadata.geometry
                                }}
                                location={metadata.geometry}
                            />
                        </Box>
                    ) : null}
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
