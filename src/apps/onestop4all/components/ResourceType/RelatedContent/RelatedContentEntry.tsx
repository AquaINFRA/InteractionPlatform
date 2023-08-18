import { Box, Button, Flex } from "@open-pioneer/chakra-integration";
import { ResourceIcon } from "../../../views/Start/ResourceEntry/ResourceIcons";
import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";

export interface RelatedContentEntryProps {
    title: string;
    resourceType: ResourceType;
    id: string;
}

export const RelatedContentEntry = ({ title, resourceType, id }: RelatedContentEntryProps) => {
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
            {resourceType ? (
                <Flex className="relatedContentResource-entry" alignItems="center">
                    <Box className="relatedContentOverlap">
                        <div className="relatedContentCircle-group"></div>
                        <div className="relatedContentIcon-base"></div>
                        <div className="relatedContentIcon">
                            <ResourceIcon type={resourceType} size={20} />
                        </div>
                    </Box>
                    <Box className="relatedContentResourceType">{resourceType}</Box>
                </Flex>
            ) : null}
            <Box className="relatedContentTitle">
                {title ? (
                    <a href={id} rel="noreferrer" target="_blank">
                        {title.substring(0, 99)}
                        {title.length > 100 ? "..." : ""}
                    </a>
                ) : null}
            </Box>
            {id ? (
                <Button className="relatedContentButton">
                    <a
                        href={id}
                        className="relatedContentButtonLabel"
                        rel="noreferrer"
                        target="_blank"
                    >
                        Visit {getResType(resourceType)}
                    </a>
                </Button>
            ) : null}
        </Box>
    );
};
