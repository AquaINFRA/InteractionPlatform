import "@open-pioneer/runtime";

import { RepositorySearchHandler } from "./search/result-handler/repository-handler";
import { SearchResultHandler } from "./search/result-handler/search-result-handler";
import { ServiceOptions } from "@open-pioneer/runtime";
import { OrganizationSearchHandler } from "./search/result-handler/organization-handler";
import { ArticleSearchHandler } from "./search/result-handler/article-handler";
import { LHB_ArticleSearchHandler } from "./search/result-handler/lhb_article-handler";
import { ResourceType, mapFromResourceType, mapToResourceType } from "./ResourceTypeUtils";
import { StandardSearchHandler } from "./search/result-handler/standard-handler";
import { SoftwareSearchHandler } from "./search/result-handler/software-handler";
import { Learning_ResourceHandler } from "./search/result-handler/learning_resource-handler";

export interface SearchResultItem {
    id: string;
    title: string;
    resourceType: ResourceType;
    publishDate?: Date;
    updateDate?: Date;
    locality?: string;
    abstract: string;
    url: string;
}

export interface SearchRequestParams {
    searchTerm?: string;
    resourceTypes?: string[];
    subjects?: string[];
    pageSize?: number;
    pageStart?: number;
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
}

interface SolrSearchResponse {
    numFound?: number;
    docs: SolrSearchResultItem[];
}

interface SolrFacetResponse {
    facet_fields: {
        [key: string]: [];
    };
    facet_ranges: {
        [key: string]: {
            counts: [];
        };
    };
}

export interface SubjectEntry {
    label: string;
    count: number;
}

export interface Facets {
    subjects: SubjectEntry[];
    resourceType: {
        resourceType: ResourceType;
        count: number;
    }[];
    temporal: TemporalFacet[];
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

const SOLR_SUBJECT_FACET_FIELD = "theme_str";
const SOLR_RESOURCE_TYPE_FACET_FIELD = "type";
const SOLR_TEMPORAL_FACET_RANGE_FIELD = "datePublished";
export const proxy = "http://localhost:8080/";

export class SearchService {
    private config: SolrConfig;

    private resourceTypeFacetBlacklist: string[] = ["person_nested"];

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
        new StandardSearchHandler(),
        new SoftwareSearchHandler(),
        new LHB_ArticleSearchHandler(),
        new Learning_ResourceHandler()
    ];

