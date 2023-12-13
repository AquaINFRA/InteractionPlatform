import { useState } from "react";
import { ActionButton } from "./ActionButton";
import { LinkIcon } from "@chakra-ui/icons";

export const CopyToClipboardButton = (props: { data: string; label: string }) => {
    const { data, label } = props;
    const [btnText, setBtnText] = useState(label);

    const copyToClipBoard = (message: string) => {
        if (message) {
            navigator.clipboard.writeText(message);
            setBtnText("copied to clipboard");
        } else {
            setBtnText("Copy to clipbopard failed");
        }
    };

    return (
        <ActionButton
            label={btnText}
            icon={<LinkIcon color="#05668D" />}
            variant="outline"
            fun={() => copyToClipBoard(data)}
        />
    );
};
