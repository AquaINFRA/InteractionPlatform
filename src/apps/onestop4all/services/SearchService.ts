import "@open-pioneer/runtime";

import { createSearchParams, NavigateFunction } from "react-router-dom";

import { ResourceType } from "../views/Start/ResourceEntry/ResourceEntry";

export enum SearchParameterType {
    Searchterm = "searchterm",
    ResourceType = "resourcetype"
}

export interface SearchParams {
    [SearchParameterType.Searchterm]?: string;
    [SearchParameterType.ResourceType]?: string[];
}

export interface SearchResultItem {
    id: number;
    title: string;
    resourceType: ResourceType;
    date?: Date;
    location?: string;
    abstract: string;
}

export interface MenuOpenerEvents {
    "open-menu": boolean;
}

export interface SelecteableResourceType {
    resourceType: ResourceType;
    count: number;
    selected: boolean;
}

export class SearchService {
    private searchTerm: string | null = null;

    private selectedResourceTypes: Set<string> = new Set();

    addResourceType(resourceType: string) {
        this.selectedResourceTypes.add(resourceType);
    }

    removeResourceType(resourceType: string) {
        this.selectedResourceTypes.delete(resourceType);
    }

    clearResourceTypes() {
        this.selectedResourceTypes.clear();
    }

    getSelectedResourceTypes() {
        return Array.from(this.selectedResourceTypes);
    }

    getSelecteableResourceTypes(): SelecteableResourceType[] {
        return [
            {
                resourceType: ResourceType.Repos,
                count: 245,
                selected: this.selectedResourceTypes.has(ResourceType.Repos)
            },
            {
                resourceType: ResourceType.Articles,
                count: 3234,
                selected: this.selectedResourceTypes.has(ResourceType.Articles)
            },
            {
                resourceType: ResourceType.Educational,
                count: 15,
                selected: this.selectedResourceTypes.has(ResourceType.Educational)
            },
            {
                resourceType: ResourceType.Tools,
                count: 9,
                selected: this.selectedResourceTypes.has(ResourceType.Tools)
            },
            {
                resourceType: ResourceType.Organisations,
                count: 12,
                selected: this.selectedResourceTypes.has(ResourceType.Organisations)
            },
            {
                resourceType: ResourceType.Services,
                count: 2,
                selected: this.selectedResourceTypes.has(ResourceType.Services)
            },
            {
                resourceType: ResourceType.Standards,
                count: 1,
                selected: this.selectedResourceTypes.has(ResourceType.Standards)
            }
        ];
    }

    setSearchTerm(term: string) {
        this.searchTerm = term;
    }

    getSearchTerm(): string {
        return this.searchTerm || "";
    }

    /**
     * Validates the given saerch params and constructs the internal search parameter
     */
    setSearchParams(searchParams: URLSearchParams) {
        this.searchTerm = searchParams.get(SearchParameterType.Searchterm);
        const resourceTypes = searchParams.getAll(SearchParameterType.ResourceType);
        if (resourceTypes?.length) {
            resourceTypes.forEach((e) => {
                if (e) {
                    this.selectedResourceTypes.add(e);
                }
            });
        }
    }

    /**
     * Navigates to the current search state
     */
    navigateToCurrentSearch(navigate: NavigateFunction) {
        const params: SearchParams = {};
        if (this.searchTerm) {
            params[SearchParameterType.Searchterm] = this.searchTerm;
        }
        if (this.selectedResourceTypes.size > 0) {
            params[SearchParameterType.ResourceType] = Array.from(this.selectedResourceTypes);
        }
        navigate({
            pathname: "/search",
            search: `?${createSearchParams({ ...params })}`
        });
    }

    triggerSearch(): void {
        // debugger;
        console.log("Start search");
    }
}

declare module "@open-pioneer/runtime" {
    interface ServiceRegistry {
        "onestop4all.SearchService": SearchService;
    }
}
