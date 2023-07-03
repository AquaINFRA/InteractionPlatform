import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerOverlay,
    HStack,
    IconButton,
    Spacer,
    useDisclosure
} from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { useEffect } from "react";

import { MenuCloseIcon } from "./Icons";

export function NavigationMenu() {
    // const intl = useIntl();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const menuHandler = useService("empty.MenuHandler");

    useEffect(() => {
        const handle = menuHandler.on("open-menu", (val) => {
            console.log(val);
            onOpen();
        });
        return () => handle.destroy();
    });

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay bg={"var(--chakra-colors-blackAlpha-200)"} />
            <DrawerContent>
                <HStack padding={"52px"}>
                    <Spacer></Spacer>
                    <IconButton
                        aria-label="Search database"
                        variant="ghost"
                        colorScheme="teal"
                        icon={<MenuCloseIcon boxSize={8} />}
                        onClick={onClose}
                    />
                </HStack>

                <DrawerBody></DrawerBody>

                <DrawerFooter></DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
