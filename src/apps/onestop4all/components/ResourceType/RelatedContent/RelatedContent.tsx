import { Box, Flex, Divider } from "@open-pioneer/chakra-integration";
import { RelatedContentEntry } from "./RelatedContentEntry";

export const RelatedContent = (props: { relatedContentItems: object }) => {
    const relatedContentItemsList = Object.values(props.relatedContentItems);
    return (
        <Box>
            <p className="relatedContentHeader">Related Contents</p>
            <Flex gap="30px" pt="19px">
                {relatedContentItemsList.map((e, i) => (
                    <Flex key={i} gap="30px" flex="1 1 0px">
                        <Divider className="relatedContentLine" orientation="vertical" />
                        <RelatedContentEntry {...e} />
                    </Flex>
                ))}
            </Flex>
            <Box pt="120px"></Box>
        </Box>
    );
};
