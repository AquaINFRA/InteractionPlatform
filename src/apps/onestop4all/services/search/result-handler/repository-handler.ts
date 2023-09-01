import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { SearchResultHandler } from "./search-result-handler";

export class RepositorySearchHandler extends SearchResultHandler {
    protected resourceType = ResourceType.Repos;

    public handle(item: SolrSearchResultItem): SearchResultItem {
        return {
            ...item,
            title: item.title,
            abstract: item.description,
            resourceType: this.resourceType,
            url: ""
        };
    }
}
