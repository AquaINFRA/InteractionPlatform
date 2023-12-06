import { ArticleSearchHandler } from "./search/result-handler/article-handler";
import { Learning_ResourceHandler } from "./search/result-handler/learning_resource-handler";
import { LHB_ArticleSearchHandler } from "./search/result-handler/lhb_article-handler";
import { OrganizationSearchHandler } from "./search/result-handler/organization-handler";
import { RepositorySearchHandler } from "./search/result-handler/repository-handler";
import { SearchResultHandler } from "./search/result-handler/search-result-handler";
import { SoftwareSearchHandler } from "./search/result-handler/software-handler";
import { StandardSearchHandler } from "./search/result-handler/standard-handler";
import { SolrSearchResultItem } from "./SearchService";

export enum ResourceType {
    Repos = "Repository / Archive",
    Articles = "Article",
    // Educational = "Educational resource",
    // Datasets = "Dataset",
    Tools = "Tool/Software",
    Organisations = "Organisation",
    // Services = "Service",
    Standards = "Standard",
    LHB_Articles = "Living Handbook Article",
    Learning_Resource = "Learning resource"
}

const mapping = [
    {
        type: ResourceType.Articles,
        identifier: "http://schema.org/Article"
    },
    {
        type: ResourceType.Organisations,
        identifier: "http://xmlns.com/foaf/0.1/Organization"
    },
    {
        type: ResourceType.Repos,
        identifier: "http://nfdi4earth.de/ontology/Repository"
    },
    {
        type: ResourceType.Standards,
        identifier: "http://nfdi4earth.de/ontology/MetadataStandard"
    },
    {
        type: ResourceType.Tools,
        identifier: "http://schema.org/SoftwareSourceCode"
    },
    {
        type: ResourceType.LHB_Articles,
        identifier: "http://nfdi4earth.de/ontology/LHBArticle"
    },
    {
        type: ResourceType.Learning_Resource,
        identifier: "http://schema.org/LearningResource"
    }
];

export function mapToResourceType(identifier: string): ResourceType {
    const match = mapping.find((e) => e.identifier === identifier);
    if (match) {
        return match.type;
    }
    throw new Error(`Could not find a ResourceType to the given identifier: ${identifier}`);
}

export function mapFromResourceType(resourceType: ResourceType): string {
    const match = mapping.find((e) => e.type === resourceType);
    if (match) {
        return match.identifier;
    }
    throw new Error(`Could not find an identifier to the given  ResourceType: ${resourceType}`);
}

const searchResultHandlers: SearchResultHandler[] = [
    new RepositorySearchHandler(),
    new OrganizationSearchHandler(),
    new ArticleSearchHandler(),
    new StandardSearchHandler(),
    new SoftwareSearchHandler(),
    new LHB_ArticleSearchHandler(),
    new Learning_ResourceHandler()
];

export function getHandler(result: SolrSearchResultItem): SearchResultHandler {
    const match = searchResultHandlers.find((h) => h.canHandle(result));
    if (match) {
        return match;
    } else {
        throw new Error(
            "Unknown search item, please implement a handler: " + JSON.stringify(result)
        );
    }
}

export function getResourceType(result: SolrSearchResultItem): ResourceType {
    return getHandler(result).resourceType;
}
