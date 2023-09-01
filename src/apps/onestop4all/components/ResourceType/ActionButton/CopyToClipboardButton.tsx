import { useToast } from "@open-pioneer/chakra-integration";
import { ActionButton } from "./ActionButton";
import { LinkIcon } from "@chakra-ui/icons";

export const CopyToClipboardButton = (props: { data: string; label: string }) => {
    const { data, label } = props;
    const toast = useToast();

    const copyToClipBoard = (message: string) => {
        if (message != undefined) {
            navigator.clipboard.writeText(message);
            //TO DO-1: There is sth. wrong with the tooltip!
            return toast({
                title: "Copied to clipboard",
                status: "success",
                duration: 2000,
                position: "bottom-right",
                isClosable: true
            });
        } else {
            return toast({
                title: "Could not copy to clipboard",
                status: "error",
                duration: 2000,
                position: "bottom-right",
                isClosable: true
            });
        }
    };

    return (
        <ActionButton
            label={label}
            icon={<LinkIcon color="#05668D" />}
            variant="outline"
            fun={() => copyToClipBoard(data)}
        />
    );
};
