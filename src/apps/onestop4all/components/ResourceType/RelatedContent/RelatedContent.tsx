import { Box, Flex, Divider } from "@open-pioneer/chakra-integration";
import { RelatedContentEntry } from "./RelatedContentEntry";

export const RelatedContent = (props: { relatedContentItems: object }) => {
    const relatedContentItemsList = Object.values(props.relatedContentItems);
    const moreRelatedItems = relatedContentItemsList.length - 4; //-4 because the number of related contents is limited to 4
    return (
        <Box>
            <Flex alignItems="center" gap="40px" display="flex">
                <Box className="relatedContentHeader">Related Contents</Box>
                {moreRelatedItems > 0 ? (
                    <Box className="moreRelatedItems">
                        + {moreRelatedItems} More related {moreRelatedItems > 1 ? "items" : "item"}
                    </Box>
                ) : (
                    <></>
                )}
            </Flex>
            <Flex gap="30px" pt="19px">
                {relatedContentItemsList.slice(0, 4).map((e, i) => (
                    <Flex key={i} gap="30px" flex="1 1 0px">
                        <Divider className="relatedContentLine" orientation="vertical" />
                        <RelatedContentEntry {...e} />
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};
