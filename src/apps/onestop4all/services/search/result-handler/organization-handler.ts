import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { MinSearchResultItem, SearchResultHandler } from "./search-result-handler";

export class OrganizationSearchHandler extends SearchResultHandler {
    protected resourceType = ResourceType.Organisations;

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
