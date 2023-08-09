import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { SearchResultHandler } from "./search-result-handler";

export class SoftwareSearchHandler extends SearchResultHandler {
    public canHandle(item: SolrSearchResultItem): boolean {
        console.log(item);
        return item.type === "http://schema.org/SoftwareSourceCode";
    }

    public handle(item: SolrSearchResultItem): SearchResultItem {
        return {
            id: item.id,
            title: item.name,
            abstract: item.description,
            resourceType: ResourceType.Tools,
            url: ""
        };
    }
}
