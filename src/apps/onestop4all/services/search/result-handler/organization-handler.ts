import { ResourceType } from "../../ResourceTypeUtils";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { MinSearchResultItem, SearchResultHandler } from "./search-result-handler";

export class OrganizationSearchHandler extends SearchResultHandler {
    resourceType = ResourceType.Organisations;

    protected handleExplicit(
        item: SolrSearchResultItem
    ): Partial<SearchResultItem> & MinSearchResultItem {
        return {
            title: item.name,
            abstract: "",
            url: ""
        };
    }
}
