import { Box, Flex, Hide, HStack } from "@open-pioneer/chakra-integration";
import { useNavigate } from "react-router-dom";
import { useIntl } from "open-pioneer:react-hooks";

import { BorderColor } from "../../Theme";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";
import { Feedback } from "./Feedback";

export const Header = () => {
    const intl = useIntl();
    const navigate = useNavigate();

    const backToStart = () => {
        navigate("/");
    };

    return (
        <Flex alignItems="center" justifyContent="space-between" margin="6px 0px" padding="36px 0px" borderBottom="1px solid" borderBottomColor={BorderColor}>
            <Box _hover={{ cursor: "pointer" }} onClick={backToStart}>
                <Logo />
            </Box>
            <Flex alignItems="center">
                <Box id="feedback1" marginRight="50px">
                    <Feedback fontSize="16pt" />
                </Box>
                <Hide below="custombreak" />
                <MenuButton />
            </Flex>
        </Flex>
    );
};
