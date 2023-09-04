import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { mapFromResourceType } from "../../ResourceTypeUtils";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";

export type MinSearchResultItem = {
    title: string;
    abstract: string;
    url: string;
};

export abstract class SearchResultHandler {
    protected abstract resourceType: ResourceType;

    public canHandle(item: SolrSearchResultItem): boolean {
        return item.type === mapFromResourceType(this.resourceType);
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
