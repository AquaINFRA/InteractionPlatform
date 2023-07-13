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

export function SortedBySelector() {
    const [currentPageSize, setCurrentPageSize] = useState("Relevance");
    const pageOptions = ["Relevance", "Date"];

    return (
        <Box fontSize="12px">
            <Menu>
                <MenuButton as={Box} whiteSpace="nowrap">
                    <Flex alignItems="center" gap="4px">
                        <Box>SORTED BY:</Box>
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
                            {e}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Box>
    );
}
