import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { SearchResultHandler } from "./search-result-handler";

export class ArticleSearchHandler extends SearchResultHandler {
    public canHandle(item: SolrSearchResultItem): boolean {
        return item.type === "http://schema.org/Article";
    }

    public handle(item: SolrSearchResultItem): SearchResultItem {
        return {
            id: item.id,
            title: item.name,
            abstract: item.description,
            resourceType: ResourceType.Articles,
            url: ""
        };
    }
}
