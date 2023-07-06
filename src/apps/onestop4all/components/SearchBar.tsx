import { Box, Button, HStack, Input } from "@open-pioneer/chakra-integration";
import { useIntl } from "open-pioneer:react-hooks";
import { useNavigate } from "react-router-dom";

import { SearchIcon } from "./Icons";

export function SearchBar() {
    const intl = useIntl();
    const navigate = useNavigate();

    function startSearch(): void {
        navigate({
            pathname: "search",
            search: "?adsf=asdf"
        });
    }

    return (
        <Box borderWidth="15px" borderColor="rgb(5, 102, 141, 0.7)">
            <HStack padding="15px" w="100%" bg="white">
                <Input placeholder={intl.formatMessage({ id: "search.search-bar.placeholder" })} />
                <Button
                    leftIcon={<SearchIcon boxSize={6} />}
                    variant="solid"
                    onClick={() => startSearch()}
                >
                    {intl.formatMessage({ id: "search.search-bar.button-label" })}
                </Button>
            </HStack>
        </Box>
    );
}
