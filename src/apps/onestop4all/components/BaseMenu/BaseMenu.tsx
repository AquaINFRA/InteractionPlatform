import {
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    HStack,
    IconButton,
    Link,
    Spacer,
    useDisclosure
} from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { ReactNode, useEffect } from "react";

import { MenuCloseIcon } from "../Icons";
import { MenuHandler } from "../../services";

export function BaseMenu() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const menuHandler = useService("onestop4all.MenuHandler") as MenuHandler;

    useEffect(() => {
        const openMenuListener = menuHandler.on("open-menu", () => onOpen());
        return () => openMenuListener.destroy();
    });

    function createBlock(header: string, children: ReactNode): ReactNode {
        return (
            <Box
                className="block"
                padding={{ base: "30px 20px 10px 20px;", custombreak: "10px 10px 0.px" }}
            >
                <Box
                    className="block-header"
                    fontSize={{ base: "20px", custombreak: "30px" }}
                    padding={{ base: "10px 20px 10px 0px;", custombreak: "30px 0px" }}
                >
                    {header}
                </Box>
                <div className="block-content">{children}</div>
            </Box>
        );
    }

    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            size={{ base: "customMenu", custombreak: "xs" }}
        >
            <DrawerOverlay bg={"var(--chakra-colors-blackAlpha-200)"} />
            <DrawerContent className="navigation-menu">
                <HStack padding={{ base: "22px 22px 10px 0px", custombreak: "32px 52px 20px" }}>
                    <Spacer></Spacer>
                    <IconButton
                        aria-label="Search database"
                        variant="ghost"
                        colorScheme="teal"
                        icon={<MenuCloseIcon boxSize={8} />}
                        onClick={onClose}
                    />
                </HStack>
                <div className="seperator"></div>
                {createBlock(
                    "Get connected",
                    <>
                        <Link href="https://aquainfra.eu/about" target="_blank" rel="noreferrer">
                            About us
                        </Link>
                        <Link href="https://aquainfra.eu/partners" target="_blank" rel="noreferrer">
                            Partners
                        </Link>
                        <Link href="https://aquainfra.eu/contact" target="_blank" rel="noreferrer">
                            Contact
                        </Link>
                    </>
                )}
                <div className="seperator"></div>
                {createBlock(
                    "AquaINFRA Platform",
                    <>
                        <Link href="https://aquainfra.dev.52north.org/search" target="_blank" rel="noreferrer">
                            Search for research data
                        </Link>
                        <Link href="https://aqua.usegalaxy.eu/" target="_blank" rel="noreferrer">
                            AquaINFRA&#39;s Galaxy
                        </Link>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
}
