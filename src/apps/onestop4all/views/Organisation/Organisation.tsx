import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@open-pioneer/chakra-integration";
import { Link } from "react-router-dom";

import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { Identifier } from "../../components/ResourceType/Api_Identifier/Identifier";
import { Contact } from "../../components/ResourceType/Contact/Contact";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { SolrSearchResultItem } from "../../services/SearchService";
import { MetadataSourceIcon } from "../../components/Icons";
import { CopyToClipboardButton } from "../../components/ResourceType/ActionButton/CopyToClipboardButton";

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

    return (
        <Box>
            <Flex gap="10%">
                <Box w="65%">
                    {metadata.name || metadata.name_alt ? (
                        <Box className="title" pt="15px">
                            {metadata.name ? metadata.name : metadata.name_alt[0]}
                        </Box>
                    ) : (
                        ""
                    )}
                    <Box pt="36px">
                        <Metadata
                            metadataElements={[
                                {
                                    element: "url",
                                    tag: metadata.homepage?.length > 1 ? "URLs" : "URL",
                                    val: metadata.homepage
                                },
                                {
                                    tag: "ROR ID",
                                    val: metadata.rorId
                                        ? "https://ror.org/" + metadata.rorId
                                        : undefined
                                },
                                {
                                    element: "alternativeName",
                                    tag:
                                        metadata.name_alt?.length > 1
                                            ? "Alternative names"
                                            : "Alternative name",
                                    val: metadata.name_alt
                                },
                                {
                                    element: "type",
                                    tag: "Type",
                                    val: metadata.type
                                },
                                {
                                    element: "sameAs",
                                    tag: "Same as",
                                    val: metadata.sameAs
                                },
                                {
                                    element: "alternativeLabels",
                                    tag:
                                        metadata.altLabel?.length > 1
                                            ? "Alternative labels"
                                            : "Alternative label",
                                    val: metadata.altLabel
                                },
                                {
                                    element: "countryName",
                                    tag:
                                        metadata.countryName?.length > 1
                                            ? "Country names"
                                            : "Country name",
                                    val: metadata.countryName
                                },
                                {
                                    element: "locality",
                                    tag: metadata.locality?.length > 1 ? "Localities" : "Locality",
                                    val: metadata.locality
                                },
                                {
                                    element: "subOrganizationOf",
                                    tag: "Suborganisation of",
                                    val: metadata.subOrganizationOf
                                },
                                {
                                    element: "nfdi",
                                    tag: "NFDI contact",
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
                            expandedByDefault={true}
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
                                    <CopyToClipboardButton
                                        data={
                                            metadata.homepage[0]
                                                ? metadata.homepage[0]
                                                : metadata.homepage
                                        }
                                        label="Copy URL"
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
