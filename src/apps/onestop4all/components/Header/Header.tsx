import { Box, Hide, HStack } from "@open-pioneer/chakra-integration";

import { BorderColor } from "../../Theme";
import { LanguageToggler } from "./LanguageToggler";
import { Login } from "./Login";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";
import { UserSupportLink } from "./UserSupportLink";

export const Header = () => {
    return (
        <HStack
            gap="20px"
            margin="6px 0px"
            padding="36px 0px"
            borderBottom="1px solid"
            borderBottomColor={BorderColor}
        >
            <Box>
                <Logo />
            </Box>
            <Box w="100%"></Box>
            <Hide below="custombreak">
                <UserSupportLink></UserSupportLink>
            </Hide>
            <Hide below="custombreak">
                <Login></Login>
            </Hide>
            <LanguageToggler></LanguageToggler>
            <MenuButton></MenuButton>
        </HStack>
    );
};
