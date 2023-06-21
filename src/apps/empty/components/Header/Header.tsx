import { Box, HStack } from "@open-pioneer/chakra-integration";

import { BorderColor } from "../../Theme";
import { LanguageToggler } from "./LanguageToggler";
import { Login } from "./Login";
import { Logo } from "./Logo";
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
            <UserSupportLink></UserSupportLink>
            <Login></Login>
            <LanguageToggler></LanguageToggler>
            <div>MenuToggler</div>
        </HStack>
    );
};
