import { ResourceType } from "../../ResourceTypeUtils";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { MinSearchResultItem, SearchResultHandler } from "./search-result-handler";

export class LHB_ArticleSearchHandler extends SearchResultHandler {
    resourceType = ResourceType.LHB_Articles;

    protected handleExplicit(
        item: SolrSearchResultItem
    ): Partial<SearchResultItem> & MinSearchResultItem {
        return {
            title: item.name,
            abstract: item.description,
            url: ""
        };
    }
}
