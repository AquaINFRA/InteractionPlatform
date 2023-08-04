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
//import { RelatedContent } from "../../components/ResourceType/RelatedContent/RelatedContent";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { ResultsNavigation } from "../../components/ResultsNavigation/ResultsNavigation";
import { MetadataSourceIcon } from "../../components/Icons";
//import { Contact } from "../../components/ResourceType/Contact/Contact";

export interface OrganisationMetadataResponse {
    name: string;
    homepage: string;
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

    console.log(metadata);

    const fun = () => {
        console.log("This is a fun");
    };

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
                            <Box className="title" pt="15px">
                                {metadata.name}
                            </Box>
                            <Box pt="36px">
                                <Metadata
                                    metadataElements={[
                                        {
                                            tag: "Organisation URL",
                                            val: metadata.homepage
                                        }
                                    ]}
                                    visibleElements={1}
                                    expandedByDefault={true}
                                />
                            </Box>
                            <Box pt="80px">
                                <Abstract abstractText={"add text"} />
                            </Box>
                        </Box>
                        <Box w="25%">
                            <ResultsNavigation result={1} of={100} />
                            <Box className="actionButtonGroup" pt="74px">
                                <ActionButton
                                    label="Visit organisation"
                                    icon={<ExternalLinkIcon color="white" />}
                                    variant="solid"
                                    fun={fun}
                                />
                                <ActionButton
                                    label="Visit metadata source"
                                    icon={<MetadataSourceIcon color="#05668D" />}
                                    variant="outline"
                                    fun={fun}
                                />
                                <ActionButton
                                    label="Copy permalink"
                                    icon={<LinkIcon color="#05668D" />}
                                    variant="outline"
                                    fun={fun}
                                />
                            </Box>
                        </Box>
                    </Flex>
                    <Box pt="80px">
                        {/*<Contact
                            address={{
                                tag: "Address",
                                val: metadataResponse["address"]
                            }}
                            location={metadataResponse["location"]}
                        />*/}
                    </Box>
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
