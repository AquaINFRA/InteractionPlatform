import "@open-pioneer/runtime";

import { createSearchParams, NavigateFunction } from "react-router-dom";

import { ResourceType } from "../views/Start/ResourceEntry/ResourceEntry";

export enum SearchParameterType {
    Searchterm = "searchterm",
    ResourceType = "resourcetype",
    SpatialFilter = "spatialfilter"
}

export interface SearchParams {
    [SearchParameterType.Searchterm]?: string;
    [SearchParameterType.ResourceType]?: string[];
    [SearchParameterType.SpatialFilter]?: string;
}

export interface SearchResultItem {
    id: number;
    title: string;
    resourceType: ResourceType;
    date?: Date;
    location?: string;
    abstract: string;
    url: string;
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

    private spatialFilter: number[] = [];

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

    setSpatialFilter(coords: number[]) {
        this.spatialFilter = coords;
    }

    getSpatialFilter(): number[] {
        return this.spatialFilter;
    }

    clearSpatialFilter() {
        this.spatialFilter = [];
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
        const coordString = searchParams.get(SearchParameterType.SpatialFilter);
        if (coordString) {
            const coords = coordString.split(",").map((c) => Number.parseFloat(c));
            if (coords.length === 2 || coords.length === 4) {
                this.spatialFilter = coords;
            }
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
        if (this.spatialFilter.length > 0) {
            params[SearchParameterType.SpatialFilter] = this.spatialFilter.join(",");
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
