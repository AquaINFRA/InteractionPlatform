import { Box, Button, HStack, IconButton, Input, Select } from "@open-pioneer/chakra-integration";
import { useIntl } from "open-pioneer:react-hooks";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import { SearchParameterType, SearchParams } from "../services/SearchService";
import { BorderColor, PrimaryColor } from "../Theme";
import { ResourceType } from "../views/Start/ResourceEntry/ResourceEntry";
import { DropdownArrowIcon, SearchIcon } from "./Icons";

export interface SearchBarProps {
    searchTerm?: string | null;
}

export function SearchBar(props: SearchBarProps) {
    const [searchTerm, setSearchTerm] = useState(props.searchTerm || "");
    const [selectedResource, setSelectResource] = useState("");

    const intl = useIntl();
    const navigate = useNavigate();
    const resourceTypes = Object.values(ResourceType);

    function startSearch(): void {
        console.log(searchTerm);
        const params: SearchParams = {};

        if (searchTerm) {
            params[SearchParameterType.Searchterm] = searchTerm;
        }
        if (selectedResource) {
            params[SearchParameterType.ResourceType] = selectedResource;
        }

        navigate({
            pathname: "/search",
            search: `?${createSearchParams({ ...params })}`
        });
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
                    placeholder="All resources"
                    borderColor="white"
                    flex={{ base: "0 0 100px", custombreak: "0 0 250px" }}
                    value={selectedResource}
                    onChange={(event) => setSelectResource(event.target.value)}
                >
                    {createResourceTypeSelectOptions()}
                </Select>
                <Box flex="0 0 1px" bgColor={BorderColor} alignSelf="stretch" />
                <Input
                    placeholder={intl.formatMessage({ id: "search.search-bar.placeholder" })}
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
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
        return resourceTypes.map((e, i) => (
            <option value={e} key={i}>
                {e}
            </option>
        ));
    }
}
