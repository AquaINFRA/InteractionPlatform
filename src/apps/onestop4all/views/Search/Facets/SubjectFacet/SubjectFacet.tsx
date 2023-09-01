import { Box } from "@open-pioneer/chakra-integration";
import { useEffect, useState } from "react";

import { SelectableSubjects, useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";
import { FacetCheckbox } from "../FacetBase/FacetCheckbox";

export function SubjectFacet() {
    const searchState = useSearchState();
    const [entries, setEntries] = useState<SelectableSubjects[]>([]);

    useEffect(() => {
        if (searchState.selectableSubjects) {
            setEntries(
                searchState.selectableSubjects.sort((a, b) =>
                    a.label.toLocaleUpperCase().localeCompare(b.label.toLocaleUpperCase())
                )
            );
        }
    }, [searchState.selectableSubjects]);

    function subjectToggled(checked: boolean, subject: string) {
        if (checked) {
            searchState.setSelectedSubjects([...searchState.selectedSubjects, subject]);
        } else {
            searchState.setSelectedSubjects(
                searchState.selectedSubjects.filter((e) => e !== subject)
            );
        }
    }

    return (
        <Box>
            <FacetBase title="Subject" expanded={false}>
                {entries.map((entry, i) => {
                    return (
                        <Box key={i} padding="4px 0px">
                            <FacetCheckbox
                                label={entry.label}
                                count={entry.count}
                                isChecked={entry.selected}
                                onChange={(event) =>
                                    subjectToggled(event.target.checked, entry.label)
                                }
                            ></FacetCheckbox>
                        </Box>
                    );
                })}
            </FacetBase>
        </Box>
    );
}
