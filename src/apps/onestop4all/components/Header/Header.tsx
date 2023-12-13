import { Box, Hide, HStack } from "@open-pioneer/chakra-integration";
import { useNavigate } from "react-router-dom";
import { useIntl } from "open-pioneer:react-hooks";

import { BorderColor } from "../../Theme";
import { LanguageToggler } from "./LanguageToggler";
//import { Login } from "./Login";
import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";
import { UserSupportLink } from "./UserSupportLink";

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
            <Box w="100%">
                <div style={{ textAlign: "center", fontSize: "16pt" }}>
                    {intl.formatMessage({
                        id: "header.feedback"
                    })}
                    &nbsp;
                    <a
                        href="https://docs.google.com/document/d/1AbH2EOsxC2kddhmSnqpSaRkmfvrtbd0658rr8N05Vc8/edit"
                        className="link"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {intl.formatMessage({
                            id: "header.feedbackLink"
                        })}
                    </a>
                </div>
            </Box>
            <Hide below="custombreak">
                <UserSupportLink></UserSupportLink>
            </Hide>
            {/*<Hide below="custombreak">
                <Login></Login>
            </Hide>*/}
            <LanguageToggler></LanguageToggler>
            <MenuButton></MenuButton>
        </HStack>
    );
};
