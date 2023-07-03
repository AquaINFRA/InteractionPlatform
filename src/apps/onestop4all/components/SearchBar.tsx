import { Button, HStack, Input } from "@open-pioneer/chakra-integration";
import { useIntl } from "open-pioneer:react-hooks";

import { PrimaryColor } from "../Theme";
import { SearchIcon } from "./Icons";

export function SearchBar() {
    const intl = useIntl();

    return (
        <HStack padding="15px" borderWidth="15px" borderColor={PrimaryColor} bg="white">
            <Input placeholder={intl.formatMessage({ id: "search.search-bar.placeholder" })} />
            <Button leftIcon={<SearchIcon boxSize={6} />} variant="solid">
                {intl.formatMessage({ id: "search.search-bar.button-label" })}
            </Button>
        </HStack>
    );
}
