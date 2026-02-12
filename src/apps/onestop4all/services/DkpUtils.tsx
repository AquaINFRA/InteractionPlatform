import { Box } from "@chakra-ui/react";

export function getComponentLabel(type: string) {
    return type === "SoftwareSourceCode" 
        ? "Toolbox"
        : type === "SoftwareApplication" 
            ? "Virtual Lab"
            : type === "WebAPI" 
                ? "Web API" 
                : type === "ComputationalWorkflow"
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