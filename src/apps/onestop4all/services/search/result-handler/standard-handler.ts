import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { SearchResultHandler } from "./search-result-handler";

export class StandardSearchHandler extends SearchResultHandler {
    protected resourceType = ResourceType.Standards;

    public handle(item: SolrSearchResultItem): SearchResultItem {
        return {
            id: item.id,
            title: item.title,
            abstract: item.description,
            resourceType: this.resourceType,
            url: ""
        };
    }
}
