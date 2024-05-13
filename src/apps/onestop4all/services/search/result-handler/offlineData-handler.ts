import { ResourceType } from "../../ResourceTypeUtils";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { MinSearchResultItem, SearchResultHandler } from "./search-result-handler";

export class OfflineDataHandler extends SearchResultHandler {
    resourceType = ResourceType.OfflineData;

    protected handleExplicit(
        item: SolrSearchResultItem
    ): Partial<SearchResultItem> & MinSearchResultItem {
        return {
            title: item.title,
            abstract: item.description,
            resourceType: this.resourceType,
            url: ""
        };
    }
}
