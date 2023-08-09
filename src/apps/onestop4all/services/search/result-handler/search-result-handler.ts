import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { mapFromResourceType } from "../../ResourceTypeUtils";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";

export abstract class SearchResultHandler {
    protected abstract resourceType: ResourceType;

    public canHandle(item: SolrSearchResultItem): boolean {
        return item.type === mapFromResourceType(this.resourceType);
    }

    public abstract handle(item: SolrSearchResultItem): SearchResultItem;
}
