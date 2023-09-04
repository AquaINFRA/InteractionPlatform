import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { MinSearchResultItem, SearchResultHandler } from "./search-result-handler";

export class StandardSearchHandler extends SearchResultHandler {
    protected resourceType = ResourceType.Standards;

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
