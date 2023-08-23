import { NavigateFunction } from "react-router-dom";

import { SearchResultItem } from "../../services/SearchService";
import { ResourceType } from "../Start/ResourceEntry/ResourceEntry";

export function navigateToResource(item: SearchResultItem, navigate: NavigateFunction) {
    switch (item.resourceType) {
        case ResourceType.Repos:
            navigate(`/repository/${item.id}`);
            break;
        case ResourceType.Datasets:
            navigate(`/dataset/${item.id}`);
            break;
        case ResourceType.Organisations:
            navigate(`/organisation/${item.id}`);
            break;
        case ResourceType.Documents:
            navigate(`/document/${item.id}`);
            break;
        case ResourceType.Services:
            navigate(`/service/${item.id}`);
            break;
        case ResourceType.Tools:
            navigate(`/tools_software/${item.id}`);
            break;
        case ResourceType.Standards:
            navigate(`/standard/${item.id}`);
            break;
        case ResourceType.Articles:
            navigate(`/article/${item.id}`);
            break;
        case ResourceType.Educational:
        default:
            throw new Error(`Unknown navigation for ${item.resourceType}`);
    }
}
