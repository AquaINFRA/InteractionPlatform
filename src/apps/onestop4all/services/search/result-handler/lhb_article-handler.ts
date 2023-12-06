import { ResourceType, mapFromResourceType } from "../../ResourceTypeUtils";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { MinSearchResultItem, SearchResultHandler } from "./search-result-handler";

export class LHB_ArticleSearchHandler extends SearchResultHandler {
    resourceType = ResourceType.LHB_Articles;

    public canHandle(item: SolrSearchResultItem): boolean {
        if (item.type.length) {
            return item.type.findIndex((e) => e === mapFromResourceType(this.resourceType)) > -1;
        }
        return false;
    }

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
