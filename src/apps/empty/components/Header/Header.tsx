import { Box, HStack } from "@open-pioneer/chakra-integration";

import { LanguageToggler } from "./LanguageToggler";
import { Login } from "./Login";
import { Logo } from "./Logo";
import { UserSupportLink } from "./UserSupportLink";

export const Header = () => {
    return (
        <HStack gap="20px" margin="42px 0px">
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
