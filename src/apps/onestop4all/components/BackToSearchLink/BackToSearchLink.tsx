import { Box, Flex } from "@open-pioneer/chakra-integration";
import { useNavigate } from "react-router-dom";

import { BackIcon } from "../Icons";

export function BackToSearchLink(props: { visible: boolean }) {
    const { visible } = props;
    const navigate = useNavigate();

    function backToSearch() {
        navigate({ pathname: "/search" });
    }

    const backText = "Back";
    const toResultListText = "to result list";

    return visible ? (
        <Flex
            fontSize="14px"
            textTransform="uppercase"
            letterSpacing="0.6px"
            onClick={backToSearch}
            gap="12px"
            _hover={{ cursor: "pointer" }}
        >
            <Box onClick={backToSearch} _hover={{ cursor: "pointer" }}>
                <BackIcon />
            </Box>
            <Box>
                <Box display="inline" fontWeight="700" color="var(--primary-primary-main)">
                    {backText}&nbsp;
                </Box>
                <Box whiteSpace="nowrap" display="inline">
                    {toResultListText}
                </Box>
            </Box>
        </Flex>
    ) : (
        <></>
    );
}
