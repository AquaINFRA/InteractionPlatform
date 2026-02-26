import { useState, useEffect } from "react";
import { LinkIcon } from "@chakra-ui/icons";
import { TooltipActionButton } from "../../../ActionButton/TooltipActionButton";

export const CopyToClipboardButton = (props: { data: string; label: string }) => {
    const { data, label } = props;
    const [btnText, setBtnText] = useState(label);
    useEffect(() => {
        setBtnText(label);
    }, [label]);

    const copyToClipBoard = (message: string) => {
        if (message) {
            navigator.clipboard.writeText(message);
            setBtnText("copied to clipboard");

            setTimeout(() => {
                setBtnText(label);
            }, 2000);
        } else {
            setBtnText("Copy to clipboard failed");
        }
    };

    return (
        <TooltipActionButton
            href={data}
            label={btnText}
            icon={<LinkIcon color="#05668D" />}
            onClick={() => copyToClipBoard(data)}
            variant="outline"
        />
    );
};
