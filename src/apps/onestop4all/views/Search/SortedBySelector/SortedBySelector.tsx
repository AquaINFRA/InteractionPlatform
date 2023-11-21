import {
    Box,
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList
} from "@open-pioneer/chakra-integration";
import { useEffect, useState } from "react";

import { DropdownArrowIcon } from "../../../components/Icons";
import { PrimaryColor } from "../../../Theme";
import { SortOption, SortOptions, useSearchState } from "../SearchState";

export function SortedBySelector() {
    const [currentSorting, setCurrentSorting] = useState<SortOption>();
    const searchState = useSearchState();

    useEffect(() => {
        if (searchState.sorting) {
            setCurrentSorting(searchState.sorting);
        }
    }, [searchState.sorting]);

    function changeSorting(sort: SortOption): void {
        searchState.setSorting(sort);
        setCurrentSorting(sort);
    }

    return (
        <Box fontSize="12px">
            <Menu>
                <MenuButton as={Box} whiteSpace="nowrap">
                    <Flex alignItems="center" gap="4px">
                        <Box>SORTED BY:</Box>
                        <Box color={PrimaryColor} fontWeight="700">
                            {currentSorting?.label}
                        </Box>
                        <Icon boxSize="3" color={PrimaryColor}>
                            <DropdownArrowIcon />
                        </Icon>
                    </Flex>
                </MenuButton>
                <MenuList>
                    {SortOptions.map((e, i) => (
                        <MenuItem key={i} onClick={() => changeSorting(e)}>
                            {e.label}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Box>
    );
}
