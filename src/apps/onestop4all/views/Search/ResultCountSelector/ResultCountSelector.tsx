import {
    Box,
    Flex,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList
} from "@open-pioneer/chakra-integration";
import { useState } from "react";

import { DropdownArrowIcon } from "../../../components/Icons";
import { PrimaryColor } from "../../../Theme";

export function ResultCountSelector() {
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const pageOptions = [10, 50, 100, 200, 500];

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
                        <MenuItem key={i} onClick={() => setCurrentPageSize(e)}>
                            {e} Results
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Box>
    );
}
