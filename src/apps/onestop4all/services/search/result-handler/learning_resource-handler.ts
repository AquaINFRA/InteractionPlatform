import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { SearchResultHandler } from "./search-result-handler";

export class Learning_ResourceHandler extends SearchResultHandler {
    protected resourceType = ResourceType.Learning_Resource;

    public handle(item: SolrSearchResultItem): SearchResultItem {
        let date;
        if (item.datePublished) {
            date = new Date(item.datePublished);
        }
        return {
            ...item,
            title: item.name,
            abstract: item.description,
            resourceType: this.resourceType,
            url: "",
            date
        };
    }
}
