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
import { useSearchState } from "../SearchState";

export function ResultCountSelector() {
    const [currentPageSize, setCurrentPageSize] = useState(20);
    const searchState = useSearchState();
    const pageOptions = [20, 50, 100];

    useEffect(() => setCurrentPageSize(searchState.pageSize), [searchState.pageSize]);

    return (
        <Box fontSize="12px">
            <Menu>
                <MenuButton as={Box} whiteSpace="nowrap">
                    <Flex alignItems="center" gap="4px">
                        <Box hideBelow="custombreak">RESULTS PER PAGE:</Box>
                        <Box hideFrom="custombreak">RESULTS:</Box>
                        <Box color={PrimaryColor} fontWeight="700">
                            {currentPageSize}
                        </Box>
                        <Icon boxSize="3" color={PrimaryColor}>
                            <DropdownArrowIcon />
                        </Icon>
                    </Flex>
                </MenuButton>
                <MenuList>
                    {pageOptions.map((e, i) => (
                        <MenuItem key={i} onClick={() => searchState.setPageSize(e)}>
                            {e} Results
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Box>
    );
}
