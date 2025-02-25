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