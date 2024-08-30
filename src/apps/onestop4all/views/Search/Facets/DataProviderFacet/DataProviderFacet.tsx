import { Box, Button, Flex } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import { SelectableDataProvider, useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";
import { FacetCheckbox } from "../FacetBase/FacetCheckbox";
import { SearchService } from "../../../../services";
import { useSearchParams } from "react-router-dom";

export interface DataProvider {
    title: string;
}

export interface ProviderWithResults {
    id: string;
    count: number;
}

export function DataProviderFacet() {
    const searchState = useSearchState();
    const [entries, setEntries] = useState<SelectableDataProvider[]>([]);
    const [allSelected, setAllSelected] = useState(true); // Default to all selected
    const [providerWithResults, setProviderWithResults] = useState<ProviderWithResults[]>();
    const searchSrvc = useService("onestop4all.SearchService") as SearchService;
    const [searchParams] = useSearchParams();

    useEffect(() => {
        searchSrvc.getDataProvider().then((res) => {
            if (res) {
                const sortedEntries = JSON.parse(res).collections.sort(
                    (a: DataProvider, b: DataProvider) =>
                        a.title.toLocaleUpperCase().localeCompare(b.title.toLocaleUpperCase())
                );
                let filteredEntries = sortedEntries.filter((entry: any) => entry.id !== "dataeurope");
                filteredEntries = filteredEntries.filter((entry: any) => entry.id !== "gbif");
                setEntries(filteredEntries);

                const ids = filteredEntries.map((entry: any) => entry.id);
                if(searchState.selectedDataProvider.length === 0) {
                    searchState.setSelectedDataProvider(ids);
                }
                setAllSelected(true);
                const providerTitles = filteredEntries.map((se: any) => {
                    return { title: se.title, id: se.id, description: se.description };
                });
                searchState.setDataProviderTitles(providerTitles);
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log("-----------------RENDER-------------");
        setProviderWithResults([]);
        if (searchState.selectedDataProvider.length > 0) {
            const providerWithResults: ProviderWithResults[] = [];
            const providerTitles = searchState.dataProviderTitles;
            const {searchTerm, downloadOption, spatialFilter} = searchState;
            let i = 0;
            providerTitles.length && searchState.searchTerm.trim() !== "" && providerTitles.map((elem: any, key: number) => { 
                searchSrvc.doSearch({
                    searchTerm,
                    dataProvider: [elem.id], 
                    downloadOption,
                    spatialFilter
                }).then((res) => {
                    i++;
                    if (res.count > 0) {
                        providerWithResults.push({id:elem.id, count:res.count}); 
                    };
                    if (providerTitles.length === i) {
                        console.log("Done with requesting search hits per data provider");
                        setProviderWithResults(providerWithResults);
                    }
                })
                    .catch((e: any) => {
                        console.log(e);
                        i++;
                    });
            });
        }
    }, [
        searchState.dataProviderTitles, 
        searchState.searchTerm,
        searchState.downloadOption,
        searchState.spatialFilter
    ]);

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
                                count={providerWithResults?.find(result => result.id === entry.id)?.count}                            
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
