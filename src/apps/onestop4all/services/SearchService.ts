import "@open-pioneer/runtime";

import { ResourceType } from "../views/Start/ResourceEntry/ResourceEntry";

export interface SearchResultItem {
    id: number;
    title: string;
    resourceType: ResourceType;
    date?: Date;
    location?: string;
    abstract: string;
    url: string;
}

export interface SearchRequestParams {
    searchTerm: string;
}

export class SearchService {
    doSearch(searchParams: SearchRequestParams) {
        console.log("Search with following parameters: " + JSON.stringify(searchParams));
        return fetch("https://dummyjson.com/products").then((response) => response.json());
    }
}

declare module "@open-pioneer/runtime" {
    interface ServiceRegistry {
        "onestop4all.SearchService": SearchService;
    }
}
