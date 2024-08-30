import { Box, Divider, Flex, Hide, HStack } from "@open-pioneer/chakra-integration";
import { useNavigate } from "react-router-dom";
import { useIntl } from "open-pioneer:react-hooks";

import {useSearchState} from "../../views/Search/SearchState";

import { Logo } from "./Logo";
import { MenuButton } from "./MenuButton";
import { Feedback } from "./Feedback";

export const Header = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const searchState = useSearchState();

    const backToStart = () => {
        searchState.setSearchTerm("");
        searchState.setSelectedDataProvider([]);
        navigate("/");
    };

    return (
        <>
            <HStack
                justifyContent="space-between"
                alignItems="center"
                margin="6px 0px"
                padding={{ base: "6px 1px 0px", custombreak: "36px 1px 10px" }}
            >
                <Box _hover={{ cursor: "pointer" }} onClick={backToStart}>
                    <Logo />
                </Box>
                <div id="feedback1">
                    <Feedback fontSize="16pt" />
                </div>
                <Flex gap={{ base: "10px", custombreak: "30px" }}>
                    <MenuButton />
                </Flex>
            </HStack>
            <Divider className="separator" />
            <div id="feedback2">
                <div className="feedbackText">
                    <Feedback fontSize="12pt" />
                </div>
                <Divider className="separator" />
            </div>
        </>
    );
};
