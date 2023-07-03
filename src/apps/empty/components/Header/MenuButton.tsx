import { HStack, IconButton } from "@open-pioneer/chakra-integration";

import { MenuIcon } from "../Icons";

export function MenuButton() {
    return (
        <HStack>
            <IconButton
                aria-label="Search database"
                variant="ghost"
                colorScheme="teal"
                icon={<MenuIcon boxSize={12} />}
            />
        </HStack>
    );
}
