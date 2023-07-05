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

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
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
                    <div className="initial-block">
                        <UserSupportLink></UserSupportLink>
                        <Login></Login>
                        <LanguageToggler></LanguageToggler>
                    </div>
                </Hide>
                <div className="seperator"></div>
                <Box className="block">
                    <div className="block-header">Get Connected</div>
                    <div className="block-content">
                        <Link>About us</Link>
                        <Link>Partners</Link>
                        <Link>Contact</Link>
                    </div>
                </Box>
                <div className="seperator"></div>
                <Box className="block">
                    <div className="block-header">Support</div>
                    <div className="block-content">
                        <Link>User Support</Link>
                    </div>
                </Box>
                <div className="seperator"></div>
                <Box className="block">
                    <div className="block-header">Legal information</div>
                    <div className="block-content">
                        <Link>Legal information</Link>
                        <Link>Privacy</Link>
                    </div>
                </Box>
                <div className="seperator"></div>
            </DrawerContent>
        </Drawer>
    );
}
