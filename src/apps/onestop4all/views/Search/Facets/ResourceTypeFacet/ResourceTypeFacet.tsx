import { Box } from "@open-pioneer/chakra-integration";
import { useEffect, useState } from "react";

import { ResourceType } from "../../../Start/ResourceEntry/ResourceEntry";
import { SelectableResourceType, useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";
import { FacetCheckbox } from "../FacetBase/FacetCheckbox";

export function ResourceTypeFacet() {
    const searchState = useSearchState();
    const [entries, setEntries] = useState<SelectableResourceType[]>([]);

    useEffect(() => {
        if (searchState.selectableResourceTypes) {
            setEntries(searchState.selectableResourceTypes);
        }
    }, [searchState.selectableResourceTypes]);

    function resourceTypeToggled(checked: boolean, resourceType: ResourceType) {
        if (checked) {
            searchState.setSelectedResourceTypes([
                ...searchState.selectedResoureTypes,
                resourceType
            ]);
        } else {
            searchState.setSelectedResourceTypes(
                searchState.selectedResoureTypes.filter((e) => e !== resourceType)
            );
        }
    }

    return (
        <Box>
            <FacetBase title="Resource Type" expanded>
                {entries.map((entry, i) => {
                    return (
                        <Box key={i} padding="4px 0px">
                            <FacetCheckbox
                                label={entry.resourceType}
                                count={entry.count}
                                isChecked={entry.selected}
                                onChange={(event) =>
                                    resourceTypeToggled(event.target.checked, entry.resourceType)
                                }
                            ></FacetCheckbox>
                        </Box>
                    );
                })}
            </FacetBase>
        </Box>
    );
}
