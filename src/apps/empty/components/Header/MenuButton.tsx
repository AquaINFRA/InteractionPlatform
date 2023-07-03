import { HStack, IconButton } from "@open-pioneer/chakra-integration";

import { MenuIcon } from "../Icons";
import { useService } from "open-pioneer:react-hooks";

export function MenuButton() {
    const menuHandler = useService("empty.MenuHandler");

    return (
        <HStack>
            <IconButton
                aria-label="Search database"
                variant="ghost"
                colorScheme="teal"
                icon={<MenuIcon boxSize={12} />}
                onClick={() => menuHandler.open()}
            />
        </HStack>
    );
}
