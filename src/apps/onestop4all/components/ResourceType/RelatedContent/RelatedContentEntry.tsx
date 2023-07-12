import { Box, Button, Flex } from "@open-pioneer/chakra-integration";
import { ResourceIcon } from "../../../views/Start/ResourceEntry/ResourceIcons";
import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";

export interface RelatedContentEntryProps {
    title: string;
    resourceType: ResourceType;
    url: string;
}

export const RelatedContentEntry = ({ title, resourceType, url }: RelatedContentEntryProps) => {
    return (
        <Box>
            <Flex className="relatedContentResource-entry" alignItems="center">
                <Box className="relatedContentOverlap">
                    <div className="relatedContentCircle-group"></div>
                    <div className="relatedContentIcon-base"></div>
                    <div className="relatedContentIcon">
                        <ResourceIcon type={resourceType} size={30} />
                    </div>
                </Box>
                <Box className="relatedContentLabel">{resourceType}</Box>
            </Flex>
            <Box className="relatedContentTitle">{title}</Box>
            <Button className="relatedContentButton">
                <a href={url} className="relatedContentButtonLabel">
                    Visit {resourceType}
                </a>
            </Button>
        </Box>
    );
};
