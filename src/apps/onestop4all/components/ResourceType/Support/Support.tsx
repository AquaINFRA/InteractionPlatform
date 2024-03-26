import { Box } from "@open-pioneer/chakra-integration";
import { ActionButton } from "../ActionButton/ActionButton";
import { UserSupportIconWhite } from "../../Icons";
import { useState } from "react";

export const Support = () => {
    const [openSupportForm, setOpenSupportForm] = useState(false);

    return (
        <>
            <Box>
                <div className="supportHeader">Still searching? Look no further!</div>
                <div className="supportText">
                    If this article isn&apos;t helpful or doesn&apos;t answer your question, we are
                    happy to support you.
                </div>
                <ActionButton
                    label="Contact user support"
                    icon={<UserSupportIconWhite />}
                    variant="solid"
                    fun={() => setOpenSupportForm(true)}
                />
            </Box>
        </>
    );
};
