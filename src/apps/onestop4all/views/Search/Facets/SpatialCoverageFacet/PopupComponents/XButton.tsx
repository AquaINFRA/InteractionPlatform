import { IconButton } from "@open-pioneer/chakra-integration";
import { CloseIcon } from "@chakra-ui/icons";
interface XButtonProps {
    handleClose: () => void;
}
export function XButton(props: XButtonProps) {
    return (
        <IconButton
            position="absolute"
            top="10px"
            right="10px"
            aria-label="Close"
            onClick={props.handleClose}
            icon={<CloseIcon />}
        />
    );
}
