import { Box, Container, Image, Grid, GridItem } from "@open-pioneer/chakra-integration";
import { SearchBar } from "../components/SearchBar";
import { ResourceTypeHeader } from "../components/ResourceType/ResourceTypeHeader";
import { Metadata } from "../components/ResourceType/Metadata/Metadata";

export function StandardView() {
    const metadataElements = [
        { tag: "Standards organization", val: "Open Geospatial Consortium" },
        { tag: "Date of publication", val: "10.07.2014" },
        { tag: "Version", val: "2.0.2" },
        { tag: "External Identifier", val: "http://www.opengis.net/doc/IS/wfs/2.0.2" },
        {
            tag: "Keywords",
            val: [
                "ogcdoc",
                "OGC document",
                "web feature service",
                "wfs",
                "property",
                "geographic information",
                "resource",
                "geography markup language",
                "GML",
                "Transaction",
                "GetFeature",
                "GetCapabilities",
                "stored query",
                "XML",
                "KVP",
                "encoding",
                "Schema",
                "HTTP",
                "GET",
                "POST",
                "SOAP",
                "request",
                "response",
                "capabilities document",
                "filter encoding",
                "contraint"
            ]
        }
    ];
    const hideMetadata = false;
    return (
        <>
            <Image src="/image2.png" width="100%" />
            <Box position="absolute" width="100%" marginTop="-50px">
                BorderColor
                <Container maxW="80%">
                    <SearchBar></SearchBar>
                </Container>
            </Box>
            <ResourceTypeHeader resType="standard"></ResourceTypeHeader>
            <Metadata hide={hideMetadata} metadataElements={metadataElements} />
        </>
    );
}
