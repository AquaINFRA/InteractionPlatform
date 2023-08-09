import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { mapFromResourceType } from "../../ResourceTypeUtils";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { SearchResultHandler } from "./search-result-handler";

export class StandardSearchHandler extends SearchResultHandler {
    public canHandle(item: SolrSearchResultItem): boolean {
        return item.type === mapFromResourceType(ResourceType.Standards);
    }

    public handle(item: SolrSearchResultItem): SearchResultItem {
        return {
            id: item.id,
            title: item.title,
            abstract: item.description,
            resourceType: ResourceType.Standards,
            url: ""
        };
    }
}
