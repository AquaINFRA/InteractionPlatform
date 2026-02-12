import { SearchResultHandler } from "./search/result-handler/search-result-handler";
import { DatasetHandler } from "./search/result-handler/dataset-handler";
import { WorkflowHandler } from "./search/result-handler/workflow-handler";
import { SoftwareHandler } from "./search/result-handler/software-zenodo-handler";
import { PublicationHandler } from "./search/result-handler/publication-handler";
import { PresentationHandler } from "./search/result-handler/presentation-handler";
import { ImageHandler } from "./search/result-handler/image-handler";
import { VideoHandler } from "./search/result-handler/video-handler";
import { PosterHandler } from "./search/result-handler/poster-handler";
import { OtherHandler } from "./search/result-handler/other-handler";
import { LessonHandler } from "./search/result-handler/lesson-handler";
import { PhysicalObejctHandler } from "./search/result-handler/physicalobject-handler";
import { EventHandler } from "./search/result-handler/event-handler";
import { DkpHandler } from "./search/result-handler/dkp-handler";

export enum ResourceType {
    Dataset = "dataset",
    Unknown = "unknown",
    Software = "software",
    Workflow = "workflow",
    Publication = "publication",
    Presentation = "presentation",
    Image = "image",
    Lesson = "lesson",
    Other = "other",
    Poster = "poster",
    Video = "video",
    PhysicalObject = "physicalobject",
    Event = "event",
    DKP = "data-to-knowledge package"
}

const mapping = [
    {
        type: ResourceType.Dataset,
        identifier: "dataset"
    },
    {
        type: ResourceType.Unknown,
        identifier: "unknown"
    },
    {
        type: ResourceType.Software,
        identifier: "software"
    },
    {
        type: ResourceType.Workflow,
        identifier: "workflow"
    },
    {
        type: ResourceType.Publication,
        identifier: "publication"
    },
    {
        type: ResourceType.DKP,
        identifier: "data-to-knowledge package"
    },
    {
        type: ResourceType.Presentation,
        identifier: "presentation"
    },
    {
        type: ResourceType.Other,
        identifier: "other"
    },
    {
        type: ResourceType.Poster,
        identifier: "poster"
    },
    {
        type: ResourceType.Image,
        identifier: "image"
    },
    {
        type: ResourceType.Video,
        identifier: "video"
    },
    {
        type: ResourceType.Lesson,
        identifier: "lesson"
    },
    {
        type: ResourceType.PhysicalObject,
        identifier: "physicalobject"
    },
    {
        type: ResourceType.Event,
        identifier: "event"
    }
];

export function mapToResourceType(identifier: string): ResourceType {
    const match = mapping.find((e) => e.identifier === identifier);
    if (match) {
        return match.type;
    } else {
        return ResourceType.Dataset;
    }
}

export function mapFromResourceType(resourceType: ResourceType): string {
    const match = mapping.find((e) => e.type === resourceType);
    if (match) {
        return match.identifier;
    }
    throw new Error(`Could not find an identifier to the given  ResourceType: ${resourceType}`);
}

const searchResultHandlers: SearchResultHandler[] = [
    new DatasetHandler(),
    new WorkflowHandler(),
    new SoftwareHandler(),
    new PublicationHandler(),
    new PresentationHandler(),
    new ImageHandler(),
    new VideoHandler(),
    new PosterHandler(),
    new OtherHandler(),
    new LessonHandler(),
    new PhysicalObejctHandler(),
    new EventHandler(),
    new DkpHandler()
];

export function getHandler(result: string): SearchResultHandler {
    if (!result) {
        result = "dataset";
    }
    const match = searchResultHandlers.find((h) => h.canHandle(result));
    if (match) {
        return match;
    } else {
        return new DatasetHandler();
    }
}

export function getResourceType(result: string): ResourceType {
    return getHandler(result).resourceType;
}

export function formatDate(date: Date) {
    const pad = (n: number) => n.toString().padStart(2, "0");

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    const offset = date.getTimezoneOffset();
    const sign = offset <= 0 ? "+" : "-";
    const absOffset = Math.abs(offset);
    const offHours = pad(Math.floor(absOffset / 60));
    const offMinutes = pad(absOffset % 60);

    return `${day}/${month}/${year} ${hours}:${minutes} (GMT${sign}${offHours}:${offMinutes})`;
}