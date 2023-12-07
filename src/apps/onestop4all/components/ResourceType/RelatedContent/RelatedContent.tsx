/* eslint-disable */
import { Box, Flex, Divider } from "@open-pioneer/chakra-integration";
import { SimpleGrid } from "@chakra-ui/react";

import { RelatedContentEntry } from "./RelatedContentEntry";

export const RelatedContent = (props: { relatedContentItems: object }) => {
    const relatedContentItemsList = Object.values(props.relatedContentItems);
    relatedContentItemsList.forEach((elem) => {
        if (!elem[0].title && elem[0].name) {
            elem[0].title = elem[0].name;
            delete elem[0].name;
        }
    });

    relatedContentItemsList.sort((a, b) => {
        const nameA = a[0].title
            ? a[0].title[0].toUpperCase()
            : a[0].name
            ? a[0].name[0].toUpperCase()
            : "";
        const nameB = b[0].title
            ? b[0].title[0].toUpperCase()
            : b[0].name
            ? b[0].name[0].toUpperCase()
            : "";
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    return (
        <Box className="relatedContentSection">
            <Flex alignItems="center" gap="40px" display="flex">
                <Box className="relatedContentSectionHeader">Related Content</Box>
            </Flex>
            <SimpleGrid columns={4} spacing={10} width={"90%"}>
                {relatedContentItemsList.slice(0, 8).map((e, i) =>
                    e[0].title || e[0].type || e[0].id ? (
                        <Flex key={i}>
                            <Divider className="relatedContentLine" orientation="vertical" />
                            <RelatedContentEntry {...e[0]} />
                        </Flex>
                    ) : null
                )}
            </SimpleGrid>
        </Box>
    );
};
