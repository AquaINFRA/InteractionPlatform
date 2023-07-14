import { Box } from "@open-pioneer/chakra-integration";

import { ResourceType } from "../../../Start/ResourceEntry/ResourceEntry";
import { FacetBase } from "../FacetBase/FacetBase";
import { FacetCheckbox } from "../FacetBase/FacetCheckbox";

export function ResourceTypeFacet() {
    const entries = [
        {
            resourceType: ResourceType.Repos,
            count: 245,
            checked: true
        },
        {
            resourceType: ResourceType.Articles,
            count: 3234,
            checked: true
        },
        {
            resourceType: ResourceType.Educational,
            count: 15,
            checked: false
        },
        {
            resourceType: ResourceType.Tools,
            count: 9,
            checked: false
        },
        {
            resourceType: ResourceType.Organisations,
            count: 12,
            checked: false
        },
        {
            resourceType: ResourceType.Services,
            count: 2,
            checked: false
        },
        {
            resourceType: ResourceType.Standards,
            count: 1,
            checked: false
        }
    ];

    return (
        <Box>
            <FacetBase title="Resource Type" expanded>
                {entries.map((entry, i) => {
                    return (
                        <Box key={i} padding="4px 0px">
                            <FacetCheckbox
                                label={entry.resourceType}
                                count={entry.count}
                                defaultChecked={entry.checked}
                                onChange={(event) => {
                                    event.target.checked &&
                                        console.log(`${entry.resourceType} is checked`);
                                }}
                            >
                                {entry.resourceType} ({entry.count})
                            </FacetCheckbox>
                        </Box>
                    );
                })}
            </FacetBase>
        </Box>
    );
}
