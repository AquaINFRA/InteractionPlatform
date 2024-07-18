import { Box, Button, Flex } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { SelectableDataProvider, useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";
import { FacetCheckbox } from "../FacetBase/FacetCheckbox";
import { SearchService } from "../../../../services";

export interface DataProvider {
    title: string;
}

export function DataProviderFacet() {
    const searchState = useSearchState();
    const [entries, setEntries] = useState<SelectableDataProvider[]>([]);
    const [allSelected, setAllSelected] = useState(true); // Default to all selected
    const searchSrvc = useService("onestop4all.SearchService") as SearchService;

    useEffect(() => {
        searchSrvc.getDataProvider().then((res) => {
            if (res) {
                const sortedEntries = JSON.parse(res).collections.sort(
                    (a: DataProvider, b: DataProvider) =>
                        a.title.toLocaleUpperCase().localeCompare(b.title.toLocaleUpperCase())
                );
                const filteredEntries = sortedEntries.filter((entry: any) => entry.id !== "dataeurope");
                setEntries(filteredEntries);

                const ids = filteredEntries.map((entry: any) => entry.id);
                searchState.setSelectedDataProvider(ids);
                setAllSelected(true);

                const providerTitles = filteredEntries.map((se: any) => {
                    return { title: se.title, id: se.id, description: se.description };
                });
                searchState.setDataProviderTitles(providerTitles);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function dataProviderToggled(checked: boolean, entry: any) {
        if (checked) {
            searchState.setSelectedDataProvider([...searchState.selectedDataProvider, entry.id]);
        } else {
            searchState.setSelectedDataProvider(
                searchState.selectedDataProvider.filter((e: any) => e !== entry.id)
            );
        }
    }

    function changeAllSelection() {
        if (allSelected) {
            searchState.setSelectedDataProvider([]);
            setAllSelected(false);
        } else {
            const dataProviderIds = entries.map(obj => obj.id);
            searchState.setSelectedDataProvider(dataProviderIds);
            setAllSelected(true);
        }
    }

    return (
        <FacetBase title="Data provider" expanded>
            <SimpleGrid columns={[1, 2]} spacing={3} marginTop={"1%"}>
                {entries.map((entry: any, i) =>
                    entry.id !== "dataeurope" ? (
                        <Flex key={i}>
                            <FacetCheckbox
                                label={entry.title}
                                description={entry.description}
                                isChecked={searchState.selectedDataProvider.includes(entry.id)}
                                onChange={(event) =>
                                    dataProviderToggled(event.target.checked, entry)
                                }
                            />
                        </Flex>
                    ) : null
                )}
            </SimpleGrid>
            <Box pt={5}>
                <Button w={"100%"} onClick={changeAllSelection}>
                    {allSelected ? "Uncheck all data providers" : "Select all data providers"}
                </Button>
            </Box>
        </FacetBase>
    );
}
