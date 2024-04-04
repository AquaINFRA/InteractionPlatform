import { Box, Hide, HStack } from "@open-pioneer/chakra-integration";
import { useNavigate } from "react-router-dom";
import { useIntl } from "open-pioneer:react-hooks";

import { BorderColor } from "../../Theme";
import { Login } from "./Login";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";

export const Header = () => {
    const intl = useIntl();
    const navigate = useNavigate();

    const backToStart = () => {
        navigate("/");
    };

    return (
        <HStack
            gap="20px"
            margin="6px 0px"
            padding="36px 0px"
            borderBottom="1px solid"
            borderBottomColor={BorderColor}
        >
            <Box _hover={{ cursor: "pointer" }} onClick={backToStart}>
                <Logo />
            </Box>
            <Box w="100%"></Box>
            <Hide below="custombreak">
                {/*<Login />*/}
            </Hide>
            <MenuButton />
        </HStack>
    );
};
