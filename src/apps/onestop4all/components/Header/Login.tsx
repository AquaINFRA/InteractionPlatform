import { Button, HStack } from "@open-pioneer/chakra-integration";
import { useIntl } from "open-pioneer:react-hooks";

import { LoginIcon } from "../Icons";

export function Login() {
    const intl = useIntl();

    return (
        <HStack>
            <Button leftIcon={<LoginIcon boxSize={6} />} variant="ghost" colorScheme="teal">
                {intl.formatMessage({ id: "header.login" })}
            </Button>
        </HStack>
    );
}
