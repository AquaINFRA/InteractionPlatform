import "@open-pioneer/runtime";

import { ResourceType } from "../views/Start/ResourceEntry/ResourceEntry";
import { RepositorySearchHandler } from "./search/result-handler/repository-handler";
import { SearchResultHandler } from "./search/result-handler/search-result-handler";
import { ServiceOptions } from "@open-pioneer/runtime";
import { OrganizationSearchHandler } from "./search/result-handler/organization-handler";
import { ArticleSearchHandler } from "./search/result-handler/article-handler";
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
    resourceType?: string[];
    pageSize?: number;
    pageNumber?: number;
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
        new ArticleSearchHandler()
    ];

    doSearch(searchParams: SearchRequestParams): Promise<SearchResult> {
        console.log("Search with following parameters: " + JSON.stringify(searchParams));
        // TODO: use search term
        // TODO: use pagesize
        const queryParams: URLSearchParams = new URLSearchParams();

        queryParams.set("ident", "true");
        queryParams.set("q.op", "OR");
        queryParams.set("q", "*:*");

        if (searchParams.pageSize !== undefined) {
            queryParams.set("rows", searchParams.pageSize.toString());
        }

        // add parameter to request facets
        queryParams.set("facet", "true");
        // parameter to get facet for resource type
        queryParams.set("facet.field", "type");

        if (searchParams.resourceType?.length) {
            const mapping = searchParams.resourceType.map((e) =>
                mapFromResourceType(e as ResourceType)
            );
            queryParams.set("fq", `type:(${mapping.map((e) => `"${e}"`).join(" OR ")})`);
        }

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

    private createFacets(facet_counts: SolrFacetResponse): Facets {
        const temp = this.createResourceTypeFacet(facet_counts);
        return {
            resourceType: temp
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

    private createFragments(facetResponse: any[]) {
        type FacetFragment = { label: string; count: number };
        const entries: FacetFragment[] = [];
        for (let i = 0; i < facetResponse.length; i += 2) {
            const [label, count] = facetResponse.slice(i, i + 2);
            entries.push({ label, count });
        }
        return entries;
    }

    private createResultEntries(docs: SolrSearchResultItem[]): SearchResultItem[] {
        return docs.map((item) => {
            const match = this.searchResultHandlers.find((h) => h.canHandle(item));
            if (match) {
                return match.handle(item);
            } else {
                debugger;
                throw new Error(
                    "Unknown search item, please implement a handler: " + JSON.stringify(item)
                );
            }
        });
        return [];
    }
}

declare module "@open-pioneer/runtime" {
    interface ServiceRegistry {
        "onestop4all.SearchService": SearchService;
    }
}
