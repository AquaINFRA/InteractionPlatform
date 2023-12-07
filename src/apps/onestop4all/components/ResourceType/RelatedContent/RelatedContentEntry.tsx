import { Box, Button, Flex, SystemStyleObject } from "@open-pioneer/chakra-integration";
import { useNavigate } from "react-router-dom";

import { mapToResourceType, ResourceType } from "../../../services/ResourceTypeUtils";
import { ResourceIcon } from "../../../views/Start/ResourceEntry/ResourceIcons";

export interface RelatedContentEntryProps {
    title: string;
    type: ResourceType;
    id: string;
}

export const RelatedContentEntry = ({ title, type, id }: RelatedContentEntryProps) => {
    const resType = type[0] ? mapToResourceType(type[0]) : undefined;
    const navigate = useNavigate();

    function direct() {
        window.open(`/result/${id}`, `_blank`);
    }

    const hoverStyle: SystemStyleObject = {
        cursor: "pointer",
        backgroundColor: "var(--primary-primary-transparent-background)"
    };

    if (resType) {
        return (
            <Box className="relatedContentEntry" _hover={hoverStyle} onClick={direct}>
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
                        <div>
                            {title[0].substring(0, 99)}
                            {title[0].length > 100 ? "..." : ""}
                        </div>
                    ) : null}
                </Box>
                {id ? (
                    <Flex className="relatedContentLink" rel="noreferrer">
                        <Button className="relatedContentButton">
                            <span className="relatedContentLabel">Visit {resType}</span>
                        </Button>
                    </Flex>
                ) : null}
            </Box>
        );
    } else {
        return null;
    }
};
