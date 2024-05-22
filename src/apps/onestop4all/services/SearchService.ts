import "@open-pioneer/runtime";

import { ServiceOptions } from "@open-pioneer/runtime";
import { ResourceType } from "./ResourceTypeUtils";
import { DataProvider } from "../views/Search/Facets/DataProviderFacet/DataProviderFacet";

export interface SearchResultItem {
    id: string;
    title: string;
    resourceType: ResourceType;
    publishDate?: Date;
    updateDate?: Date;
    locality?: string;
    abstract: string;
    url: string;
    properties: {
        title: string;
        type: string;
        aicollection: string;
        description: string;
    };
}

export interface SearchRequestParams {
    searchTerm?: string;
    resourceTypes?: string[];
    subjects?: string[];
    dataProvider?: string[];
    //pageSize?: number;
    //pageStart?: number;
    spatialFilter?: number[];
    temporalFilter?: TemporalFilter;
    temporalConfig?: TemporalConfig;
    sorting?: string;
}

export interface TemporalConfig {
    startYear: number;
    endYear: number;
    gap: string;
}

export interface TemporalFilter {
    startYear: number;
    endYear: number;
}

export interface TemporalFacet {
    dateStr: string;
    count: number;
}

export interface SolrSearchResultItem {
    id: string;
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    time: string;
    properties: {
        title: string;
        type: string;
        aicollection: string;
        description: string;
    };
}

export interface ZenodoResultItem {
    title: string;
    recid: string;
    doi_url: string;
    identifier: string;
    codeRepository: string;
    metadata: {
        resource_type: {
            title: string;
            type: ResourceType;
        };
        description: string;
        language: string;
        publication_date: string;
        license: {
            id: string;
        };
        version: string;
        creators: [
            {
                affiliation: string;
                name: string;
                orcid: string;
            }
        ];
    };
}

export interface Facets {
    provider: DataProvider[];
}

export interface SearchResult {
    count: number;
    results: SearchResultItem[];
    facets: Facets;
}

export interface SolrConfig {
    url: string;
    coreSelector: string;
}

const oapirUrl = import.meta.env.VITE_OAPIR_URL;
export const supportForm = "http://localhost/html/nfdi/";

export class SearchService {
    private config: SolrConfig;

    constructor(opts: ServiceOptions) {
        if (opts.properties.solr) {
            this.config = opts.properties.solr as SolrConfig;
        } else {
            throw new Error("Configuration for solr is missing.");
        }
    }

    doSearch(searchParams: SearchRequestParams): Promise<SearchResult> {
        const queryParams = this.createQueryParams();

        this.addSearchterm(searchParams.searchTerm, queryParams);
        
        this.addSearchResultsLimit(queryParams);

        this.addSpatialFilter(searchParams.spatialFilter, queryParams);

        this.addDataProvider(searchParams.dataProvider, queryParams);

        const url = `${oapirUrl}/search?${queryParams.toString()}`;

        return fetch(url).then((response) =>
            response.json().then((responseData) => {
                const response = responseData;
                console.log(response);
                if (response.numberMatched !== undefined && response.features !== undefined) {
                    return {
                        count: response.features.length,
                        results: response.features,
                        facets: {
                            provider: searchParams.dataProvider?.map((dp) => {
                                return { title: dp };
                            })
                        }
                    } as SearchResult;
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(responseData));
                }
            })
        );
    }

    getMetadata(resourceId: string) {
        const provider = resourceId.split(":")[0];
        const id = resourceId.substring(resourceId.indexOf(":") + 1);
        const queryParams = this.createQueryParams();
        let url = "";
        if (resourceId) {
            queryParams.set("ids", resourceId);
            this.addChildQueryParams(queryParams);
        }
        if (provider === "zenodo") {
            const baseUrl = "https://zenodo.org/api/records";
            url = `${baseUrl}/${id}`;
        } else {
            const baseUrl = oapirUrl + "/collections";
            url = `${baseUrl}/${provider}/items/${id}`;
        }
        return fetch(url).then((response) =>
            response.json().then((responseData) => {
                if (responseData) {
                    return { response: responseData, provider: provider };
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(responseData));
                }
            })
        );
    }

    getLatestAdditionsFromZenodo() {
        const url = `https://zenodo.org/api/records?communities=aquainfra`;
        return fetch(url).then((response) =>
            response.json().then((responseData: object) => {
                if (responseData) {
                    return responseData;
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(responseData));
                }
            })
        );
    }

    fetchRoCrateFile(id: string) {
        const url =
            "https://zenodo.org/api/records/" + id + "/files/ro-crate-metadata.json/content";
        return fetch(url).then((response) =>
            response.json().then((responseData: object) => {
                if (responseData) {
                    return responseData;
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(responseData));
                }
            })
        );
    }

    getDataProvider() {
        const url = oapirUrl + "/collections?f=json&lang=en-US";
        return fetch(url).then((response) =>
            response.text().then((responseData: string) => {
                if (responseData) {
                    return responseData;
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(responseData));
                }
            })
        );
    }
    getRelatedSearchterms(keyword: string) {
        const baseUrl = "http://vm2558.kaj.pouta.csc.fi/rcsearch?keyword=";
        const url = baseUrl + keyword + "&broader=true&narrower=true&related=true";
        return fetch(url).then((response) =>
            response.text().then((responseData: string) => {
                if (responseData) {
                    return responseData;
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(responseData));
                }
            })
        );
    }

    private addSpatialFilter(spatialFilter: number[] | undefined, queryParams: URLSearchParams) {
        if (spatialFilter && spatialFilter.length > 0) {
            if (spatialFilter.length === 4) {
                const [minLat, minLon, maxLat, maxLon] = spatialFilter;
                queryParams.set("bbox", `${minLat},${minLon},${maxLat},${maxLon}`);
            }
        }
    }

    private addDataProvider(dataProvider: string[] | undefined, queryParams: URLSearchParams) {
        if (dataProvider?.length) {
            queryParams.set("collections", `${dataProvider.map((e) => `${e}`).join(",")}`);
        }
    }

    private addSearchResultsLimit(
        /*pageSize: number | undefined,
        pageStart: number | undefined,*/
        queryParams: URLSearchParams
    ) {
        queryParams.set("limit", "100");
        /*if (pageSize !== undefined) {
            queryParams.set("limit", pageSize.toString());
            if (pageStart !== undefined) {
                queryParams.set("offset", (pageStart * pageSize).toString());
            }
        }*/
    }

    private addSearchterm(searchTerm: string | undefined, queryParams: URLSearchParams) {
        if (searchTerm) {
            queryParams.set("q", searchTerm);
        }
    }

    private addChildQueryParams(queryParams: URLSearchParams) {
        queryParams.set("fl", "*, [child author]");
        queryParams.set("fq", '-type:"person_nested"');
    }

    private createQueryParams(): URLSearchParams {
        const queryParams: URLSearchParams = new URLSearchParams();
        return queryParams;
    }
}

declare module "@open-pioneer/runtime" {
    interface ServiceRegistry {
        "onestop4all.SearchService": SearchService;
    }
}
