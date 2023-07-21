import { useService } from "open-pioneer:react-hooks";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

import { SearchResultItem } from "../../services/SearchService";
import { ResourceType } from "../Start/ResourceEntry/ResourceEntry";

enum UrlSearchParameterType {
    Searchterm = "searchterm",
    ResourceType = "resourcetype",
    SpatialFilter = "spatialfilter"
}

interface UrlSearchParams {
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

export interface SearchResult {
    count: number;
    results: SearchResultItem[];
}

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
        console.log("searchParams adjusted");
        // TODO: try to trigger search on search Params adjusted
    }, [searchParams]);

    useEffect(() => {
        console.log(
            `FILTER CHANGED, trigger search with: searchterm '${searchTerm}', resourceTypes '${selectedResoureTypes}`
        );
        const params: UrlSearchParams = {};

        if (searchTerm) {
            params[UrlSearchParameterType.Searchterm] = searchTerm;
        }

        if (selectedResoureTypes.length > 0) {
            params[UrlSearchParameterType.ResourceType] = selectedResoureTypes;
        }
        setSelectableResourceTypes();

        if (spatialFilter.length > 0) {
            params[UrlSearchParameterType.SpatialFilter] = spatialFilter.join(",");
        }

        navigate({
            pathname: "/search",
            search: `?${createSearchParams({ ...params })}`
        });

        // sample fetch
        setIsLoaded(false);
        searchSrvc
            .doSearch({
                searchTerm
            })
            .then((res) => {
                setIsLoaded(true);
                setResults();
            })
            .catch((error) => {
                setIsLoaded(true);
                console.error(error);
            });
    }, [searchTerm, selectedResoureTypes, spatialFilter]);

    function setSelectableResourceTypes() {
        setSelecteableResourceTypes([
            {
                resourceType: ResourceType.Repos,
                count: 245,
                selected: selectedResoureTypes.findIndex((r) => r === ResourceType.Repos) >= 0
            },
            {
                resourceType: ResourceType.Articles,
                count: 3234,
                selected: selectedResoureTypes.findIndex((r) => r === ResourceType.Articles) >= 0
            },
            {
                resourceType: ResourceType.Educational,
                count: 15,
                selected: selectedResoureTypes.findIndex((r) => r === ResourceType.Educational) >= 0
            },
            {
                resourceType: ResourceType.Tools,
                count: 9,
                selected: selectedResoureTypes.findIndex((r) => r === ResourceType.Tools) >= 0
            },
            {
                resourceType: ResourceType.Organisations,
                count: 12,
                selected:
                    selectedResoureTypes.findIndex((r) => r === ResourceType.Organisations) >= 0
            },
            {
                resourceType: ResourceType.Services,
                count: 2,
                selected: selectedResoureTypes.findIndex((r) => r === ResourceType.Services) >= 0
            },
            {
                resourceType: ResourceType.Standards,
                count: 1,
                selected: selectedResoureTypes.findIndex((r) => r === ResourceType.Standards) >= 0
            }
        ]);
    }

    function setResults() {
        setSearchResults({
            count: Math.floor(Math.random() * 1000),
            results: [
                {
                    id: 1,
                    title: "NFDI Consortium Earth System Sciences - Proposal 2020 revised",
                    abstract:
                        "Bernard, Lars; Braesicke, Peter; Bertelmann, Roland; Frickenhaus, Stephan; Gödde,Hildegard; + 13 more",
                    date: new Date(2021, 10),
                    resourceType: ResourceType.Documents,
                    url: ""
                },
                {
                    id: 2,
                    title: "World Data Center for Climate",
                    abstract:
                        "The mission of World Data Center for Climate (WDCC) is to provide central support for the German and European climate research community. The WDCC is member of the ISC's World Data System. Emphasis is on development and implementation of best practice methods for Earth System data management. Data for and from climate research are collected, stored and disseminated. The WDCC is restricted to data products. Cooperations exist with thematically corresponding data centres of, e.g., earth observation, meteorology, oceanography, paleo climate and environmental sciences. The services of WDCC are also available to external users at cost price. A special service for the direct integration of research data in scientific publications has been developed. The editorial process at WDCC ensures the quality of metadata and research data in collaboration with the data producers. A citation code and a digital identifier (DOI) are provided and registered together with citation information at the DOI registration agency DataCite.",
                    date: new Date(2018, 11),
                    resourceType: ResourceType.Repos,
                    url: "repository/"
                },
                {
                    id: 3,
                    title: "World Data Center for Climate",
                    abstract:
                        "The mission of World Data Center for Climate (WDCC) is to provide central support for the German and European climate research community. The WDCC is member of the ISC's World Data System. Emphasis is on development and implementation of best practice methods for Earth System data management. Data for and from climate research are collected, stored and disseminated. The WDCC is restricted to data products. Cooperations exist with thematically corresponding data centres of, e.g., earth observation, meteorology, oceanography, paleo climate and environmental sciences. The services of WDCC are also available to external users at cost price. A special service for the direct integration of research data in scientific publications has been developed. The editorial process at WDCC ensures the quality of metadata and research data in collaboration with the data producers. A citation code and a digital identifier (DOI) are provided and registered together with citation information at the DOI registration agency DataCite.",
                    location: "Hamburg",
                    resourceType: ResourceType.Organisations,
                    url: "organisation/"
                },
                {
                    id: 4,
                    title: "Author guidelines",
                    abstract: "Thomas Rose, Dominik C. Hezel",
                    date: new Date(2023, 2),
                    resourceType: ResourceType.Articles,
                    url: ""
                },
                {
                    id: 5,
                    title: "Earth System Science Data Analytics: Foundations of Image Processing",
                    abstract: "Farzaneh Sadeghi, Carsten Keßler",
                    date: new Date(2030, 5),
                    resourceType: ResourceType.Educational,
                    url: "oer/"
                },
                {
                    id: 6,
                    title: "IPFS Pinning Service for Open Climate Research Data",
                    abstract:
                        "The InterPlanetary File System (IPFS) is a novel decentralized file storage network that allows users to store and share files in a distributed manner, which can make it more resilient if individual infrastructure components fail. It also allows for faster access to content as users can get files directly from other users instead of having to go through a central server. However, one of the challenges of using IPFS is ensuring that the files remain available over time. This is where an IPFS pinning service offers a solution. An IPFS pinning service is a type of service that allows users to store and maintain the availability of their files on the IPFS network. The goal of an IPFS pinning service is to provide a reliable and trusted way for users to ensure that their files remain accessible on the IPFS network. This is accomplished by maintaining a copy of the file on the service's own storage infrastructure, which is then pinned to the IPFS network. This allows users to access the file even if the original source becomes unavailable.       We explored the use of the IPFS for scientific data with a focus on climate data. We set up an IPFS node running on a cloud instance at the German Climate Computing Center where selected scientists can pin their data and make them accessible to the public via the IPFS infrastructure. IPFS is a good choice for climate data, because the open network architecture strengthens open science efforts and enables FAIR data processing workflows. Data within the IPFS is freely accessible to scientists regardless of their location and offers fast access rates to large files. In addition, data within the IPFS is immutable, which ensures that the content of a content identifier does not change over time. Due to the recent development of the IPFS, the project outcomes are novel data science developments for the earth system science and are potentially relevant building blocks to be included in the earth system science community.",
                    date: new Date(2022, 1),
                    resourceType: ResourceType.Tools,
                    url: "tools_software/"
                },
                {
                    id: 7,
                    title: "WMS-Dienst des Deutschen Wetterdienst",
                    abstract:
                        "Über diesen Dienst werden die statistischen Daten der Stadt Osnabrück bereitgestellt.",
                    resourceType: ResourceType.Services,
                    url: "service/"
                },
                {
                    id: 8,
                    title: "OGC Web Map Service",
                    abstract: "Open Geospatial Consortium",
                    date: new Date(2014, 6),
                    resourceType: ResourceType.Standards,
                    url: "standard/"
                }
            ]
        });
    }

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
