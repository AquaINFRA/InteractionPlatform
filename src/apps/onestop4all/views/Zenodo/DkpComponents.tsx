import { Box, Heading, SimpleGrid, Text } from "@open-pioneer/chakra-integration";
import { useEffect, useState } from "react";
import { ComponentIcon, D2K_COMPONENT, fetchRoCrate, getComponentLabel, Identifier, parseRoCrate, renderPopupTitle } from "../../services/DkpUtils";
import { IdentifierPopup } from "./IdentifierPopup";

// Renders the components listed in a DKP's RO-Crate. Shared by the Zenodo and
// B2Share result views.
export function DkpComponents({ roCrateUrl }: { roCrateUrl: string | null }) {
    const [roCrate, setRoCrate] = useState<any[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [identifier, setIdentifier] = useState<Identifier>();

    useEffect(() => {
        if (!roCrateUrl) {
            console.error("No RO-Crate metadata file found for this DKP");
            return;
        }
        fetchRoCrate(roCrateUrl)
            .then((roCrateData) => setRoCrate(parseRoCrate(roCrateData)))
            .catch((error) => console.error(error));
    }, [roCrateUrl]);

    return (
        <>
            {renderDkpComponent()}
            {showPopup && (
                <IdentifierPopup
                    identifier={identifier}
                    onClose={() => setShowPopup(false)}
                    renderPopupTitle={renderPopupTitle}
                />
            )}
        </>
    );

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
        
        const updatedComponents = components;

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
