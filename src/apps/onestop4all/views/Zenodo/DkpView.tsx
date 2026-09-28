import { Box, Flex } from "@open-pioneer/chakra-integration";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ZenodoResources } from "./ZenodoResources";
import { RelatedContent } from "../../components/ResourceType/RelatedIdentifier/RelatedIdentifier";
import { extractProgrammingLanguages, findRoCrateUrl, renderGalaxyEmbed, ZenodoViewProps } from "../../services/DkpUtils";
import { DkpComponents } from "./DkpComponents";

export function DkpView({ item: metadata }: ZenodoViewProps) {
    const roCrateUrl = findRoCrateUrl(metadata.files);
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
                        <Box pt="30px"><DkpComponents roCrateUrl={roCrateUrl} /></Box>
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
                <Box pt="30px"><DkpComponents roCrateUrl={roCrateUrl} /></Box>
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
}
