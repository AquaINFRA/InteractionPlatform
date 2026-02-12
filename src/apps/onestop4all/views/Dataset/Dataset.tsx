import { Box, Flex } from "@open-pioneer/chakra-integration";

import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ExternalResources } from "../../components/ResourceType/ExternalResources/ExternalResources";
import { Map } from "../../components/ResourceType/Map/Map";
import { DkpResources } from "../../components/ResourceType/ExternalResources/DkpResources";
import { formatDate } from "../../services/ResourceTypeUtils";
import { DatasetMetadataResponse } from "../../services/interfaces";

export interface DatasetViewProps {
    item: DatasetMetadataResponse;
}

export function DatasetView(props: DatasetViewProps) {
    const metadata = props.item;
    console.log(metadata);
    
    return (
        <Box>
            {/* Desktop view */}
            <Flex gap="10%" hideBelow="custombreak">
                <Box w="65%">
                    {metadata.properties.title ? (
                        <Box className="title" pt="15px">
                            {metadata.properties.title}
                        </Box>
                    ) : null}
                    <Box pt="30px">{getMetadata()}</Box>
                    {metadata.properties.description ? (
                        <Box pt="10px">
                            <Abstract abstractText={metadata.properties.description} />
                        </Box>
                    ) : null}
                    {metadata.geometry ? (
                        <Box pt="10px">
                            <Map geometry={metadata.geometry} mapId="desktop" />
                        </Box>
                    ) : null}
                </Box>
                <Box w="25%">
                    {metadata.links ? (
                        <Box pt="8px">
                            <ExternalResources links={metadata.links} />
                        </Box>
                    ) : null}
                    {metadata.dkps ? (
                        <Box pt="8px">
                            <DkpResources dkps={metadata.dkps} />
                        </Box>
                    ) : null}
                </Box>
            </Flex>
            {/* Mobile view */}
            <Box hideFrom="custombreak">
                {metadata.properties.title ? (
                    <Box className="title" pt="15px">
                        {metadata.properties.title}
                    </Box>
                ) : null}
                <Box pt="30px">{getMetadata()}</Box>
                {metadata.properties.description ? (
                    <Box pt="40px">
                        <Abstract abstractText={metadata.properties.description} />
                    </Box>
                ) : null}
                {metadata.geometry ? (
                    <Box pt="40px">
                        <Map geometry={metadata.geometry} mapId="mobile" />
                    </Box>
                ) : null}
                {metadata.description ? (
                    <Box pt="40px">
                        <Abstract abstractText={metadata.description} />
                    </Box>
                ) : null}
                {metadata.links ? (
                    <Box pt="40px">
                        <ExternalResources links={metadata.links} />
                    </Box>
                ) : null}
                {metadata.dkps ? (
                    <Box pt="8px">
                        <DkpResources dkps={metadata.dkps} />
                    </Box>
                ) : null}
            </Box>
        </Box>
    );

    function getMetadata() {
        return (
            <Metadata
                metadataElements={[
                    {
                        element: "Formats",
                        tag: metadata.properties.formats?.length > 1 ? "Formats" : "Format",
                        val: metadata.properties.formats
                    },
                    {
                        element: "providers",
                        tag: metadata.properties.providers?.length > 1 ? "Providers" : "Provider",
                        val: metadata.properties.providers
                    },
                    {
                        element: "Created",
                        tag: "Created",
                        val: metadata.properties.created ? formatDate(new Date(metadata.properties.created)) : null
                    },
                    {
                        element: "Type",
                        tag: "Type",
                        val: metadata.properties.type
                    },
                    {
                        element: "keywords",
                        tag: metadata.properties.keywords?.length > 1 ? "Keywords" : "Keyword",
                        val: metadata.properties.keywords
                    },
                    {
                        element: "License",
                        tag: "License",
                        val: metadata.properties.license
                    },
                    {
                        element: "Updated",
                        tag: "Updated",
                        val: metadata.properties.updated ? formatDate(new Date(metadata.properties.updated)) : null
                    },
                    {
                        element: "language",
                        tag: metadata.properties.language?.length > 1 ? "Languages" : "Language",
                        val: metadata.properties.language
                    },
                    {
                        element: "Rights",
                        tag: "Rights",
                        val: metadata.properties.rights
                    }
                ]}
                visibleElements={4}
                expandedByDefault={false}
            />
        );
    }
}
