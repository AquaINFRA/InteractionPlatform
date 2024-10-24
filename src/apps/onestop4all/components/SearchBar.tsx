import { useIntl } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Input
} from "@open-pioneer/chakra-integration";

import {
    UrlSearchParameterType,
    UrlSearchParams,
    useSearchState
} from "../views/Search/SearchState";
import { SearchIcon } from "./Icons";

export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const intl = useIntl();
    const searchState = useSearchState();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => setSearchTerm(searchState.searchTerm), [searchState.searchTerm]);

    function startSearch(): void {
        searchState.setSearchTerm(searchTerm);
        if (!location.pathname.endsWith("search")) {
            const params: UrlSearchParams = {};
            params[UrlSearchParameterType.Searchterm] = searchTerm;
            navigate({
                pathname: "/search",
                search: `?${createSearchParams({ ...params })}`
            });
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
                    <Flex alignItems="center">
                        <Input
                            placeholder="Search for research data"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            onKeyDown={(event) => handleKeyDown(event.key)}
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
}
