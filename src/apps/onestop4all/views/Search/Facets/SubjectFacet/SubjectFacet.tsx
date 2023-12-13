import { Box } from "@open-pioneer/chakra-integration";
import { useEffect, useState } from "react";

import { SelectableSubject, useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";
import { SubjectTreeEntry } from "./SubjectTreeEntry";

export function SubjectFacet() {
    const searchState = useSearchState();
    const [entries, setEntries] = useState<SelectableSubject[]>([]);

    useEffect(() => {
        if (searchState.selectableSubjects) {
            setEntries(
                searchState.selectableSubjects.sort((a, b) =>
                    a.label.toLocaleUpperCase().localeCompare(b.label.toLocaleUpperCase())
                )
            );
        }
    }, [searchState.selectableSubjects]);

    return (
        <Box>
            <FacetBase title="Subject" expanded={true}>
                {entries.map((entry, i) => (
                    <Box key={i} padding="4px 0px">
                        <SubjectTreeEntry entry={entry}></SubjectTreeEntry>
                    </Box>
                ))}
            </FacetBase>
        </Box>
    );
}
