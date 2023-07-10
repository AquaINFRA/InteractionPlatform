import { Box, Button } from "@open-pioneer/chakra-integration";
import { ResourceIcon } from "../../../views/Start/ResourceEntry/ResourceIcons";
import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";

export interface RelatedContentEntryProps {
    title: string;
    resourceType: ResourceType;
    url: string;
}

export const RelatedContentEntry = ({ title, resourceType, url }: RelatedContentEntryProps) => {
    return (
        <div className="relatedContentEntry">
            <div className="overlap">
                <div className="circle-group"></div>
                <div className="icon-base"></div>
                <div className="icon">
                    <div className="relatedContentLabel">{resourceType}</div>
                </div>
            </div>
            <Box className="relatedContentTitle">{title}</Box>
            <Button className="relatedContentButton">
                <a href={url} className="relatedContentButtonLabel">
                    Learn More
                </a>
            </Button>
        </div>
    );
};
