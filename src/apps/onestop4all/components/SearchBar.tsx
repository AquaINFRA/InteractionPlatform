import { useIntl } from "open-pioneer:react-hooks";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Input,
    Select
} from "@open-pioneer/chakra-integration";

import { BorderColor, PrimaryColor } from "../Theme";
import {
    SelectableDataProvider,
    UrlSearchParameterType,
    UrlSearchParams,
    useSearchState
} from "../views/Search/SearchState";
import { DropdownArrowIcon, SearchIcon } from "./Icons";
import { DataProvider } from "../views/Search/Facets/DataProviderFacet/DataProviderFacet";
import { SearchService } from "../services";

export function SearchBar() {
    const searchSrvc = useService("onestop4all.SearchService") as SearchService;
    const [searchTerm, setSearchTerm] = useState<string>("");
    const intl = useIntl();
    //const resourceTypes = Object.values(ResourceType).sort((a, b) => a.localeCompare(b));
    const searchState = useSearchState();
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedProvider, setSelectProvider] = useState("");
    const [provider, setProvider] = useState<SelectableDataProvider[]>([]);

    useEffect(() => {
        searchSrvc.getDataProvider().then((res) => {
            setProvider(
                JSON.parse(res).collections.sort((a: DataProvider, b: DataProvider) =>
                    a.title.toLocaleUpperCase().localeCompare(b.title.toLocaleUpperCase())
                )
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => setSearchTerm(searchState.searchTerm), [searchState.searchTerm]);

    function startSearch(): void {
        searchState.setSearchTerm(searchTerm);
        if (selectedProvider === "") {
            searchState.setSelectedDataProvider([...searchState.selectedDataProvider]);
        } else {
            if (!searchState.selectedDataProvider.includes(selectedProvider)) {
                searchState.setSelectedDataProvider([
                    ...searchState.selectedDataProvider,
                    selectedProvider
                ]);
            }
        }
        if (!location.pathname.endsWith("search")) {
            const params: UrlSearchParams = {};
            params[UrlSearchParameterType.Searchterm] = searchTerm;
            if (!selectedProvider) {
                searchState.setSelectedDataProvider([...searchState.selectedDataProvider]);
            }
            navigate({
                pathname: "/search",
                search: `?${createSearchParams({ ...params })}`
            });
        }
    }

    /*function addProvider(p: any) {
        console.log("add provider");
        setSelectProvider(p);
        const pr = provider.find((e) => e.id === p) as any;
        console.log(
            pr,
            searchState.selectedDataProvider,
            searchState.selectedDataProvider.includes(pr.id),
            pr.id
        );
        if (pr && !searchState.selectedDataProvider.includes(pr.id)) {
            searchState.setSelectedDataProvider([...searchState.selectedDataProvider, pr.id]);
        }
    }*/

    function handleKeyDown(key: string): void {
        if (key === "Enter") {
            startSearch();
        }
    }

    return (
        <Box
            borderWidth={{ base: "10px", custombreak: "15px" }}
            borderColor="rgb(5, 102, 141, 0.7)"
        >
            <div id="searchbar">
                <HStack padding={{ base: "5px 10px", custombreak: "8px 15px" }} w="100%" bg="white">
                    <Input
                        placeholder="Search for research data"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event.key)}
                        borderColor="white"
                    />
                    <Button
                        leftIcon={<SearchIcon boxSize={6} />}
                        variant="solid"
                        hideBelow="custombreak"
                        onClick={() => startSearch()}
                    >
                        {intl.formatMessage({ id: "search.search-bar.button-label" })}
                    </Button>
                    <IconButton
                        aria-label="start search"
                        size="sm"
                        hideFrom="custombreak"
                        onClick={() => startSearch()}
                        icon={<SearchIcon />}
                    />
                </HStack>
            </div>
            <div id="searchbarResponsive">
                <Flex bg="white" direction={"column"}>
                    <Select
                        icon={<DropdownArrowIcon />}
                        iconSize="12"
                        variant="unstyled"
                        textTransform="uppercase"
                        color={PrimaryColor}
                        placeholder="Select data provider"
                        borderColor="white"
                        //flex={{ base: "0 0 1rem" }}
                        value={selectedProvider}
                        onChange={(event) => setSelectProvider(event.target.value)}
                        _hover={{ cursor: "pointer" }}
                        margin={"2% 0% 0% 3%"}
                        w={"max-content"}
                        maxWidth={"250px"}
                    >
                        {createResourceTypeSelectOptions()}
                    </Select>
                    <Flex alignItems="center">
                        <Input
                            placeholder="Search for research data"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            onKeyDown={(event) => handleKeyDown(event.key)}
                            //borderColor="white"
                            margin={"2% 2% 2% 2%"}
                            outline={"1px solid #05668d"}
                        />
                        <Button
                            leftIcon={<SearchIcon boxSize={6} />}
                            variant="solid"
                            hideBelow="custombreak"
                            onClick={() => startSearch()}
                        >
                            <Box>
                                {intl.formatMessage({ id: "search.search-bar.button-label" })}
                            </Box>
                        </Button>
                        <IconButton
                            aria-label="start search"
                            size="sm"
                            hideFrom="custombreak"
                            onClick={() => startSearch()}
                            icon={<SearchIcon />}
                            marginRight={"1%"}
                        />
                    </Flex>
                </Flex>
            </div>
        </Box>
    );

    function createResourceTypeSelectOptions() {
        return provider.map((e, i) => (
            <option value={e.id} key={i}>
                {e.title}
            </option>
        ));
    }
}
