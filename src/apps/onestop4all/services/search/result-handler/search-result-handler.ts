import { mapFromResourceType, ResourceType } from "../../ResourceTypeUtils";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";

export type MinSearchResultItem = {
    title: string;
    abstract: string;
    url: string;
};

export abstract class SearchResultHandler {
    public abstract readonly resourceType: ResourceType;

    public canHandle(item: SolrSearchResultItem): boolean {
        if (item.type.length) {
            return item.type.findIndex((e) => e === mapFromResourceType(this.resourceType)) > -1;
        }
        return false;
    }

    protected abstract handleExplicit(
        item: SolrSearchResultItem
    ): Partial<SearchResultItem> & MinSearchResultItem;

    public handle(item: SolrSearchResultItem): SearchResultItem {
        return {
            publishDate: item.datePublished ? new Date(item.datePublished) : undefined,
            updateDate: item.dateModified ? new Date(item.dateModified) : undefined,
            resourceType: this.resourceType,
            ...item,
            ...this.handleExplicit(item)
        };
    }
}
