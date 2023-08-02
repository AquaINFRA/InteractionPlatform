import { ResourceType } from "../views/Start/ResourceEntry/ResourceEntry";

// TODO: made this better

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
