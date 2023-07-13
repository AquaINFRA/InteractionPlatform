import "@open-pioneer/runtime";
import { ResourceType } from "../views/Start/ResourceEntry/ResourceEntry";

export enum SearchParameterType {
    Searchterm = "searchterm",
    ResourceType = "resourcetype"
}

export interface SearchParams {
    [SearchParameterType.Searchterm]?: string;
    [SearchParameterType.ResourceType]?: string;
}

export interface SearchResultItem {
    title: string;
    resourceType: ResourceType;
    date?: Date;
    location?: string;
    abstract: string;
}

export interface MenuOpenerEvents {
    "open-menu": boolean;
}

export class SearchService {
    triggerSearch(): void {
        debugger;
    }
}

declare module "@open-pioneer/runtime" {
    interface ServiceRegistry {
        "onestop4all.SearchService": SearchService;
    }
}
