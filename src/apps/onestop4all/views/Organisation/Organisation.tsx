import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { Box, Flex, useToast } from "@open-pioneer/chakra-integration";
import { Link } from "react-router-dom";

import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { Identifier } from "../../components/ResourceType/Api_Identifier/Identifier";
import { Contact } from "../../components/ResourceType/Contact/Contact";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { SolrSearchResultItem } from "../../services/SearchService";
import { MetadataSourceIcon } from "../../components/Icons";

export interface OrganisationMetadataResponse extends SolrSearchResultItem {
    name: string;
    name_alt: string;
    homepage: string;
    uri: string;
    rorId: string;
    geometry: string;
    sameAs: string;
    altLabel: string;
    countryName: string;
    locality: string;
    subOrganizationOf: string;
    identifier: Array<object>;
    relatedContent: Array<object>;
    otherIdentifiers: object;
    nfdi4EarthContactPerson_name: string;
    nfdi4EarthContactPerson_orcidId: string;
    //nfdi4EarthContactPerson_uri: string; probably not needed
    nfdi4EarthContactPerson_email: string;
    //nfdi4EarthContactPerson_id: string; probably not needed
    nfdi4EarthContactPerson_affiliation: string;
    sourceSystem_homepage: string;
    sourceSystem_title: string;
}

export interface OrganisationViewProps {
    item: OrganisationMetadataResponse;
}

export function OrganisationView(props: OrganisationViewProps) {
    const metadata = props.item;
    const toast = useToast();

    const name = metadata.nfdi4EarthContactPerson_name;
    const email = metadata.nfdi4EarthContactPerson_email;
    const orcid = metadata.nfdi4EarthContactPerson_orcidId;
    const affiliation = metadata.nfdi4EarthContactPerson_affiliation;
    const nfdiContact = {
        name: name ? name : undefined,
        orcid: orcid ? orcid : undefined,
        email: email ? email : undefined,
        affiliation: affiliation ? affiliation : undefined
    };

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
                                },
                                {
                                    tag: "nfdi",
                                    val:
                                        nfdiContact.name ||
                                        nfdiContact.email ||
                                        nfdiContact.orcid ||
                                        nfdiContact.affiliation
                                            ? nfdiContact
                                            : undefined
                                }
                            ]}
                            visibleElements={2}
                            expandedByDefault={false}
                        />
                    </Box>
                </Box>
                <Box w="25%">
                    {metadata.homepage || metadata.sourceSystem_homepage ? (
                        <Box className="actionButtonGroup" pt="74px">
                            {metadata.homepage ? (
                                <>
                                    <Link
                                        to={metadata.homepage[0] as string}
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
                                    <ActionButton
                                        label="Copy URL"
                                        icon={<LinkIcon color="#05668D" />}
                                        variant="outline"
                                        fun={() => copyToClipBoard(metadata.homepage)}
                                    />
                                </>
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
                        </Box>
                    ) : null}
                    {metadata.otherIdentifiers ? (
                        <Box pt="33px">
                            <Identifier identifiers={metadata.otherIdentifiers} />
                        </Box>
                    ) : null}
                </Box>
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
        </Box>
    );
}
