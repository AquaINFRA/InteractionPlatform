import { Button } from "@open-pioneer/chakra-integration";
import { PrimaryColor } from "../../../../Theme";
import { lineBlue } from "./Styles";

interface DeselectButtonProps {
    onClick: () => void;
    active: boolean;
    text: string;
}
export function CatchmentButton(props: DeselectButtonProps) {
    const { onClick, active, text } = props;
    const bgcolor = active ? PrimaryColor : "grey";
    const hover = active ? { bg: lineBlue } : { bg: "grey" };
    // remove onClick if button is deactivated
    function handleClick() {
        if (active) {
            onClick();
        }
    }
    return (
        <Button bg={bgcolor} _hover={hover} onClick={handleClick}>
            {text}
        </Button>
    );
}
