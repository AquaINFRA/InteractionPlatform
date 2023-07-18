import { Box, Button, Flex } from "@open-pioneer/chakra-integration";
import { ResourceIcon } from "../../../views/Start/ResourceEntry/ResourceIcons";
import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";

export interface RelatedContentEntryProps {
    title: string;
    resourceType: ResourceType;
    url: string;
}

export const RelatedContentEntry = ({ title, resourceType, url }: RelatedContentEntryProps) => {
    const getResType = (resType: string) => {
        switch (resType) {
            case "Repositories / Archives":
                return "Repository";
            case "Services":
                return "Service";
            case "Tools/Software":
                return "Tool/Software";
            case "Standards":
                return "Standard";
            case "Educational resources":
                return "Educational Resource";
            case "Documents":
                return "Document";
            case "Organisations":
                return "Organisation";
            default:
                return "";
        }
    };

    return (
        <Box className="relatedContentEntry">
            <Flex className="relatedContentResource-entry" alignItems="center">
                <Box className="relatedContentOverlap">
                    <div className="relatedContentCircle-group"></div>
                    <div className="relatedContentIcon-base"></div>
                    <div className="relatedContentIcon">
                        <ResourceIcon type={resourceType} size={30} />
                    </div>
                </Box>
                <Box className="relatedContentResourceType">{resourceType}</Box>
            </Flex>
            <Box className="relatedContentTitle">{title}</Box>
            <Button className="relatedContentButton">
                <a href={url} className="relatedContentButtonLabel">
                    Visit {getResType(resourceType)}
                </a>
            </Button>
        </Box>
    );
};
