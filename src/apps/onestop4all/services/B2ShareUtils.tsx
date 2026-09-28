import { findB2ShareTestDkp } from "./DkpUtils";

// B2Share's own API doesn't send CORS headers, so it can't be fetched directly
// from the browser (unlike Zenodo). Records are instead sourced through DDAS
// (getDdasMetadata), which already harvests B2Share into this normalized shape.
export interface B2ShareLink {
    type?: string;
    rel: string;
    title?: string;
    href: string;
}

export interface B2ShareContact {
    name: string;
    organization?: string;
}

export interface B2ShareMetadataResponse {
    id: string;
    provider: string;
    dkps?: any;
    properties: {
        type: string;
        title: string;
        description?: string;
        created?: string;
        updated?: string;
        externalIds?: { scheme: string; value: string }[];
        keywords?: string[];
        contacts?: B2ShareContact[];
        license?: string;
        language?: string;
    };
    links: B2ShareLink[];
}

export interface B2ShareViewProps {
    item: B2ShareMetadataResponse;
    isDkp?: boolean;
}

export function getB2ShareAuthors(record: B2ShareMetadataResponse) {
    return (record.properties.contacts ?? []).map((contact) => ({
        name: contact.name,
        affiliation: contact.organization
    }));
}

export function getB2ShareKeywords(record: B2ShareMetadataResponse): string[] {
    return (record.properties.keywords ?? [])
        .flatMap((keyword) => keyword.split(","))
        .map((keyword) => keyword.trim())
        .filter(Boolean);
}

export function getB2ShareDoi(record: B2ShareMetadataResponse): string | undefined {
    return record.properties.externalIds?.find((id) => id.scheme === "doi")?.value;
}

export function getB2ShareOriginalPageUrl(record: B2ShareMetadataResponse): string | undefined {
    return record.links.find((link) => link.title === "Original metadata")?.href;
}

export function getB2ShareOriginalMetadataUrl(record: B2ShareMetadataResponse): string | undefined {
    return record.links.find((link) => link.title === "Original metadata (JSON)")?.href;
}

export function getB2ShareDownloads(record: B2ShareMetadataResponse): B2ShareLink[] {
    return record.links.filter((link) => link.rel === "describes");
}

// B2Share RO-Crates can't be fetched from the browser (no CORS headers), so
// only the locally registered test DKPs are treated as DKPs for now.
export function getB2ShareRoCrateUrl(record: B2ShareMetadataResponse): string | null {
    return findB2ShareTestDkp(record.id)?.roCrateUrl ?? null;
}

export function isB2ShareDkp(record: B2ShareMetadataResponse): boolean {
    return getB2ShareRoCrateUrl(record) !== null;
}
