import { Box } from "@open-pioneer/chakra-integration";
import { ActionButton } from "../ActionButton/ActionButton";
import { UserSupportIconWhite } from "../../Icons";

export const Support = () => {
    return (
        <Box>
            <p className="supportHeader">Still searching? Look no further!</p>
            <p className="supportText">
                If this article isn&apos;t helpful or doesn&apos;t answer your question, we are
                happy to support you.
            </p>
            <ActionButton
                label="Contact user support"
                icon={<UserSupportIconWhite />}
                variant="solid"
                fun={() => void 0}
            />
        </Box>
    );
};
