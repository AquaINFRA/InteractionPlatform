import { Box, Flex, Divider } from "@open-pioneer/chakra-integration";
import { StandardIcon, BackIcon } from "../../Icons";

export function ResourceTypeHeader(props: { resType: string }) {
    const resourceType = props.resType;
    //const resourceIcon = "/" + resourceType + ".png";
    return (
        <Flex>
            <Box>
                <a href="/search?">
                    <BackIcon />
                </a>
            </Box>

            <Box className="back">
                <a href="/search">
                    <span className="to">Back&nbsp;</span>
                    <span className="resultList">to result list</span>
                </a>
            </Box>

            <Divider className="inbetweenLine" />

            <Flex className="resourceType" gap="10px">
                {resourceType}
                <StandardIcon />
            </Flex>
        </Flex>
    );
}
