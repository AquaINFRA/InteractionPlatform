import { useIntl } from "open-pioneer:react-hooks";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

import { Box, Button, HStack, IconButton, Input, Select } from "@open-pioneer/chakra-integration";

import { BorderColor, PrimaryColor } from "../Theme";
import {
    SelectableDataProvider,
    UrlSearchParameterType,
    UrlSearchParams,
    useSearchState
} from "../views/Search/SearchState";
import { DropdownArrowIcon, SearchIcon } from "./Icons";
import { DataProvider } from "../views/Search/Facets/DataProviderFacet/DataProviderFacet";

export function SearchBar() {
    const searchSrvc = useService("onestop4all.SearchService");
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
        console.log(provider);
        console.log(selectedProvider);
        if (selectedProvider === "") {
            searchState.setSelectedDataProvider([]);
        } else {
            searchState.setSelectedDataProvider([selectedProvider]);
        }
        if (!location.pathname.endsWith("search")) {
            const params: UrlSearchParams = {};
            params[UrlSearchParameterType.Searchterm] = searchTerm;
            if (!selectedProvider) {
                searchState.setSelectedDataProvider([]);
            }
            navigate({
                pathname: "/search",
                search: `?${createSearchParams({ ...params })}`
            });
        }
    }

    function addProvider(p: any) {
        setSelectProvider(p);
        const pr = provider.find((e) => e.id === p) as any;
        console.log(pr);
        if (pr) {
            searchState.setSelectedDataProvider([pr.id]);
        }
    }

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
            <HStack padding={{ base: "5px 10px", custombreak: "8px 15px" }} w="100%" bg="white">
                <Select
                    icon={<DropdownArrowIcon />}
                    iconSize="12"
                    variant="unstyled"
                    textTransform="uppercase"
                    color={PrimaryColor}
                    placeholder="Select provider"
                    borderColor="white"
                    flex={{ base: "0 0 100px", custombreak: "0 0 250px" }}
                    value={selectedProvider}
                    onChange={(event) => addProvider(event.target.value)}
                    _hover={{ cursor: "pointer" }}
                >
                    {createResourceTypeSelectOptions()}
                </Select>
                <Box flex="0 0 1px" bgColor={BorderColor} alignSelf="stretch" />
                <Input
                    placeholder={intl.formatMessage({ id: "search.search-bar.placeholder" })}
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
                    <Box>{intl.formatMessage({ id: "search.search-bar.button-label" })}</Box>
                </Button>
                <IconButton
                    aria-label="start search"
                    size="sm"
                    hideFrom="custombreak"
                    onClick={() => startSearch()}
                    icon={<SearchIcon />}
                />
            </HStack>
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
