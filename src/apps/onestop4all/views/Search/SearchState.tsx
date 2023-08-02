import { useService } from "open-pioneer:react-hooks";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

import { SearchResult } from "../../services/SearchService";
import { ResourceType } from "../Start/ResourceEntry/ResourceEntry";

export enum UrlSearchParameterType {
    Searchterm = "searchterm",
    ResourceType = "resourcetype",
    SpatialFilter = "spatialfilter"
}

export interface UrlSearchParams {
    [UrlSearchParameterType.Searchterm]?: string;
    [UrlSearchParameterType.ResourceType]?: string[];
    [UrlSearchParameterType.SpatialFilter]?: string;
}

export interface SelectableResourceType {
    resourceType: ResourceType;
    count: number;
    selected: boolean;
}

export interface ISearchState {
    searchTerm: string;
    setSearchterm(searchTerm: string): void;
    selectedResoureTypes: string[];
    setSelectedResourceTypes(types: string[]): void;
    selectableResourceTypes: SelectableResourceType[];
    spatialFilter: number[];
    setSpatialFilter(sf: number[]): void;
    searchResults: SearchResult | undefined;
    isLoaded: boolean;
}

export const SearchStateContext = createContext<ISearchState | undefined>(undefined);

export interface SearchFilter {
    searchTerm?: string;
}

export const useSearchState = () => {
    const context = useContext(SearchStateContext);
    if (context === undefined) {
        throw new Error(
            "SearchStateContext was not provided. Make sure your component is a child of SearchState."
        );
    }
    return context;
};

export const SearchState = (props: PropsWithChildren) => {
    const searchSrvc = useService("onestop4all.SearchService");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // init search results and loading state
    const [searchResults, setSearchResults] = useState<SearchResult>();
    const [isLoaded, setIsLoaded] = useState(false);

    // init search term
    const [searchTerm, setSearchTerm] = useState<string>(
        searchParams.get(UrlSearchParameterType.Searchterm) || ""
    );

    // init selectable resourceTypes
    const [selecteableResourceTypes, setSelecteableResourceTypes] = useState<
        SelectableResourceType[]
    >([]);

    // init selected resourceTypes
    const sRt: string[] = [];
    const urlRt = searchParams.getAll(UrlSearchParameterType.ResourceType);
    if (urlRt?.length) {
        urlRt.forEach((e) => {
            if (e) {
                sRt.push(e);
            }
        });
    }
    const [selectedResoureTypes, setSelectedResourceTypes] = useState<string[]>(sRt);

    // init spatial filter
    let sp: number[] = [];
    const coordString = searchParams.get(UrlSearchParameterType.SpatialFilter);
    if (coordString) {
        const coords = coordString.split(",").map((c) => Number.parseFloat(c));
        if (coords.length === 2 || coords.length === 4) {
            sp = coords;
        }
    }
    const [spatialFilter, setSpatialFilter] = useState(sp);

    useEffect(() => {
        // sample fetch
        setIsLoaded(false);
        searchSrvc
            .doSearch({
                searchTerm,
                resourceType: selectedResoureTypes,
                spatialFilter
            })
            .then((result) => {
                setIsLoaded(true);
                setSearchResults(result);
                const resourceTypeFacet = result.facets.resourceType.map((e) => {
                    return {
                        resourceType: e.resourceType,
                        count: e.count,
                        selected: selectedResoureTypes.findIndex((r) => r === e.resourceType) >= 0
                    } as SelectableResourceType;
                });
                setSelecteableResourceTypes(resourceTypeFacet);
            })
            .catch((error) => {
                setIsLoaded(true);
                console.error(error);
            });
    }, [searchParams]);

    useEffect(() => {
        const params: UrlSearchParams = {};

        if (searchTerm) {
            params[UrlSearchParameterType.Searchterm] = searchTerm;
        }

        if (selectedResoureTypes.length > 0) {
            params[UrlSearchParameterType.ResourceType] = selectedResoureTypes;
        }

        if (spatialFilter.length > 0) {
            params[UrlSearchParameterType.SpatialFilter] = spatialFilter.join(",");
        }

        navigate({
            pathname: "/search",
            search: `?${createSearchParams({ ...params })}`
        });
    }, [searchTerm, selectedResoureTypes, spatialFilter]);

    const state: ISearchState = {
        searchTerm,
        setSearchterm: function (searchTerm: string) {
            setSearchTerm(searchTerm);
        },
        selectedResoureTypes,
        setSelectedResourceTypes: function (types: string[]): void {
            setSelectedResourceTypes(types);
        },
        selectableResourceTypes: selecteableResourceTypes,
        spatialFilter,
        setSpatialFilter: function (sf: number[]): void {
            setSpatialFilter(sf);
        },
        searchResults,
        isLoaded
    };

    return (
        <>
            <SearchStateContext.Provider value={state}>
                {props.children}
            </SearchStateContext.Provider>
        </>
    );
};
