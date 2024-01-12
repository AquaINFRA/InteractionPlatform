import { Box, Flex } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";

import { SimpleGrid } from "@chakra-ui/react";

import { SelectableDataProvider, useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";
import { FacetCheckbox } from "../FacetBase/FacetCheckbox";

export function DataProviderFacet() {
    const searchState = useSearchState();
    console.log(searchState.selectedDataProvider);
    const [entries, setEntries] = useState<SelectableDataProvider[]>([]);
    const searchSrvc = useService("onestop4all.SearchService");

    useEffect(() => {
        searchSrvc.getDataProvider().then((res) => {
            setEntries(JSON.parse(res).collections);
            console.log(entries);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function dataProviderToggled(checked: boolean, id: string) {
        console.log(searchState.selectedDataProvider);
        if (checked) {
            searchState.setSelectedDataProvider([...searchState.selectedDataProvider, id]);
        } else {
            searchState.setSelectedDataProvider(
                searchState.selectedDataProvider.filter((e) => e !== id)
            );
        }
    }

    return (
        <FacetBase title="Data provider" expanded>
            <SimpleGrid column={3} spacing={2}>
                {entries.map((entry, i) => (
                    <Flex key={i}>
                        <FacetCheckbox
                            label={entry.title}
                            isChecked={entry.selected}
                            onChange={(event) =>
                                dataProviderToggled(event.target.checked, entry.id)
                            }
                        />
                    </Flex>
                ))}
            </SimpleGrid>
        </FacetBase>
    );
}
