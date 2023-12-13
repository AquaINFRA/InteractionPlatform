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
    relatedContent: Array<string>;
    relatedResources: Array<object>;
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
                    {metadata.title || metadata.altLabel ? (
                        <Box className="title" pt="15px">
                            {metadata.title ? metadata.title : metadata.altLabel}
                        </Box>
                    ) : null}
                    <Box pt="36px">
                        <Metadata
                            metadataElements={[
                                {
                                    element: "url",
                                    tag: metadata.homepage?.length > 1 ? "URLs" : "URL",
                                    val: metadata.homepage
                                },
                                {
                                    element: "theme",
                                    tag: metadata.theme?.length > 1 ? "Themes" : "Theme",
                                    val: metadata.theme
                                },
                                {
                                    element: "keyword",
                                    tag: metadata.keyword?.length > 1 ? "Keywords" : "Keyword",
                                    val: metadata.keyword
                                },
                                {
                                    element: "label",
                                    tag: "Label",
                                    val: "NFDI4Earth Label"
                                },
                                {
                                    element: "contactMail",
                                    tag:
                                        metadata.contactPoint_email?.length > 1
                                            ? "Contact emails"
                                            : "Contact email",
                                    val: metadata.contactPoint_email
                                },
                                {
                                    element: "contactUrl",
                                    tag:
                                        metadata.contactPoint_url?.length > 1
                                            ? "Contact URLs"
                                            : "Contact URL",
                                    val: metadata.contactPoint_url
                                },
                                {
                                    element: "publisher",
                                    tag: metadata.publisher?.length ? "Publishers" : "Publisher",
                                    val: metadata.publisher
                                },
                                {
                                    element: "publisherAlt",
                                    tag:
                                        metadata.publisher_alt?.length > 1
                                            ? "Alternative publishers"
                                            : "Alternative publisher",
                                    val: metadata.publisher_alt
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
                                    element: "catalogAccessType",
                                    tag:
                                        metadata.catalogAccessType?.length > 1
                                            ? "Catalog access types"
                                            : "Catalog access type",
                                    val: metadata.catalogAccessType
                                },
                                {
                                    element: "catalogLicense",
                                    tag:
                                        metadata.catalogLicense?.length > 1
                                            ? "Catalog licenses"
                                            : "Catalog license",
                                    val: metadata.catalogLicense
                                },
                                {
                                    element: "catalogAccessRestriction",
                                    tag:
                                        metadata.catalogAccessRestriction?.length > 1
                                            ? "Catalog access restrictions"
                                            : "Catalog access restriction",
                                    val: metadata.catalogAccessRestriction
                                },
                                {
                                    element: "dataAccessType",
                                    tag:
                                        metadata.dataAccessType?.length > 1
                                            ? "Data access types"
                                            : "Data access type",
                                    val: metadata.dataAccessType
                                },
                                {
                                    element: "dataLicense",
                                    tag:
                                        metadata.dataLicense?.length > 1
                                            ? "Data licenses"
                                            : "Data license",
                                    val: metadata.dataLicense
                                },
                                {
                                    element: "dataUploadRestriction",
                                    tag:
                                        metadata.dataUploadRestriction?.length > 1
                                            ? "Data upload restrictions"
                                            : "Data upload restriction",
                                    val: metadata.dataUploadRestriction
                                },
                                {
                                    element: "dataAccessRestriction",
                                    tag:
                                        metadata.dataAccessRestriction?.length > 1
                                            ? "Data access restrictions"
                                            : "Data access restriction",
                                    val: metadata.dataAccessRestriction
                                },
                                {
                                    element: "dataUploadType",
                                    tag:
                                        metadata.dataUploadType?.length > 1
                                            ? "Data upload types"
                                            : "Data upload type",
                                    val: metadata.dataUploadType
                                },
                                {
                                    element: "language",
                                    tag: metadata.language?.length > 1 ? "Languages" : "Language",
                                    val: metadata.language
                                },
                                {
                                    element: "supportsMetadataStandard",
                                    tag:
                                        metadata.supportsMetadataStandard?.length > 1
                                            ? "Supports metadata standards"
                                            : "Supports metadata standard",
                                    val: metadata.supportsMetadataStandard
                                },
                                {
                                    element: "type",
                                    tag: "Type",
                                    val: metadata.type
                                },
                                {
                                    element: "assignsIdentifierScheme",
                                    tag:
                                        metadata.assignsIdentifierScheme?.length > 1
                                            ? "Assigns identifier schemes"
                                            : "Assigns identifier scheme",
                                    val: metadata.assignsIdentifierScheme
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
