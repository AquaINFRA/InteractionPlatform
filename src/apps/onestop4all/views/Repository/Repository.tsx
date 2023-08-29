import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { Box, Flex, useToast } from "@open-pioneer/chakra-integration";
import { Link } from "react-router-dom";

import { InfoIcon } from "../../components/Icons";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { Api } from "../../components/ResourceType/Api_Identifier/Api";
import { LastUpdate } from "../../components/ResourceType/Metadata/LastUpdate";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { SolrSearchResultItem } from "../../services/SearchService";

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
    dataAccessType: string;
    dataLicense: string;
    dataUploadRestriction: string;
    dataUploadType: string;
    language: string;
    publisher_alt: string;
    supportsMetadataStandard: string;
    uri: string;
    api: Array<object>;
    relatedContent: Array<object>;
    dateModified: string;
    distribution_accessURL: Array<string>;
    distribution_conformsTo: Array<string>;
    sourceSystem_homepage: string;
    sourceSystem_title: string;
}

export interface RepositoryViewProps {
    item: RepositoryMetadataResponse;
}

export function RepositoryView(props: RepositoryViewProps) {
    const metadata = props.item;
    const toast = useToast();

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
                                },
                                {
                                    tag: "Source",
                                    val:
                                        metadata.sourceSystem_title &&
                                        metadata.sourceSystem_homepage
                                            ? [
                                                  metadata.sourceSystem_title,
                                                  metadata.sourceSystem_homepage
                                              ]
                                            : undefined
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