    doSearch(searchParams: SearchRequestParams): Promise<SearchResult> {
        console.log("Search with following parameters: " + JSON.stringify(searchParams));

        const queryParams = this.createQueryParams();

        this.addSearchterm(searchParams.searchTerm, queryParams);

        this.addPaging(searchParams.pageSize, searchParams.pageStart, queryParams);

        this.addFacet(queryParams);

        this.addResourceTypes(searchParams.resourceTypes, queryParams);

        this.addSubjects(searchParams.subjects, queryParams);

        this.addSpatialFilter(searchParams.spatialFilter, queryParams);

        this.addSorting(searchParams.sorting, queryParams);

        this.addTemporalFilter(
            searchParams.temporalFilter,
            queryParams,
            searchParams.temporalConfig
        );

        const url = `${this.config.url}/${
            this.config.coreSelector
        }/select?${queryParams.toString()}`;
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
            queryParams.set("ids", resourceId);
            this.addChildQueryParams(queryParams);
        }
        const url = `${this.config.url}/${this.config.coreSelector}/get?${queryParams.toString()}`;
        return fetch(url).then((response) =>
            response.json().then((responseData: { response: SolrSearchResponse }) => {
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

    getFaqList() {
        const url =
            proxy +
            `https://git.rwth-aachen.de/api/v4/projects/79252/repository/files/docs%2fFAQ.md/raw`;
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

    getFaq(faqId: string) {
        const url =
            proxy +
            `https://git.rwth-aachen.de/api/v4/projects/79252/repository/files/docs%2f` +
            faqId +
            `/raw`;
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

    getHowToEntry(howToEntry: string) {
        //console.log("start fetching entry point for id: " + howToEntry);
        const url =
            proxy +
            `https://git.rwth-aachen.de/api/v4/projects/79252/repository/files/docs%2f` +
            howToEntry +
            `/raw`;
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

    getLhbStructure() {
        const url =
            proxy +
            `https://git.rwth-aachen.de/nfdi4earth/livinghandbook/livinghandbook/-/raw/main/mkdocs.yml`;
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

    getChapter(chapter: string) {
        const url =
            `${this.config.url}/${this.config.coreSelector}/select?ident=true&q.op=OR&q=sourceSystem_id%3A"` +
            chapter +
            `"`;
        return fetch(url).then((response) =>
            response.json().then((responseData: { response: object }) => {
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
                const [minLon, minLat, maxLon, maxLat] = spatialFilter;
                queryParams.set("fq", `geometry:[${minLat},${minLon} TO ${maxLat},${maxLon}]`);
            }
        }
    }

    private addTemporalFilter(
        temporalFilter: TemporalFilter | undefined,
        queryParams: URLSearchParams,
        temporalConfig?: TemporalConfig
    ) {
        if (temporalFilter) {
            queryParams.set(
                "fq",
                `datePublished:[${temporalFilter.startYear} TO ${temporalFilter.endYear}]`
            );
        }
        if (temporalConfig) {
            queryParams.set("facet.range", SOLR_TEMPORAL_FACET_RANGE_FIELD);
            queryParams.set("facet.range.start", `${temporalConfig.startYear}-01-01T00:00:00Z`);
            queryParams.set("facet.range.end", `${temporalConfig.endYear + 1}-01-01T00:00:00Z`);
            queryParams.set("facet.range.gap", temporalConfig.gap);
        }
    }

    private addResourceTypes(resourceTypes: string[] | undefined, queryParams: URLSearchParams) {
        if (resourceTypes?.length) {
            const mapping = resourceTypes.map((e) => mapFromResourceType(e as ResourceType));
            queryParams.set(
                "fq",
                `${SOLR_RESOURCE_TYPE_FACET_FIELD}:(${mapping.map((e) => `"${e}"`).join(" OR ")})`
            );
        }
    }

    private addSubjects(subjects: string[] | undefined, queryParams: URLSearchParams) {
        if (subjects?.length) {
            queryParams.set(
                "fq",
                `${SOLR_SUBJECT_FACET_FIELD}:(${subjects.map((e) => `"${e}"`).join(" OR ")})`
            );
        }
    }

    private addFacet(queryParams: URLSearchParams) {
        // add parameter to request facets
        queryParams.set("facet", "true");
        // parameter to get facet for resource type
        queryParams.set("facet.field", SOLR_RESOURCE_TYPE_FACET_FIELD);
        queryParams.append("facet.field", SOLR_SUBJECT_FACET_FIELD);
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

    private addSorting(sorting: string | undefined, queryParams: URLSearchParams) {
        if (sorting !== undefined && sorting !== "") {
            queryParams.set("sort", sorting);
        }
    }

    private addSearchterm(searchTerm: string | undefined, queryParams: URLSearchParams) {
        if (searchTerm) {
            queryParams.set("q", searchTerm);
            queryParams.set("df", "collector");
        } else {
            queryParams.set("q", "*:*");
        }
        this.addChildQueryParams(queryParams);
    }

    private addChildQueryParams(queryParams: URLSearchParams) {
        queryParams.set("fl", "*, [child author]");
        queryParams.set("fq", '-type:"person_nested"');
    }

    private createQueryParams(): URLSearchParams {
        const queryParams: URLSearchParams = new URLSearchParams();
        queryParams.set("ident", "true");
        queryParams.set("q.op", "OR");
        return queryParams;
    }

    private createFacets(facet_counts: SolrFacetResponse): Facets {
        return {
            subjects: this.createSubjectFacets(facet_counts),
            resourceType: this.createResourceTypeFacet(facet_counts),
            temporal: this.createTemporalFacet(facet_counts)
        };
    }

    private createSubjectFacets(
        facet_counts: SolrFacetResponse
    ): { label: string; count: number }[] {
        const themeFacets = facet_counts.facet_fields[SOLR_SUBJECT_FACET_FIELD];
        return themeFacets ? this.createFragments(themeFacets) : [];
    }

    private createResourceTypeFacet(facet_counts: SolrFacetResponse) {
        const resourceTypeFacet = facet_counts.facet_fields["type"];
        if (resourceTypeFacet) {
            return this.createFragments(resourceTypeFacet).map((e) => ({
                resourceType: mapToResourceType(e.label),
                count: e.count
            }));
        }
        return [];
    }

    private createTemporalFacet(facet_counts: SolrFacetResponse) {
        const facetCounts = facet_counts.facet_ranges[SOLR_TEMPORAL_FACET_RANGE_FIELD]?.counts;
        if (facetCounts) {
            return this.createFragments(facetCounts).map((e) => ({
                dateStr: e.label.substring(0, 4),
                count: e.count
            }));
        }
        return [];
    }

    private createFragments(facetResponse: Array<string | number>) {
        type FacetFragment = { label: string; count: number };
        const entries: FacetFragment[] = [];
        for (let i = 0; i < facetResponse.length; i += 2) {
            const [label, count] = facetResponse.slice(i, i + 2);
            if (typeof label === "string" && typeof count === "number") {
                const idx = this.resourceTypeFacetBlacklist.findIndex((e) => e === label);
                if (idx === -1) {
                    entries.push({ label, count });
                }
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
