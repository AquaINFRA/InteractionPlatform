import { Button, HStack, Input } from "@open-pioneer/chakra-integration";
import { useIntl } from "open-pioneer:react-hooks";
import { useNavigate } from "react-router-dom";

import { PrimaryColor } from "../Theme";
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
        <HStack padding="15px" borderWidth="15px" borderColor={PrimaryColor} bg="white">
            <Input placeholder={intl.formatMessage({ id: "search.search-bar.placeholder" })} />
            <Button
                leftIcon={<SearchIcon boxSize={6} />}
                variant="solid"
                onClick={() => startSearch()}
            >
                {intl.formatMessage({ id: "search.search-bar.button-label" })}
            </Button>
        </HStack>
    );
}
