import { Box, Flex, SimpleGrid, Heading, Text } from "@open-pioneer/chakra-integration";
import { useEffect, useState } from "react";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ZenodoResources } from "./ZenodoResources";
import { RelatedContent } from "../../components/ResourceType/RelatedIdentifier/RelatedIdentifier";
import { ComponentIcon, D2K_COMPONENT, EGI_REPLAY_URL, extractProgrammingLanguages, getComponentLabel, Identifier, parseRoCrate, renderGalaxyEmbed, renderPopupTitle, ZENODO_RECORDS, ZenodoViewProps } from "../../services/DkpUtils";
import { IdentifierPopup } from "./IdentifierPopup";

export function DkpView({ item: metadata }: ZenodoViewProps) {
    const roCrateUrl = ZENODO_RECORDS + metadata.recid + "/files/ro-crate-metadata.json/content";
    const [roCrate, setRoCrate] = useState<any[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [identifier, setIdentifier] = useState<Identifier>();

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
                <Box pt="30px">{renderDkpComponent()}</Box>
                {metadata.links?.doi && (
                    <Box pt="40px">
                        <ZenodoResources metadata={metadata.links.self} repo={metadata.links.doi} download={metadata.links.archive} />
                    </Box>
                )}
            </Box>

            {showPopup && (
                <IdentifierPopup
                    identifier={identifier}
                    onClose={() => setShowPopup(false)}
                    renderPopupTitle={renderPopupTitle}
                />
            )}
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
        const reproducibleBasis = roCrate.filter(item => item["type"] === D2K_COMPONENT.Dataset || item["type"] === D2K_COMPONENT.Toolbox);
        const vre = roCrate.filter(item => item["type"] === D2K_COMPONENT.VirtualLab || item["type"] === D2K_COMPONENT.WebApi || item["type"] === D2K_COMPONENT.Workflow);

        return (
            <>
                <Box className="metadataSectionHeader" pt={5} mb={5}>
                    <b>Virtual Research Environment</b>
                </Box>
                {renderComponents(vre, 0, D2K_COMPONENT.Workflow)}

                <Box className="metadataSectionHeader" pt={50} mb={5}>
                    <b>Reproducible Basis</b>
                </Box>
                {renderComponents(reproducibleBasis, vre.length, D2K_COMPONENT.Toolbox)}
            </>
        );
    }

    function handleIdentifier(type: string, identifier: string[]) {
        if (!identifier) return null;
        if (identifier.length > 1) {
            setShowPopup(true);
            setIdentifier({res_type: type, identifier: identifier});
        } else {
            window.open(identifier[0], "_blank");
        }
    }

    function renderComponents(components: any[], startIndex: number, priority: string) {
        
        const updatedComponents = components.map(component => {
            if (component.type === D2K_COMPONENT.VirtualLab) {
                return {
                    ...component,
                    identifier: [...(component.identifier || []), EGI_REPLAY_URL]
                };
            }
            return component;
        });

        const sortedComponents = [...updatedComponents].sort((a, b) =>
            a.type === priority ? -1 : b.type === priority ? 1 : 0
        );

        console.log("After adding identifier:", sortedComponents);

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
                            onClick={() => handleIdentifier(component.type, component.identifier)}
                        >
                            <ComponentIcon 
                                type={component.type}
                                name={component.name}
                            />
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
}
