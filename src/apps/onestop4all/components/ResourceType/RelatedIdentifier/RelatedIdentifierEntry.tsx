import { Box, Button, Flex, SystemStyleObject } from "@open-pioneer/chakra-integration";

import { ResourceIcon } from "../../../views/Start/ResourceEntry/ResourceIcons";
import { RelatedIdentifier } from "../../../views/Zenodo/Zenodo";
import { mapToResourceType, ResourceType } from "../../../services/ResourceTypeUtils";
import { InfoIcon } from "@chakra-ui/icons";

export const RelatedContentEntry = (props: RelatedIdentifier) => {
    const item = props;

    function direct() {
        window.open(item.identifier, `_blank`);
    }

    const hoverStyle: SystemStyleObject = {
        cursor: "pointer",
        backgroundColor: "var(--primary-primary-transparent-background)"
    };

    return (
        <Box className="relatedContentEntry" _hover={hoverStyle} onClick={direct}>
            {/*<Flex className="relatedContentResource-entry" alignItems="center" gap={2}>
                <Box className="relatedContentOverlap">
                    <div className="relatedContentCircle-group"></div>
                    <div className="relatedContentIcon-base"></div>
                    <div className="relatedContentIcon">
                        <InfoIcon />
                    </div>
                </Box>
                <Box className="relatedContentResourceType">
                    {item.resource_type}
                </Box>
            </Flex>*/}
            <Box className="relatedContentTitle">
                {item.relation}
            </Box>
            <Flex className="relatedContentLink" rel="noreferrer">
                <Button className="relatedContentButton">
                    <span className="relatedContentLabel">
                        {item.resource_type}
                    </span>
                </Button>
            </Flex>
        </Box>
    );
};
