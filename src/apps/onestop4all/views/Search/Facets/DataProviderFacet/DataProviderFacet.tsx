import { Flex } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";

import { SimpleGrid } from "@chakra-ui/react";

import { SelectableDataProvider, useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";
import { FacetCheckbox } from "../FacetBase/FacetCheckbox";

export interface DataProvider {
    title: string;
}

export function DataProviderFacet() {
    const searchState = useSearchState();
    const [entries, setEntries] = useState<SelectableDataProvider[]>([]);
    const searchSrvc = useService("onestop4all.SearchService");

    useEffect(() => {
        searchSrvc.getDataProvider().then((res) => {
            setEntries(
                JSON.parse(res).collections.sort((a: DataProvider, b: DataProvider) =>
                    a.title.toLocaleUpperCase().localeCompare(b.title.toLocaleUpperCase())
                )
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function dataProviderToggled(checked: boolean, id: string) {
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
            <SimpleGrid columns={[1, 2]} spacing={3} marginTop={"1%"}>
                {entries.map((entry, i) => (
                    <Flex key={i}>
                        <FacetCheckbox
                            label={entry.title}
                            isChecked={searchState.selectedDataProvider.includes(entry.id)}
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
