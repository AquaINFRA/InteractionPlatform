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

export const ZENODO_RECORDS = "https://zenodo.org/api/records/";
export const EGI_REPLAY_URL = "https://replay.notebooks.egi.eu/hub/hub/login";

export async function fetchAndStoreDkps(searchSrvc: any, searchState: any) {
    try {
        const result = await searchSrvc.getDataToKnowledgePackages();
        if (!result) return;

        const dkps = result.hits.hits;
        const fetchedDkps = await Promise.all(
            dkps.map(async (element: any) => {
                const roCrateUrl = `${ZENODO_RECORDS}${element.recid}/files/ro-crate-metadata.json/content`;
                try {
                    const response = await fetch(roCrateUrl);
                    if (!response.ok) throw new Error(`Failed to fetch RO-Crate: ${response.statusText}`);
                    return await response.json();
                } catch (error) {
                    console.error(error);
                    return null;
                }
            })
        );
        return fetchedDkps;
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