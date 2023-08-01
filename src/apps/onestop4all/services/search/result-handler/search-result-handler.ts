import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";

export abstract class SearchResultHandler {
    public abstract canHandle(item: SolrSearchResultItem): boolean;

    public abstract handle(item: SolrSearchResultItem): SearchResultItem;
}
