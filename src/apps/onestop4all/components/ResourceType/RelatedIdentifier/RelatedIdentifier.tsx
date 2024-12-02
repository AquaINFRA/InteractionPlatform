/* eslint-disable */
import { Box, Flex, Divider } from "@open-pioneer/chakra-integration";
import { SimpleGrid } from "@chakra-ui/react";

import { RelatedContentEntry } from "./RelatedIdentifierEntry";
import { useIntl } from "open-pioneer:react-hooks";
import { RelatedIdentifier } from "../../../views/Zenodo/Zenodo";

export const RelatedContent = (props: { relatedContentItems: RelatedIdentifier[] }) => {
    const relatedContentItemsList = Object.values(props.relatedContentItems);
    const intl = useIntl();

    /*relatedContentItemsList.forEach((elem) => {
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
    });*/

    return (
        <Box className="relatedContentSection">
            <Flex alignItems="center" gap="40px" display="flex">
                <Box className="relatedContentSectionHeader">
                    Related content
                </Box>
            </Flex>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={10} width={"100%"}>
                {relatedContentItemsList.map((e, i) =>
                    e.resource_type || e.relation || e.identifier ? (
                        <Flex key={i}>
                            <Divider className="relatedContentLine" orientation="vertical" />
                            <RelatedContentEntry {...e} />
                        </Flex>
                    ) : null
                )}
            </SimpleGrid>
        </Box>
    );
};
