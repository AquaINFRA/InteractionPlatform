import { HStack, Icon, Link } from "@open-pioneer/chakra-integration";
import { useIntl } from "open-pioneer:react-hooks";
import { useState } from "react";

import { PrimaryColor } from "../../Theme";
import { UserSupportIcon } from "../Icons";
import { SupportForm } from "../SupportForm/SupportForm";

export interface UserSupportLinkProps {
    hideIcon?: boolean;
}

export function UserSupportLink({ hideIcon = false }: UserSupportLinkProps) {
    const intl = useIntl();
    const [openSupportForm, setOpenSupportForm] = useState(false);

    return (
        <>
            <HStack onClick={() => setOpenSupportForm(true)} _hover={{ cursor: "pointer" }}>
                {!hideIcon && (
                    <Icon boxSize={6} color={PrimaryColor}>
                        <UserSupportIcon />
                    </Icon>
                )}
                <Link whiteSpace="nowrap">{intl.formatMessage({ id: "header.user-support" })}</Link>
            </HStack>
            <SupportForm
                openForm={openSupportForm}
                menuClosed={() => setOpenSupportForm(false)}
            ></SupportForm>
        </>
    );
}
