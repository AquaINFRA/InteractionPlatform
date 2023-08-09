import "@open-pioneer/runtime";

import { ResourceType } from "../views/Start/ResourceEntry/ResourceEntry";
import { RepositorySearchHandler } from "./search/result-handler/repository-handler";
import { SearchResultHandler } from "./search/result-handler/search-result-handler";
import { ServiceOptions } from "@open-pioneer/runtime";
import { OrganizationSearchHandler } from "./search/result-handler/organization-handler";
import { ArticleSearchHandler } from "./search/result-handler/article-handler";
import { SoftwareSearchHandler } from "./search/result-handler/software-handler";
import { mapFromResourceType, mapToResourceType } from "./ResourceTypeUtils";

export interface SearchResultItem {
    id: string;
    title: string;
    resourceType: ResourceType;
    date?: Date;
    location?: string;
    abstract: string;
    url: string;
}

export interface SearchRequestParams {
    searchTerm?: string;
    resourceTypes?: string[];
    pageSize?: number;
    pageStart?: number;
    spatialFilter?: number[];
}

export interface SolrSearchResultItem {
    id: string;
    type: string;
    [key: string]: any;
}

interface SolrSearchResponse {
    numFound?: number;
    docs: SolrSearchResultItem[];
}

interface SolrFacetResponse {
    facet_fields: {
        [key: string]: [];
    };
}

export interface Facets {
    resourceType: {
        resourceType: ResourceType;
        count: number;
    }[];
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

export class SearchService {
    private config: SolrConfig;

    constructor(opts: ServiceOptions) {
        if (opts.properties.solr) {
            this.config = opts.properties.solr as SolrConfig;
        } else {
            throw new Error("Configuration for solr is missing.");
        }
    }

    private searchResultHandlers: SearchResultHandler[] = [
        new RepositorySearchHandler(),
        new OrganizationSearchHandler(),
        new ArticleSearchHandler(),
        new SoftwareSearchHandler()
    ];

    doSearch(searchParams: SearchRequestParams): Promise<SearchResult> {
        console.log("Search with following parameters: " + JSON.stringify(searchParams));

        const queryParams = this.createQueryParams();

        this.addSearchterm(searchParams.searchTerm, queryParams);

        this.addPaging(searchParams.pageSize, searchParams.pageStart, queryParams);

        this.addFacet(queryParams);

        this.addResourceTypes(searchParams.resourceTypes, queryParams);

        this.addSpatialFilter(searchParams.spatialFilter, queryParams);

        // TODO: remove proxy later
        const url =
            "http://localhost:8080/" +
            `${this.config.url}/${this.config.coreSelector}/select` +
            `?${queryParams.toString()}`;
        return fetch(url).then((response) =>
            response
                .json()
                .then(
                    (responseData: {
                        response: SolrSearchResponse;
                        facet_counts: SolrFacetResponse;
                    }) => {
                        const { response } = responseData;
                        if (response.numFound !== undefined && response.docs !== undefined) {
                            return {
                                count: response.numFound,
                                results: this.createResultEntries(response.docs),
                                facets: this.createFacets(responseData.facet_counts)
                            };
                        } else {
                            throw new Error("Unexpected response: " + JSON.stringify(responseData));
                        }
                    }
                )
        );
    }

    getMetadata(resourceId: string) {
        console.log("Get metadata for the following resource ID " + resourceId);
        const queryParams = this.createQueryParams();

        if (resourceId) {
            queryParams.set("q", resourceId);
            queryParams.set("df", "id");
        }
        // TODO: remove proxy later
        const url =
            "http://localhost:8080/" +
            `${this.config.url}/${this.config.coreSelector}/select` +
            `?${queryParams.toString()}`;
        return fetch(url).then((response) =>
            response.json().then((responseData: { response: any }) => {
                const { response } = responseData;
                if (response.numFound !== undefined && response.docs !== undefined) {
                    return {
                        count: response.numFound,
                        results: response.docs
                    };
                } else {
                    throw new Error("Unexpected response: " + JSON.stringify(responseData));
                }
            })
        );
    }

    private addSpatialFilter(spatialFilter: number[] | undefined, queryParams: URLSearchParams) {
        if (spatialFilter && spatialFilter.length > 0) {
            if (spatialFilter.length === 4) {
                const [minLon, minLat, maxLon, maxLat] = spatialFilter;
                queryParams.set("fq", `geometry:[${minLat},${minLon} TO ${maxLat},${maxLon}]`);
            }
        }
    }

    private addResourceTypes(resourceTypes: string[] | undefined, queryParams: URLSearchParams) {
        if (resourceTypes?.length) {
            const mapping = resourceTypes.map((e) => mapFromResourceType(e as ResourceType));
            queryParams.set("fq", `type:(${mapping.map((e) => `"${e}"`).join(" OR ")})`);
        }
    }

    private addFacet(queryParams: URLSearchParams) {
        // add parameter to request facets
        queryParams.set("facet", "true");
        // parameter to get facet for resource type
        queryParams.set("facet.field", "type");
    }

    private addPaging(
        pageSize: number | undefined,
        pageStart: number | undefined,
        queryParams: URLSearchParams
    ) {
        if (pageSize !== undefined) {
            queryParams.set("rows", pageSize.toString());
            if (pageStart !== undefined) {
                queryParams.set("start", (pageStart * pageSize).toString());
            }
        }
    }

    private addSearchterm(searchTerm: string | undefined, queryParams: URLSearchParams) {
        if (searchTerm) {
            queryParams.set("q", searchTerm);
            queryParams.set("df", "collector");
        } else {
            queryParams.set("q", "*:*");
        }
        queryParams.set("fl", "*, [child author]");
    }

    private createQueryParams(): URLSearchParams {
        const queryParams: URLSearchParams = new URLSearchParams();
        queryParams.set("ident", "true");
        queryParams.set("q.op", "OR");
        return queryParams;
    }

    private createFacets(facet_counts: SolrFacetResponse): Facets {
        return {
            resourceType: this.createResourceTypeFacet(facet_counts)
        };
    }

    private createResourceTypeFacet(facet_counts: SolrFacetResponse) {
        const resourceTypeFacet = facet_counts.facet_fields["type"];
        if (resourceTypeFacet) {
            return this.createFragments(resourceTypeFacet).map((e) => {
                return {
                    resourceType: mapToResourceType(e.label),
                    count: e.count
                };
            });
        }
        return [];
    }

    private createFragments(facetResponse: Array<string | number>) {
        type FacetFragment = { label: string; count: number };
        const entries: FacetFragment[] = [];
        for (let i = 0; i < facetResponse.length; i += 2) {
            const [label, count] = facetResponse.slice(i, i + 2);
            if (typeof label === "string" && typeof count === "number") {
                entries.push({ label, count });
            }
        }
        return entries;
    }

    private createResultEntries(docs: SolrSearchResultItem[]): SearchResultItem[] {
        return docs.map((item) => {
            const match = this.searchResultHandlers.find((h) => h.canHandle(item));
            if (match) {
                return match.handle(item);
            } else {
                throw new Error(
                    "Unknown search item, please implement a handler: " + JSON.stringify(item)
                );
            }
        });
    }
}

declare module "@open-pioneer/runtime" {
    interface ServiceRegistry {
        "onestop4all.SearchService": SearchService;
    }
}
