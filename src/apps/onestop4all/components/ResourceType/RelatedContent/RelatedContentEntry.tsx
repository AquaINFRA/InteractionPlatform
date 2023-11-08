import { Box, Button, Flex } from "@open-pioneer/chakra-integration";
import { ResourceIcon } from "../../../views/Start/ResourceEntry/ResourceIcons";
import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { mapToResourceType } from "../../../services/ResourceTypeUtils";

export interface RelatedContentEntryProps {
    title: string;
    type: ResourceType;
    id: string;
}

export const RelatedContentEntry = ({ title, type, id }: RelatedContentEntryProps) => {
    console.log(title, type, id);
    const resType = mapToResourceType(type);

    return (
        <Box className="relatedContentEntry">
            {type ? (
                <Flex className="relatedContentResource-entry" alignItems="center">
                    <Box className="relatedContentOverlap">
                        <div className="relatedContentCircle-group"></div>
                        <div className="relatedContentIcon-base"></div>
                        <div className="relatedContentIcon">
                            <ResourceIcon type={resType} size={20} />
                        </div>
                    </Box>
                    <Box className="relatedContentResourceType">{resType}</Box>
                </Flex>
            ) : null}
            <Box className="relatedContentTitle">
                {title && title[0] ? (
                    <a href={id} rel="noreferrer" target="_blank">
                        {title[0].substring(0, 99)}
                        {title[0].length > 100 ? "..." : ""}
                    </a>
                ) : null}
            </Box>
            {id ? (
                <a href={id} className="relatedContentLink" rel="noreferrer" target="_blank">
                    <Button className="relatedContentButton">
                        <span className="relatedContentLabel">Visit {resType}</span>
                    </Button>
                </a>
            ) : null}
        </Box>
    );
};
