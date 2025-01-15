import { Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Flex, Heading, Image, SimpleGrid, Stack, Text } from "@open-pioneer/chakra-integration";

import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ZenodoResources } from "../../components/ResourceType/ExternalResources/ZenodoResources";
import { RelatedContent } from "../../components/ResourceType/RelatedIdentifier/RelatedIdentifier";
import { ZenodoMetadataResponse } from "./Zenodo";
import { useEffect, useState } from "react";

export interface ZenodoViewProps {
    item: ZenodoMetadataResponse;
}

export function DkpView(props: ZenodoViewProps) {
    const metadata = props.item;
    const roCrateUrl = "https://sandbox.zenodo.org/api/records/150542/files/ro-crate-metadata.json/content";
    const [roCrate, setRoCrate] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const programmingLanguages = metadata.metadata.custom?.["code:programmingLanguage"]
        ? Array.isArray(metadata.metadata.custom["code:programmingLanguage"])
            ? metadata.metadata.custom["code:programmingLanguage"].map(lang => lang.title?.en || "Unknown")
            : [metadata.metadata.custom["code:programmingLanguage"].title?.en || "Unknown"]
        : "";

    const useGalaxyIdentifier = metadata.metadata.related_identifiers?.find(
        (identifier) => identifier.identifier.includes("usegalaxy") && identifier.identifier.includes("workflow")
    );

    useEffect(() => {
        async function fetchAndParseRoCrate() {
            try {
                const response = await fetch(roCrateUrl);
                if (!response.ok) {
                    throw new Error(`Failed to fetch RO-Crate: ${response.statusText}`);
                }
                const roCrate = await response.json();
                const parsedData = parseRoCrate(roCrate); // Parse the RO-Crate using your function
                setRoCrate(parsedData);
                console.log(parsedData);
            } catch (err) {
                console.log(err);
            }
        }

        fetchAndParseRoCrate();
    }, [roCrateUrl]);
    
    return (
        <Box>
            {/* Desktop view */}
            <Box hideBelow="custombreak">
                <Flex gap="10%" >
                    <Box w="65%">
                        {metadata.title ? (
                            <Box className="title" pt="15px">
                                {metadata.title}
                            </Box>
                        ) : null}
                        <Box pt="30px">{getMetadata()}</Box>
                        {metadata.metadata.description ? (
                            <Box pt="80px">
                                <Abstract abstractText={metadata.metadata.description} />
                            </Box>
                        ) : null}
                        {useGalaxyIdentifier && (
                            <Box pt="40px">
                                <iframe
                                    title="Galaxy Workflow Embed"
                                    style={{ width: "100%", height: "700px", border: "none" }}
                                    src={useGalaxyIdentifier.identifier + "&embed=true&buttons=true&about=false&heading=false&minimap=true&zoom_controls=true&initialX=-20&initialY=-20&zoom=0.6"}
                                ></iframe>
                            </Box>
                        )}
                        {metadata.metadata.related_identifiers ? <Box pt={10}>
                            <RelatedContent relatedContentItems={metadata.metadata.related_identifiers} />
                        </Box> : null}
                    </Box>
                    <Box w="25%">
                        {metadata.links && metadata.links.doi ? (
                            <Box pt="40px">
                                <ZenodoResources metadata={metadata.links.self} repo={metadata.links.doi} download={metadata.links.archive}/>
                            </Box>
                        ) : null}
                    </Box>
                </Flex>
                <Box pt="30px" w={"100%"}>{getDkpComponent()}</Box>
            </Box>
            {/* Mobile view */}
            <Box hideFrom="custombreak">
                {metadata.title ? (
                    <Box className="title" pt="15px">
                        {metadata.title}
                    </Box>
                ) : null}
                <Box pt="30px">{getMetadata()}</Box>
                {metadata.metadata.description ? (
                    <Box pt="40px">
                        <Abstract abstractText={metadata.metadata.description} />
                    </Box>
                ) : null}
                {metadata.links && metadata.links.doi ? (
                    <Box pt="40px">
                        <ZenodoResources metadata={metadata.links.self} repo={metadata.links.doi} download={metadata.links.archive}/>
                    </Box>
                ) : null}
                <Box pt="30px" w={"100%"}>{getDkpComponent()}</Box>
            </Box>
        </Box>
    );

    function getMetadata() {
        return (
            <Metadata
                metadataElements={[
                    {
                        element: "author",
                        tag: metadata.metadata.creators?.length > 1 ? "Authors" : "Author",
                        val: metadata.metadata.creators
                    },
                    {
                        element: "provider",
                        tag: "Provider",
                        val: metadata.provider
                    },
                    {
                        element: "keyword",
                        tag: Array.isArray(metadata.metadata.keywords) && metadata.metadata.keywords?.length > 1 ? "Keywords" : "Keyword",
                        val: metadata.metadata.keywords
                    },
                    {
                        element: "datePublished",
                        tag: "Published",
                        val: metadata.metadata.publication_date ? new Date(metadata.metadata.publication_date).toLocaleDateString() : ""
                    },
                    {
                        element: "datePublished",
                        tag: "Updated",
                        val: new Date(metadata.updated).toLocaleDateString()
                    },
                    {
                        element: "programmingLanguages",
                        tag: programmingLanguages.length > 1 ? "Programming Languages" : "Programming Language",
                        val: programmingLanguages
                    },
                    {
                        element: "language",
                        tag: Array.isArray(metadata.metadata.language) && metadata.metadata.language?.length > 1 ? "Languages" : "Language",
                        val: metadata.metadata.language
                    },
                    {
                        element: "type",
                        tag: "Type",
                        val: metadata.metadata.resource_type?.title
                    },
                    {
                        element: "rights",
                        tag: "Access rights",
                        val: metadata.metadata.access_right
                    },
                    {
                        element: "license",
                        tag: "License",
                        val: metadata.metadata.license?.id
                    },
                    {
                        element: "doi",
                        tag: "DOI",
                        val: metadata.doi_url
                    },
                    {
                        element: "version",
                        tag: "Version",
                        val: metadata.metadata.version
                    }
                ]}
                visibleElements={3}
                expandedByDefault={false}
            />
        );
    }

    function getDkpComponent() {
        return (
            <>
                <Box className="metadataSectionHeader" pt={5} marginBottom={5}>
                    Data-to-Knowledge Package components
                </Box>
                <SimpleGrid columns={[1, 2, 3, 4, 5, 6]} gap={5}>
                    {roCrate && roCrate.length > 0 ? (
                        roCrate.map((component: any, index: number) => (
                            <Box 
                                key={index} 
                                w={"95%"} 
                                backgroundColor={hoveredIndex === index ? "gray.100" : "#05668D"} 
                                paddingX={2} 
                                borderRadius="none" 
                                className={`how-to-entry ${hoveredIndex === index ? "hover2" : "default"}`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                p={4}
                                cursor="pointer"
                                onClick={() => window.open(component.identifier, "_blank")}
                            >
                                <Box backgroundColor="white" borderRadius="full" padding={2}>
                                    <Image
                                        src={component.type === "SoftwareSourceCode" 
                                            ? "/toolbox.svg" 
                                            : component.type === "VirtualLocation" 
                                                ? "/virtuallab.svg"
                                                : component.type === "WebAPI" 
                                                    ? "/cloud.svg"
                                                    : component.type === "ComputationalWorkflow"
                                                        ? "/workflow.svg"
                                                        : component.type === "Dataset" 
                                                            ? "/data.svg"
                                                            : ""}
                                        alt="Reproducible interpolation short course"
                                        borderRadius="full"
                                        w={"40%"}
                                        margin="0 auto"
                                    />
                                </Box>
                                <Box color="white">
                                    <b>{component.type === "SoftwareSourceCode" 
                                        ? "Toolbox" 
                                        : component.type === "VirtualLocation" 
                                            ? "Virtual Location"
                                            : component.type === "WebAPI" 
                                                ? "Web API"
                                                : component.type === "ComputationalWorkflow"
                                                    ? "Workflow"
                                                    : component.type}</b>
                                </Box>
                                <Heading size="md" color="white">
                                    {component.name || "Unnamed Component"}
                                </Heading>
                            </Box>
                        ))
                    ) : (
                        <Text>No components found in the RO-Crate.</Text>
                    )}
                </SimpleGrid>
            </>
        );
    }
    

    function parseRoCrate(roCrate: any) {
        const graph = roCrate["@graph"];
        const findById = (id: string) => graph.find((item: any) => item["@id"] === id);
        const rootDataset = graph.find((item: any) => item["@id"] === "./");
    
        const dkp_components = rootDataset?.hasPart?.map((part: any) => {
            const resource = findById(part["@id"]);
            return {
                identifier: findById(resource?.identifier?.["@id"])?.name || null,
                name: resource?.name || null,
                type: resource?.["@type"]?.[0] || null,
                image: findById(resource?.image?.["@id"])?.name || null
            };
        });
    
        return dkp_components;
    }    
}
