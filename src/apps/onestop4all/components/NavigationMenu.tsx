import {
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Hide,
    HStack,
    IconButton,
    Link,
    Spacer,
    useDisclosure
} from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { useEffect } from "react";

import { LanguageToggler } from "./Header/LanguageToggler";
import { Login } from "./Header/Login";
import { UserSupportLink } from "./Header/UserSupportLink";
import { MenuCloseIcon } from "./Icons";

export function NavigationMenu() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const menuHandler = useService("onestop4all.MenuHandler");

    useEffect(() => {
        const openMenuListener = menuHandler.on("open-menu", () => onOpen());
        return () => openMenuListener.destroy();
    });

    function createBlock(header: string, links: string[]): import("react").ReactNode {
        return (
            <Box
                className="block"
                padding={{ base: "30px 50px 30px 70px;", custombreak: "40px 70px;" }}
            >
                <Box
                    className="block-header"
                    fontSize={{ base: "24px", custombreak: "36px" }}
                    paddingBottom={{ base: "20px", custombreak: "40px" }}
                >
                    {header}
                </Box>
                <div className="block-content">
                    {links.map((link, i) => (
                        <Link key={i}>{link}</Link>
                    ))}
                </div>
            </Box>
        );
    }

    return (
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            size={{ base: "customMenu", custombreak: "md" }}
        >
            <DrawerOverlay bg={"var(--chakra-colors-blackAlpha-200)"} />
            <DrawerContent className="navigation-menu">
                <HStack padding={{ base: "52px 52px 0px", custombreak: "52px 52px 100px" }}>
                    <Spacer></Spacer>
                    <IconButton
                        aria-label="Search database"
                        variant="ghost"
                        colorScheme="teal"
                        icon={<MenuCloseIcon boxSize={8} />}
                        onClick={onClose}
                    />
                </HStack>
                <Hide above="custombreak">
                    <Box
                        className="initial-block"
                        padding={{ base: "0 70px 40px", custombreak: "0 70px 40px" }}
                        marginTop={{ base: "-20px", custombreak: "0px" }}
                        lineHeight="36px"
                    >
                        <UserSupportLink></UserSupportLink>
                        <Login></Login>
                        <LanguageToggler></LanguageToggler>
                    </Box>
                </Hide>
                <div className="seperator"></div>
                {createBlock("Get connected", ["About us", "Partners", "Contact"])}
                <div className="seperator"></div>
                {createBlock("Support", ["User Support"])}
                <div className="seperator"></div>
                {createBlock("Legal information", ["Legal information", "Privacy"])}
                <div className="seperator"></div>
            </DrawerContent>
        </Drawer>
    );
}
