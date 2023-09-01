import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { SearchResultHandler } from "./search-result-handler";

export class OrganizationSearchHandler extends SearchResultHandler {
    protected resourceType = ResourceType.Organisations;

    public handle(item: SolrSearchResultItem): SearchResultItem {
        return {
            ...item,
            title: item.name,
            abstract: "",
            resourceType: this.resourceType,
            url: ""
        };
    }
}
