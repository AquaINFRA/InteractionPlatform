import { Button } from "@open-pioneer/chakra-integration";
import { PrimaryColor } from "../../../../Theme";
import { lineBlue } from "./Styles";
interface CatchmentButtonProps {
    onClick: () => void;
    active: boolean;
    text: string;
}
export function CatchmentButton(props: CatchmentButtonProps) {
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
        <Button
            bg={bgcolor}
            _hover={hover}
            w={"250px"}
            onClick={handleClick}
        >
            {text}
        </Button>
    );
}
