import { ResourceType } from "../../ResourceTypeUtils";
import { SearchResultItem, ZenodoResultItem } from "../../SearchService";
import { MinSearchResultItem, SearchResultHandler } from "./search-result-handler";

export class WorkflowHandler extends SearchResultHandler {
    resourceType = ResourceType.Workflow;

    protected handleExplicit(
        item: ZenodoResultItem
    ): Partial<SearchResultItem> & MinSearchResultItem {
        return {
            title: item.title,
            abstract: item.metadata.description,
            url: item.doi_url
        };
    }
}
