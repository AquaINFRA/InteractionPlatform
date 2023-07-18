import { Box } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SelecteableResourceType } from "../../../../services/SearchService";
import { ResourceType } from "../../../Start/ResourceEntry/ResourceEntry";
import { FacetBase } from "../FacetBase/FacetBase";
import { FacetCheckbox } from "../FacetBase/FacetCheckbox";

export function ResourceTypeFacet() {
    const searchSrv = useService("onestop4all.SearchService");
    const navigate = useNavigate();

    const [entries] = useState<SelecteableResourceType[]>(searchSrv.getSelecteableResourceTypes());

    function resourceTypeToggled(checked: boolean, resourceType: ResourceType) {
        if (checked) {
            searchSrv.addResourceType(resourceType);
        } else {
            searchSrv.removeResourceType(resourceType);
        }
        searchSrv.navigateToCurrentSearch(navigate);
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
                                defaultChecked={entry.selected}
                                onChange={(event) =>
                                    resourceTypeToggled(event.target.checked, entry.resourceType)
                                }
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
