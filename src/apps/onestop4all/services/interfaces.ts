import { SolrSearchResultItem } from "./SearchService";

export interface RelatedIdentifier {
    identifier: string;
    relation: string;
    resource_type: string;
    scheme: string;
}

export interface LinkObject {
    href: string;
    title: string;
    description: string;
    protocol: string;
    type: string;
    rel: string;
}

export interface ResourceGeometry {
    type: string;
    coordinates: number[][];
}

export interface Properties {
    title: string;
    type: string;
    aicollection: string;
    description: string;
    created: string;
    keywords: string;
    language: string;
    rights: string;
    formats: string;
    license: string;
    updated: string;
    providers: string[];
}

export interface DatasetMetadataResponse extends SolrSearchResultItem {
    properties: Properties;
    geometry: ResourceGeometry;
    id: string;
    time: string;
    type: string;
    links: LinkObject[];
    dkps?: any[];
}