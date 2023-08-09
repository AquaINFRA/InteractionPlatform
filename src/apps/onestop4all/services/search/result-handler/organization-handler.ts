import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { mapFromResourceType } from "../../ResourceTypeUtils";
import { SearchResultItem, SolrSearchResultItem } from "../../SearchService";
import { SearchResultHandler } from "./search-result-handler";

export class OrganizationSearchHandler extends SearchResultHandler {
    public canHandle(item: SolrSearchResultItem): boolean {
        return item.type === mapFromResourceType(ResourceType.Organisations);
    }

    public handle(item: SolrSearchResultItem): SearchResultItem {
        return {
            id: item.id,
            title: item.name,
            abstract: "",
            resourceType: ResourceType.Organisations,
            url: ""
        };
    }
}
