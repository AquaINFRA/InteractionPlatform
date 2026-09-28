import { Box, Image } from "@chakra-ui/react";
import { RelatedIdentifier } from "./interfaces";

export enum D2K_COMPONENT {
    Dataset = "Dataset",
    Toolbox = "SoftwareSourceCode",
    Workflow = "ComputationalWorkflow",
    VirtualLab = "SoftwareApplication",
    WebApi = "WebAPI"
}

export interface ZenodoViewProps {
    item: ZenodoMetadataResponse;
}

export interface ZenodoMetadataResponse {
    title: string;
    doi: string;
    updated: string;
    doi_url: string;
    provider: string;
    dkps: any;
    recid: string;
    files: {
        key: string;
        links: {
            self: string;
        }
    }[];
    links?: {
        self: string;
        doi: string;
        archive: string;
    };
    metadata: {
        title: string;
        description: string;
        creators: {
            affiliation: string;
            orcid: string;
            name: string;
        }[];
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

export interface Identifier {
    res_type: string;
    identifier: string[];
}

export function getComponentLabel(type: string) {
    return type === D2K_COMPONENT.Toolbox 
        ? "Toolbox"
        : type === D2K_COMPONENT.VirtualLab 
            ? "Virtual Lab"
            : type === D2K_COMPONENT.WebApi 
                ? "Web API" 
                : type === D2K_COMPONENT.Workflow
                    ? "Workflow"
                    : type;
}

export function getComponentIcon(type: string) {
    const icons: Record<string, string> = {
        SoftwareSourceCode: "/toolbox.svg",
        SoftwareApplication: "/virtuallab.svg",
        WebAPI: "/cloud.svg",
        ComputationalWorkflow: "/workflow.svg",
        Dataset: "/data.svg"
    };
    return icons[type] || "";
}

export function ComponentIcon(props:{ type: string, name: string}) {
    const {type, name} = props;
    return (
        <Box bg="white" borderRadius="full" p={2}>
            <Image
                src={getComponentIcon(type)}
                alt={name || "Component"}
                borderRadius="full"
                w="40%"
                maxH="170px"
                m="0 auto"
            />
        </Box>
    );
}



export function parseRoCrate(roCrate: any) {
    const graph = roCrate["@graph"];
    const findById = (id: string) => graph.find((item: any) => item["@id"] === id);
    const rootDataset = graph.find((item: any) => item["@id"] === "./");

    const dkp_components = rootDataset?.hasPart?.map((part: any) => {
        const resource = findById(part["@id"]);
        let identifier: string[] = [];
        
        if (resource?.identifier) {
            if (typeof resource.identifier === "string") {
                identifier = [resource.identifier];
            } else if (Array.isArray(resource.identifier)) {
                identifier = resource.identifier.map((id: any) =>
                    typeof id === "string" ? id : findById(id["@id"])?.name || null
                ).filter(Boolean);
            } else if (resource.identifier["@id"]) {
                const resolvedIdentifier = findById(resource.identifier["@id"])?.name || null;
                if (resolvedIdentifier) identifier.push(resolvedIdentifier);
            }
        }

        identifier.sort();

        return {
            identifier,
            name: resource?.name || null,
            type: resource?.["@type"]?.[0] || null,
            image: findById(resource?.image?.["@id"])?.name || null
        };
    });

    return dkp_components;
}

export function findAssociatedDkp(dkps: any[], resource_id: string): any[] {
    //const dkp_elements = dkps[0]["@graph"];
    const associatedDkps: any[] = [];

    function searchObject(obj: any): boolean {
        for (const key in obj) {
            if (typeof obj[key] === "string" && obj[key].includes(resource_id)) {
                return true;
            } else if (typeof obj[key] === "object" && obj[key] !== null) {
                if (Array.isArray(obj[key])) {
                    if (obj[key].some((item:any) => 
                        (typeof item === "string" && item.includes(resource_id)) || 
                        (typeof item === "object" && item !== null && searchObject(item))
                    )) {
                        return true;
                    }
                } else if (searchObject(obj[key])) {
                    return true;
                }
            }
        }
        return false;
    }

    dkps?.forEach((dkp: any, key: number) => {
        if (searchObject(dkps[key]["@graph"])) {
            associatedDkps.push(dkp);
        }
    });

    return associatedDkps;
}

export const EGI_REPLAY_URL = "https://replay.notebooks.egi.eu/hub/hub/login";

// Zenodo uploads aren't guaranteed to name the RO-Crate file exactly
// "ro-crate-metadata.json" (e.g. some are uploaded as "ro-crate-metadata-v4-FINAL.json"),
// so match by pattern instead of assuming a fixed filename.
export function findRoCrateUrl(files?: { key: string; links: { self: string } }[]): string | null {
    const roCrateFile = files?.find((file) => /^ro-crate-metadata.*\.json$/i.test(file.key));
    return roCrateFile?.links.self ?? null;
}

export type DkpProvider = "zenodo" | "b2share";

// A DKP record from either repository, reduced to what the start page and the
// RO-Crate lookup need.
export interface DkpRecord {
    provider: DkpProvider;
    id: string;
    title: string;
    roCrateUrl: string | null;
}

// B2Share's API sends no CORS headers, so B2Share DKPs can't be discovered or
// have their RO-Crates fetched from the browser. Until that's solved, they are
// registered here with a local copy of their RO-Crate (served from src/public).
export const B2SHARE_TEST_DKPS: DkpRecord[] = [
    {
        provider: "b2share",
        id: "sec4z-qvw47",
        title: "A Data-to-Knowledge Package for Reproducible SWAT Watershed simulations of Land Use Land Cover scenarios + Source-to-Sea interactions",
        roCrateUrl: "/ro-crate-metadata.json"
    }
];

export function findB2ShareTestDkp(id: string): DkpRecord | undefined {
    return B2SHARE_TEST_DKPS.find((record) => record.id === id);
}

function fromZenodoRecord(record: ZenodoMetadataResponse & { id: number }): DkpRecord {
    return {
        provider: "zenodo",
        id: String(record.id),
        title: record.metadata.title,
        roCrateUrl: findRoCrateUrl(record.files)
    };
}

// Merges the DKPs found on Zenodo with the locally registered B2Share ones. If
// Zenodo fails, the error is logged and the B2Share DKPs still show up.
export async function getDkpRecords(searchSrvc: any): Promise<DkpRecord[]> {
    const records: DkpRecord[] = [];
    try {
        const zenodo = await searchSrvc.getDataToKnowledgePackages();
        records.push(...(zenodo?.hits?.hits ?? []).map(fromZenodoRecord));
    } catch (error) {
        console.error("Error fetching DKPs from Zenodo:", error);
    }
    records.push(...B2SHARE_TEST_DKPS);
    return records;
}

export async function fetchRoCrate(url: string): Promise<any> {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch RO-Crate: ${response.statusText}`);
    return response.json();
}

export async function fetchAndStoreDkps(searchSrvc: any, searchState: any) {
    try {
        const records = await getDkpRecords(searchSrvc);
        const fetchedDkps = await Promise.all(
            records.map(async (record) => {
                if (!record.roCrateUrl) {
                    console.error(`No RO-Crate metadata file found for ${record.provider} record ${record.id}`);
                    return null;
                }
                try {
                    return await fetchRoCrate(record.roCrateUrl);
                } catch (error) {
                    console.error(error);
                    return null;
                }
            })
        );
        // findAssociatedDkp reads "@graph" from every entry, so drop failed fetches
        return fetchedDkps.filter(Boolean);
    } catch (error) {
        console.error("Error fetching DKPs:", error);
    }
}


export const renderPopupTitle = (type?: string) => {
    if (!type) return null;

    const typeLabelMap: Record<string, string> = {
        ComputationalWorkflow: "Workflow",
        WebAPI: "Web API",
        SoftwareSourceCode: "Toolbox",
        SoftwareApplication: "Virtual lab",
        Dataset: "Dataset",
    };

    const label = typeLabelMap[type] ?? type;

    return (
        <Box padding={3} textAlign="center">
            <b>
                Where do you want to check the {label}
            </b>
        </Box>
    );
};

export function extractProgrammingLanguages(metadata: any): string[] {
    const languages = metadata.metadata.custom?.["code:programmingLanguage"];
    if (!languages) return [];
    return Array.isArray(languages) ? languages.map(lang => lang.title?.en || "Unknown") : [languages.title?.en || "Unknown"];
}

export function renderGalaxyEmbed(identifier: any) {
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