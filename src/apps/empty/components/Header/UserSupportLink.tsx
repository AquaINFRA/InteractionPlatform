import { Button, HStack } from "@open-pioneer/chakra-integration";
import { useIntl } from "open-pioneer:react-hooks";

import { UserSupportIcon } from "../Icons";

export function UserSupportLink() {
    const intl = useIntl();

    return (
        <HStack>
            <Button leftIcon={<UserSupportIcon boxSize={6} />} variant="ghost" colorScheme="teal">
                {intl.formatMessage({ id: "header.user-support" })}
            </Button>
        </HStack>
    );
}
