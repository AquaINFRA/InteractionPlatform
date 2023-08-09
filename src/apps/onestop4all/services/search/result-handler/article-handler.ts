import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { SearchResultHandler } from "./search-result-handler";

export class ArticleSearchHandler extends SearchResultHandler {
    protected resourceType = ResourceType.Articles;

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
