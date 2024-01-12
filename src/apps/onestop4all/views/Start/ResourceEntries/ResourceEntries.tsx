import { Box, Flex } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";

import { ResourceEntry, ResourceEntryProps } from "../ResourceEntry/ResourceEntry";

export const ResourceEntries = () => {
    const searchSrvc = useService("onestop4all.SearchService");

    const [resources, setResources] = useState<ResourceEntryProps[]>([]);

    useEffect(() => {
        /*searchSrvc.doSearch({ pageSize: 0 }).then((res) => {
            const entries: ResourceEntryProps[] = res.facets.resourceType
                .map((r) => ({
                    resourceType: r.resourceType,
                    resultCount: r.count
                }))
                .sort((a, b) => a.resourceType.localeCompare(b.resourceType));
            setResources(entries);
        });*/
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Flex justifyContent="space-between">
            {resources.map((e, i) => (
                <Box key={i}>
                    <ResourceEntry {...e}></ResourceEntry>
                </Box>
            ))}
        </Flex>
    );
};
