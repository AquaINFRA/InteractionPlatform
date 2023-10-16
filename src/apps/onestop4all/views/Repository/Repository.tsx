import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@open-pioneer/chakra-integration";
import { Link } from "react-router-dom";

import { InfoIcon } from "../../components/Icons";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { Api } from "../../components/ResourceType/Api_Identifier/Api";
import { LastUpdate } from "../../components/ResourceType/Metadata/LastUpdate";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { SolrSearchResultItem } from "../../services/SearchService";
import { MetadataSourceIcon } from "../../components/Icons";
import { CopyToClipboardButton } from "../../components/ResourceType/ActionButton/CopyToClipboardButton";

export interface RepositoryMetadataResponse extends SolrSearchResultItem {
    title: string;
    description: string;
    homepage: string;
    theme: string;
    keyword: string;
    contactPoint_email: string;
    contactPoint_url: string;
    publisher: string;
    altLabel: string;
    catalogAccessType: string;
    catalogLicense: string;
    catalogAccessRestriction: string;
    dataAccessType: string;
    dataLicense: string;
    dataUploadRestriction: string;
    dataUploadType: string;
    dataAccessRestriction: string;
    language: string;
    publisher_alt: string;
    supportsMetadataStandard: string;
    uri: string;
    api: Array<object>;
    relatedContent: Array<object>;
    dateModified: string;
    distribution_accessURL: Array<string>;
    distribution_conformsTo: Array<string>;
    sourceSystem_id: string;
    assignsIdentifierScheme: string;
}

export interface RepositoryViewProps {
    item: RepositoryMetadataResponse;
}

export function RepositoryView(props: RepositoryViewProps) {
    const metadata = props.item;

    return (
        <Box>
            <Flex gap="10%">
                <Box w="65%">
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
                                    tag: "Contact email",
                                    val: metadata.contactPoint_email
                                },
                                {
                                    tag: "Contact URL",
                                    val: metadata.contactPoint_url
                                },
                                {
                                    tag: "Publisher",
                                    val: metadata.publisher
                                },
                                {
                                    tag: "Alternative publisher",
                                    val: metadata.publisher_alt
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
                                    tag: "Catalog license",
                                    val: metadata.catalogLicense
                                },
                                {
                                    tag: "Catalog access restriction",
                                    val: metadata.catalogAccessRestriction
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
                                    tag: "Data access restriction",
                                    val: metadata.dataAccessRestriction
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
                                    tag: "Supports metadata standard",
                                    val: metadata.supportsMetadataStandard
                                },
                                {
                                    tag: "Type",
                                    val: metadata.type
                                },
                                {
                                    tag: "Assigns identifier scheme",
                                    val: metadata.assignsIdentifierScheme
                                }
                            ]}
                            visibleElements={7}
                            expandedByDefault={true}
                        />
                    </Box>
                    {metadata.description ? (
                        <Box pt="80px">
                            <Abstract abstractText={metadata.description} />
                        </Box>
                    ) : null}
                </Box>
                <Box w="25%">
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
                            {metadata.sourceSystem_id ? (
                                <Link
                                    to={metadata.sourceSystem_id as string}
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
                            {metadata.homepage ? (
                                <CopyToClipboardButton data={metadata.homepage} label="Copy URL" />
                            ) : null}
                        </Box>
                    ) : null}
                    {metadata.dateModified ? (
                        <Box pt="33">
                            <LastUpdate date={metadata.dateModified} />
                        </Box>
                    ) : null}
                    {metadata.distribution_conformsTo && metadata.distribution_accessURL ? (
                        <Box pt="33px">
                            <Api
                                apis={metadata.distribution_conformsTo}
                                urls={metadata.distribution_accessURL}
                            />
                        </Box>
                    ) : null}
                </Box>
            </Flex>
        </Box>
    );
}
