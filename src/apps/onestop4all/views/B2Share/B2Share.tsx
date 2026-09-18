import { Box, Flex } from "@open-pioneer/chakra-integration";

import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { DkpResources } from "../../components/ResourceType/ExternalResources/Components/DkpResources";
import { B2ShareResources } from "./B2ShareResources";
import {
    B2ShareViewProps,
    getB2ShareAuthors,
    getB2ShareDoi,
    getB2ShareDownloads,
    getB2ShareKeywords,
    getB2ShareOriginalMetadataUrl,
    getB2ShareOriginalPageUrl
} from "../../services/B2ShareUtils";

export function B2ShareView(props: B2ShareViewProps) {
    const metadata = props.item;
    const properties = metadata.properties;

    const authors = getB2ShareAuthors(metadata);
    const keywords = getB2ShareKeywords(metadata);
    const doi = getB2ShareDoi(metadata);

    return (
        <Box>
            {/* Desktop view */}
            <Flex gap="10%" hideBelow="custombreak">
                <Box w="65%">
                    {properties.title ? (
                        <Box className="title" pt="15px">
                            {properties.title}
                        </Box>
                    ) : null}
                    <Box pt="30px">{getMetadata()}</Box>
                    {properties.description ? (
                        <Box pt="80px">
                            <Abstract abstractText={properties.description} />
                        </Box>
                    ) : null}
                </Box>
                <Box w="25%">
                    {metadata.dkps ? (
                        <Box pt="8px">
                            <DkpResources dkps={metadata.dkps} />
                        </Box>
                    ) : null}
                    <Box pt="40px">
                        <B2ShareResources
                            repoHtml={getB2ShareOriginalPageUrl(metadata)}
                            metadataJson={getB2ShareOriginalMetadataUrl(metadata)}
                            downloads={getB2ShareDownloads(metadata)}
                        />
                    </Box>
                </Box>
            </Flex>
            {/* Mobile view */}
            <Box hideFrom="custombreak">
                {properties.title ? (
                    <Box className="title" pt="15px">
                        {properties.title}
                    </Box>
                ) : null}
                <Box pt="30px">{getMetadata()}</Box>
                {properties.description ? (
                    <Box pt="40px">
                        <Abstract abstractText={properties.description} />
                    </Box>
                ) : null}
                {metadata.dkps ? (
                    <Box pt="8px">
                        <DkpResources dkps={metadata.dkps} />
                    </Box>
                ) : null}
                <Box pt="40px">
                    <B2ShareResources
                        repoHtml={getB2ShareOriginalPageUrl(metadata)}
                        metadataJson={getB2ShareOriginalMetadataUrl(metadata)}
                        downloads={getB2ShareDownloads(metadata)}
                    />
                </Box>
            </Box>
        </Box>
    );

    function getMetadata() {
        return (
            <Metadata
                metadataElements={[
                    {
                        element: "author",
                        tag: authors.length > 1 ? "Authors" : "Author",
                        val: authors
                    },
                    {
                        element: "provider",
                        tag: "Provider",
                        val: metadata.provider
                    },
                    {
                        element: "keyword",
                        tag: keywords.length > 1 ? "Keywords" : "Keyword",
                        val: keywords
                    },
                    {
                        element: "datePublished",
                        tag: "Published",
                        val: properties.created ? new Date(properties.created).toLocaleDateString() : ""
                    },
                    {
                        element: "datePublished",
                        tag: "Updated",
                        val: properties.updated ? new Date(properties.updated).toLocaleDateString() : ""
                    },
                    {
                        element: "language",
                        tag: "Language",
                        val: properties.language
                    },
                    {
                        element: "type",
                        tag: "Type",
                        val: properties.type
                            ? properties.type.charAt(0).toUpperCase() + properties.type.slice(1)
                            : ""
                    },
                    {
                        element: "license",
                        tag: "License",
                        val: properties.license
                    },
                    {
                        element: "doi",
                        tag: "DOI",
                        val: doi
                    }
                ]}
                visibleElements={3}
                expandedByDefault={false}
            />
        );
    }
}
