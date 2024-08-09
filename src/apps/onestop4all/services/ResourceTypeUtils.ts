import { ArticleSearchHandler } from "./search/result-handler/article-handler";
import { SearchResultHandler } from "./search/result-handler/search-result-handler";
import { DatasetHandler } from "./search/result-handler/dataset-handler";
import { SeriesHandler } from "./search/result-handler/series-handler";
import { ModelHandler } from "./search/result-handler/model-handler";
import { ServiceHandler } from "./search/result-handler/service-handler";
import { SoftwareHandler } from "./search/result-handler/software-zenodo-handler";
import { OfflineDataHandler } from "./search/result-handler/offlineData-handler";
import { LiveDataHandler } from "./search/result-handler/liveData-handler";
import { DownloadableDataHandler } from "./search/result-handler/downloadableData-handler";

export enum ResourceType {
    Repos = "Repository / Archive",
    Articles = "Article",
    Tools = "Tool/Software",
    Organisations = "Organisation",
    Standards = "Standard",
    LHB_Articles = "Living Handbook Article",
    Learning_Resource = "Learning resource",
    Dataset = "dataset",
    Series = "series",
    Service = "service",
    NonGeoData = "nonGeographicDataset",
    Unknown = "unknown",
    Software = "software",
    Model = "model",
    LiveData = "liveData",
    OfflineData = "offlineData",
    DownloadableData = "downloadableData"
}

const mapping = [
    {
        type: ResourceType.Articles,
        identifier: "http://schema.org/Article"
    },
    {
        type: ResourceType.Dataset,
        identifier: "dataset"
    },
    {
        type: ResourceType.OfflineData,
        identifier: "offlineData"
    },
    {
        type: ResourceType.LiveData,
        identifier: "liveData"
    },
    {
        type: ResourceType.DownloadableData,
        identifier: "downloadableData"
    },
    {
        type: ResourceType.Series,
        identifier: "series"
    },
    {
        type: ResourceType.Service,
        identifier: "service"
    },
    {
        type: ResourceType.Model,
        identifier: "model"
    },
    {
        type: ResourceType.NonGeoData,
        identifier: "nonGeographicDataset"
    },
    {
        type: ResourceType.Unknown,
        identifier: "unknown"
    },
    {
        type: ResourceType.Software,
        identifier: "software"
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
    new ArticleSearchHandler(),
    new DatasetHandler(),
    new SoftwareHandler(),
    new SeriesHandler(),
    new ModelHandler(),
    new ServiceHandler(),
    new DownloadableDataHandler(),
    new OfflineDataHandler(),
    new LiveDataHandler()
];

export function getHandler(result: string): SearchResultHandler {
    if (!result) {
        result = "dataset";
    }
    const match = searchResultHandlers.find((h) => h.canHandle(result));
    if (match) {
        return match;
    } else {
        throw new Error(
            "Unknown search item, please implement a handler: " + JSON.stringify(result)
        );
    }
}

export function getResourceType(result: string): ResourceType {
    return getHandler(result).resourceType;
}
