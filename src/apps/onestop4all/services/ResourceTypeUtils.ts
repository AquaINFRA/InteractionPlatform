export enum ResourceType {
    Repos = "Repository / Archive",
    Articles = "Article",
    // Educational = "Educational resource",
    // Datasets = "Dataset",
    Tools = "Tool/Software",
    Organisations = "Organisation",
    // Services = "Service",
    Standards = "Standard",
    LHB_Articles = "Living Handbook Article",
    Learning_Resource = "Learning resource"
}

const mapping = [
    {
        type: ResourceType.Articles,
        identifier: "http://schema.org/Article"
    },
    {
        type: ResourceType.Organisations,
        identifier: "http://xmlns.com/foaf/0.1/Organization"
    },
    {
        type: ResourceType.Repos,
        identifier: "http://nfdi4earth.de/ontology#Repository"
    },
    {
        type: ResourceType.Standards,
        identifier: "http://nfdi4earth.de/ontology#MetadataStandard"
    },
    {
        type: ResourceType.Tools,
        identifier: "http://schema.org/SoftwareSourceCode"
    },
    {
        type: ResourceType.LHB_Articles,
        identifier: "http://nfdi4earth.de/ontology#LHBArticle"
    },
    {
        type: ResourceType.Learning_Resource,
        identifier: "http://schema.org/LearningResource"
    }
];

export function mapToResourceType(identifier: string): ResourceType {
    const match = mapping.find((e) => e.identifier === identifier);
    if (match) {
        return match.type;
    }
    throw new Error(`Could not find a ResourceType to the given identifier: ${identifier}`);
}

export function mapFromResourceType(resourceType: ResourceType): string {
    const match = mapping.find((e) => e.type === resourceType);
    if (match) {
        return match.identifier;
    }
    throw new Error(`Could not find an identifier to the given  ResourceType: ${resourceType}`);
}
