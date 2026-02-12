import { SolrSearchResultItem } from "./SearchService";

export interface RelatedIdentifier {
    identifier: string;
    relation: string;
    resource_type: string;
    scheme: string;
}

export interface ZenodoMetadataResponse {
    title: string;
    doi: string;
    updated: string;
    doi_url: string;
    provider: string;
    dkps: any;
    recid: string;
    files: [{
        links:{
            self: string;
        }
    }];
    links?: {
        self: string;
        doi: string;
        archive: string;
    };
    metadata: {
        title: string;
        description: string;
        creators: [{
            affiliation: string;
            orcid: string;
            name: string;
        }];
        keywords: string[];
        publication_date: string;
        language: string[];
        resource_type: {
            title: string;
            type: string;
        };
        access_right: string;
        license: {
            id: string;
        };
        version: string;
        custom?: {
            "code:codeRepository": string;
            "code:programmingLanguage": {
                id: string;
                title: {
                    en: string;
                }
            }
        },
        related_identifiers?: RelatedIdentifier[]
    };
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