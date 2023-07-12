import { ResourceIcon } from "./ResourceIcons";

export interface ResourceEntryProps {
    resultCount: number;
    resourceType: ResourceType;
}

export enum ResourceType {
    Repos = "Repositories / Archives",
    Services = "Services",
    Tools = "Tools/Software",
    Standards = "Standards",
    Educational = "Educational resources",
    Documents = "Documents",
    Organisations = "Organisations"
}

export const ResourceEntry = ({ resultCount, resourceType }: ResourceEntryProps) => {
    return (
        <div className="resource-entry">
            <div className="overlap">
                <div className="circle-group">
                    <div className="circle circle-1" />
                    <div className="circle circle-2" />
                    <div className="circle circle-3" />
                </div>
                <div className="icon-base"></div>
                <div className="icon">
                    <ResourceIcon type={resourceType} size={48} />
                </div>
            </div>
            <div className="label">
                <div className="label-wrapper">
                    <div className="text-wrapper">{resourceType}</div>
                </div>
            </div>
            <div className="count">{resultCount}</div>
        </div>
    );
};
