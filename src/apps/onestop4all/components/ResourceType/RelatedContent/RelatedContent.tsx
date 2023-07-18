import { Box, Flex, Divider } from "@open-pioneer/chakra-integration";
import { RelatedContentEntry } from "./RelatedContentEntry";

export const RelatedContent = (props: { relatedContentItems: object }) => {
    const relatedContentItemsList = Object.values(props.relatedContentItems);
    const moreRelatedItems = relatedContentItemsList.length - 4; //-4 because the number of related contents is limited to 4
    return (
        <Box className="relatedContentSection">
            <Flex alignItems="center" gap="40px" display="flex">
                <Box className="relatedContentSectionHeader">Related Contents</Box>
                {moreRelatedItems > 0 ? (
                    <Box className="moreRelatedItems">
                        + {moreRelatedItems} More related {moreRelatedItems > 1 ? "items" : "item"}
                    </Box>
                ) : (
                    <></>
                )}
            </Flex>
            <Box className="relatedContentEntries">
                <Flex gap="30px">
                    {relatedContentItemsList.slice(0, 4).map((e, i) => (
                        <Flex key={i}>
                            <Divider className="relatedContentLine" orientation="vertical" />
                            <RelatedContentEntry {...e} />
                        </Flex>
                    ))}
                </Flex>
            </Box>
        </Box>
    );
};
