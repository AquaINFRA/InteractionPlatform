import { HStack, Icon, Link } from "@open-pioneer/chakra-integration";
import { useIntl } from "open-pioneer:react-hooks";

import { LoginIcon } from "../Icons";
import { PrimaryColor } from "../../Theme";

export function Login() {
    const intl = useIntl();

    return (
        <HStack>
            <Icon boxSize={6} color={PrimaryColor}>
                <LoginIcon />
            </Icon>
            <Link variant="ghost">{intl.formatMessage({ id: "header.login" })}</Link>
        </HStack>
    );
}
