import { Box, Flex, Image, SimpleGrid, Heading, Text } from "@open-pioneer/chakra-integration";
import { useEffect, useState } from "react";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ZenodoResources } from "../../components/ResourceType/ExternalResources/ZenodoResources";
import { RelatedContent } from "../../components/ResourceType/RelatedIdentifier/RelatedIdentifier";
import { ZenodoMetadataResponse } from "./Zenodo";

export interface ZenodoViewProps {
    item: ZenodoMetadataResponse;
}

export function DkpView({ item: metadata }: ZenodoViewProps) {
    const roCrateUrl = "https://zenodo.org/api/records/"+metadata.recid+"/files/ro-crate-metadata.json/content";
    const [roCrate, setRoCrate] = useState<any[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        async function fetchRoCrate() {
            try {
                const response = await fetch(roCrateUrl);
                if (!response.ok) throw new Error(`Failed to fetch RO-Crate: ${response.statusText}`);
                const roCrateData = await response.json();
                setRoCrate(parseRoCrate(roCrateData));
            } catch (error) {
                console.error(error);
            }
        }
        fetchRoCrate();
    }, []);

    const programmingLanguages = extractProgrammingLanguages(metadata);
    const useGalaxyIdentifier = metadata.metadata.related_identifiers?.find(id =>
        id.identifier.includes("usegalaxy") && id.identifier.includes("workflow")
    );

    function extractProgrammingLanguages(metadata: any): string[] {
        const languages = metadata.metadata.custom?.["code:programmingLanguage"];
        if (!languages) return [];
        return Array.isArray(languages) ? languages.map(lang => lang.title?.en || "Unknown") : [languages.title?.en || "Unknown"];
    }

    function renderGalaxyEmbed(identifier: any) {
        return (
            <Box pt="40px">
                <iframe
                    title="Galaxy Workflow Embed"
                    style={{ width: "100%", height: "700px", border: "none" }}
                    src={`${identifier}&embed=true&buttons=true&about=false&heading=false&minimap=true&zoom_controls=true&initialX=-20&initialY=-20&zoom=0.6`}
                />
            </Box>
        );
    }

    return (
        <Box>
            <Box hideBelow="custombreak">
                <Flex gap="10%">
                    <Box w="65%">
                        {metadata.title && <Box className="title" pt="15px">{metadata.title}</Box>}
                        <Box pt="30px">{renderMetadata()}</Box>
                        {metadata.metadata.description && (
                            <Box pt="80px">
                                <Abstract abstractText={metadata.metadata.description} />
                            </Box>
                        )}
                        <Box pt="30px">{renderDkpComponent()}</Box>
                        {useGalaxyIdentifier && renderGalaxyEmbed(useGalaxyIdentifier.identifier)}
                        {metadata.metadata.related_identifiers && (
                            <Box pt={10}>
                                <RelatedContent relatedContentItems={metadata.metadata.related_identifiers} />
                            </Box>
                        )}
                    </Box>
                    <Box w="25%">
                        {metadata.links?.doi && (
                            <Box pt="40px">
                                <ZenodoResources metadata={metadata.links.self} repo={metadata.links.doi} download={metadata.links.archive} />
                            </Box>
                        )}
                    </Box>
                </Flex>
            </Box>

            <Box hideFrom="custombreak">
                {metadata.title && <Box className="title" pt="15px">{metadata.title}</Box>}
                <Box pt="30px">{renderMetadata()}</Box>
                {metadata.metadata.description && (
                    <Box pt="40px">
                        <Abstract abstractText={metadata.metadata.description} />
                    </Box>
                )}
                {metadata.links?.doi && (
                    <Box pt="40px">
                        <ZenodoResources metadata={metadata.links.self} repo={metadata.links.doi} download={metadata.links.archive} />
                    </Box>
                )}
            </Box>
        </Box>
    );

    function renderMetadata() {
        return (
            <Metadata
                metadataElements={[
                    { element: "author", tag: metadata.metadata.creators?.length > 1 ? "Authors" : "Author", val: metadata.metadata.creators },
                    { element: "provider", tag: "Provider", val: metadata.provider },
                    { element: "keyword", tag: metadata.metadata.keywords?.length > 1 ? "Keywords" : "Keyword", val: metadata.metadata.keywords },
                    { element: "datePublished", tag: "Published", val: new Date(metadata.metadata.publication_date || "").toLocaleDateString() },
                    { element: "datePublished", tag: "Updated", val: new Date(metadata.updated).toLocaleDateString() },
                    { element: "programmingLanguages", tag: programmingLanguages.length > 1 ? "Programming Languages" : "Programming Language", val: programmingLanguages },
                    { element: "language", tag: metadata.metadata.language?.length > 1 ? "Languages" : "Language", val: metadata.metadata.language },
                    { element: "type", tag: "Type", val: metadata.metadata.resource_type?.title },
                    { element: "rights", tag: "Access rights", val: metadata.metadata.access_right },
                    { element: "license", tag: "License", val: metadata.metadata.license?.id },
                    { element: "doi", tag: "DOI", val: metadata.doi_url },
                    { element: "version", tag: "Version", val: metadata.metadata.version }
                ]}
                visibleElements={3}
                expandedByDefault={false}
            />
        );
    }

    function renderDkpComponent() {
        return (
            <>
                <Box className="metadataSectionHeader" pt={5} mb={5}>
                    <b>Virtual Research Environment</b>
                </Box>
                {renderComponents(roCrate.slice(3, 6), 0, "ComputationalWorkflow")}

                <Box className="metadataSectionHeader" pt={50} mb={5}>
                    <b>Reproducible Basis</b>
                </Box>
                {renderComponents(roCrate.slice(0, 3), 3, "SoftwareSourceCode")}
            </>
        );
    }

    function renderComponents(components: any[], startIndex: number, priority: string) {
        const sortedComponents = [...components].sort((a, b) =>
            a.type === priority ? -1 : b.type === priority ? 1 : 0
        );
    
        return (
            <SimpleGrid columns={[1, 2, 3]} gap={10}>
                {sortedComponents.length > 0 ? (
                    sortedComponents.map((component, index) => (
                        <Box
                            key={index + startIndex}
                            //w="95%"
                            bg={hoveredIndex === index + startIndex ? "gray.100" : "#05668D"}
                            p={4}
                            borderRadius="none"
                            className={`how-to-entry ${hoveredIndex === index + startIndex ? "hover2" : "default"}`}
                            onMouseEnter={() => setHoveredIndex(index + startIndex)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            cursor="pointer"
                            onClick={() => window.open(component.identifier, "_blank")}
                        >
                            <Box bg="white" borderRadius="full" p={2}>
                                <Image
                                    src={getComponentIcon(component.type)}
                                    alt={component.name || "Component"}
                                    borderRadius="full"
                                    w="40%"
                                    maxH="170px"
                                    m="0 auto"
                                />
                            </Box>
                            <Box color="white" fontSize={25}>
                                <b><u>{getComponentLabel(component.type)}</u></b>
                            </Box>
                            <Heading size="md" color="white">{component.name || "Unnamed Component"}</Heading>
                        </Box>
                    ))
                ) : (
                    <Text>No components found in the RO-Crate.</Text>
                )}
            </SimpleGrid>
        );
    }    

    function getComponentIcon(type: string) {
        const icons: Record<string, string> = {
            SoftwareSourceCode: "/toolbox.svg",
            SoftwareApplication: "/virtuallab.svg",
            WebAPI: "/cloud.svg",
            ComputationalWorkflow: "/workflow.svg",
            Dataset: "/data.svg"
        };
        return icons[type] || "";
    }

    function getComponentLabel(type: string) {
        return type === "SoftwareSourceCode" 
            ? "Toolbox"
            : type === "SoftwareApplication" 
                ? "Virtual Lab"
                : type === "WebAPI" 
                    ? "Web API" 
                    : type === "ComputationalWorkflow"
                        ? "Workflow"
                        : type;
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
