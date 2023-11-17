import { Box } from "@open-pioneer/chakra-integration";
import { useNavigate } from "react-router-dom";

import { ResourceType } from "../../../services/ResourceTypeUtils";
import { useSearchState } from "../../Search/SearchState";
import { ResourceIcon } from "./ResourceIcons";

export interface ResourceEntryProps {
    resultCount: number;
    resourceType: ResourceType;
}

export const ResourceEntry = ({ resultCount, resourceType }: ResourceEntryProps) => {
    const navigate = useNavigate();
    const searchState = useSearchState();

    function navigateTo(): void {
        searchState.setSelectedResourceTypes([resourceType]);
        navigate({ pathname: "/search" });
        window.scrollTo(0, 0);
    }

    return (
        <Box className="resource-entry" _hover={{ cursor: "pointer" }} onClick={navigateTo}>
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
        </Box>
    );
};
