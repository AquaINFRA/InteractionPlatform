import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { SearchResultHandler } from "./search-result-handler";

export class LHB_ArticleSearchHandler extends SearchResultHandler {
    protected resourceType = ResourceType.LHB_Articles;

    public handle(item: SolrSearchResultItem): SearchResultItem {
        return {
            id: item.id,
            title: item.name,
            abstract: item.description,
            resourceType: this.resourceType,
            url: ""
        };
    }
}
