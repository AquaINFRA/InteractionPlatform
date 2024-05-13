import { HStack, IconButton } from "@open-pioneer/chakra-integration";

import { MenuIcon } from "../Icons";
import { useService } from "open-pioneer:react-hooks";

export function MenuButton() {
    const menuHandler = useService("onestop4all.MenuHandler");

    return (
        <HStack>
            <IconButton
                aria-label="Search database"
                variant="ghost"
                colorScheme="teal"
                icon={<MenuIcon boxSize={14} />}
                onClick={() => menuHandler.open()}
            />
        </HStack>
    );
}
