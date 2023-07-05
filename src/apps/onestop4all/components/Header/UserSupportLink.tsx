import { HStack, Icon, Link } from "@open-pioneer/chakra-integration";
import { useIntl } from "open-pioneer:react-hooks";

import { PrimaryColor } from "../../Theme";
import { UserSupportIcon } from "../Icons";

export function UserSupportLink() {
    const intl = useIntl();

    return (
        <HStack>
            <Icon boxSize={6} color={PrimaryColor}>
                <UserSupportIcon />
            </Icon>
            <Link whiteSpace="nowrap">{intl.formatMessage({ id: "header.user-support" })}</Link>
        </HStack>
    );
}
