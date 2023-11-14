import { useService } from "open-pioneer:react-hooks";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { ResourceType } from "../../services/ResourceTypeUtils";
import { SearchResult, SubjectEntry } from "../../services/SearchService";

export enum UrlSearchParameterType {
    Searchterm = "searchterm",
    ResourceType = "resourcetype",
    Subjects = "subjects",
    SpatialFilter = "spatialfilter",
    PageSize = "pageSize",
    PageStart = "pageStart"
}

export interface UrlSearchParams {
    [UrlSearchParameterType.Searchterm]?: string;
    [UrlSearchParameterType.ResourceType]?: string[];
    [UrlSearchParameterType.Subjects]?: string[];
    [UrlSearchParameterType.SpatialFilter]?: string;
    [UrlSearchParameterType.PageSize]?: string;
    [UrlSearchParameterType.PageStart]?: string;
}

export interface SelectableResourceType {
    resourceType: ResourceType;
    count: number;
    selected: boolean;
}

export interface SelectableSubject {
    label: string;
    children: SelectableSubject[];
    count?: number;
    selected?: boolean;
}

export interface ISearchState {
    searchTerm: string;
    setSearchTerm(searchTerm: string): void;
    selectedResourceTypes: string[];
    setSelectedResourceTypes(types: string[]): void;
    selectableResourceTypes: SelectableResourceType[];
    selectedSubjects: string[];
    setSelectedSubjects(subjects: string[]): void;
    selectableSubjects: SelectableSubject[];
    spatialFilter: number[];
    setSpatialFilter(sf: number[]): void;
    pageSize: number;
    setPageSize(pageSize: number): void;
    pageStart: number;
    setPageStart(pageSize: number): void;
    searchResults: SearchResult | undefined;
    isLoaded: boolean;
    search(): void;
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

    // init search results and loading state
    const [searchResults, setSearchResults] = useState<SearchResult>();
    const [isLoaded, setIsLoaded] = useState(false);

    // init search term
    const [searchTerm, setSearchTerm] = useState<string>(
        searchParams.get(UrlSearchParameterType.Searchterm) || ""
    );

    // init page size
    const pSize = parseInt(searchParams.get(UrlSearchParameterType.PageSize) || "10");
    const [pageSize, setPageSize] = useState<number>(pSize);

    // init page start
    const pStart = parseInt(searchParams.get(UrlSearchParameterType.PageStart) || "0");
    const [pageStart, setPageStart] = useState<number>(pStart);

    // init selectable resourceTypes
    const [selectableResourceTypes, setSelecteableResourceTypes] = useState<
        SelectableResourceType[]
    >([]);

    // init selected resourceTypes
    const sRt: string[] = [];
    const urlRt = searchParams.getAll(UrlSearchParameterType.ResourceType);
    if (urlRt?.length) {
        urlRt.forEach((e) => e && sRt.push(e));
    }
    const [selectedResourceTypes, setSelectedResourceTypes] = useState<string[]>(sRt);

    // init selectable subjects
    const [selectableSubjects, setSelecteableSubjects] = useState<SelectableSubject[]>([]);

    // init selected subjects
    const subjects: string[] = [];
    const urlSubs = searchParams.getAll(UrlSearchParameterType.Subjects);
    if (urlSubs?.length) {
        urlSubs.forEach((e) => e && subjects.push(e));
    }
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>(subjects);

    // init spatial filter
    let sp: number[] = [];
    const coordString = searchParams.get(UrlSearchParameterType.SpatialFilter);
    if (coordString) {
        const coords = coordString.split(",").map((c) => Number.parseFloat(c));
        if (coords.length === 4) {
            sp = coords;
        }
    }
    const [spatialFilter, setSpatialFilter] = useState(sp);

    function search() {
        setIsLoaded(false);
        searchSrvc
            .doSearch({
                searchTerm,
                resourceTypes: selectedResourceTypes,
                subjects: selectedSubjects,
                spatialFilter,
                pageSize,
                pageStart
            })
            .then((result) => {
                setIsLoaded(true);
                setSearchResults(result);
                const resourceTypeFacet = result.facets.resourceType.map((e) => {
                    return {
                        resourceType: e.resourceType,
                        count: e.count,
                        selected: selectedResourceTypes.findIndex((r) => r === e.resourceType) >= 0
                    } as SelectableResourceType;
                });
                setSelecteableResourceTypes(resourceTypeFacet);
                handleSubjects(result.facets.subjects);
            })
            .catch((error) => {
                setIsLoaded(true);
                console.error(error);
            });

        function handleSubjects(subjects: SubjectEntry[]) {
            function removeZeroCounts(subjectConf: SelectableSubject[]): SelectableSubject[] {
                subjectConf.forEach((e) => (e.children = removeZeroCounts(e.children)));
                return subjectConf.filter((e) => e.count !== undefined);
            }

            function adjustEntry(entry: SubjectEntry, tree: SelectableSubject[]) {
                tree.find((e) => adjustEntry(entry, e.children));
                const match = tree.find((e) => e.label === entry.label);
                if (match) {
                    match.count = entry.count;
                    match.selected = selectedSubjects.findIndex((s) => s === entry.label) >= 0;
                }
            }

            fetch("./subject-config.json").then((result) => {
                result.json().then((subjectConf: SelectableSubject[]) => {
                    subjects.forEach((entry) => adjustEntry(entry, subjectConf));
                    removeZeroCounts(subjectConf);
                    setSelecteableSubjects(subjectConf);
                });
            });
        }
    }

    const state: ISearchState = {
        searchTerm,
        setSearchTerm: (value) => {
            setSearchTerm(value);
            setPageStart(0);
        },
        selectedResourceTypes,
        setSelectedResourceTypes: (values) => {
            setSelectedResourceTypes(values);
            setPageStart(0);
        },
        selectableResourceTypes,
        spatialFilter,
        setSpatialFilter: (value) => {
            setSpatialFilter(value);
            setPageStart(0);
        },
        pageSize,
        setPageSize: (value) => {
            setPageSize(value);
            setPageStart(0);
        },
        pageStart,
        setPageStart,
        searchResults,
        isLoaded,
        search,
        selectedSubjects,
        setSelectedSubjects,
        selectableSubjects
    };

    return (
        <>
            <SearchStateContext.Provider value={state}>
                {props.children}
            </SearchStateContext.Provider>
        </>
    );
};
