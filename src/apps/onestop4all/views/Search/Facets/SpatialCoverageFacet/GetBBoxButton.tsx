import { Button } from "@open-pioneer/chakra-integration";
import { PrimaryColor } from "../../../../Theme";
import { lineBlue } from "./PopupOverlay";

interface GetBBoxButtonProps {
    onClick: () => void;
    active: boolean;
}
export function GetBBoxButton(props: GetBBoxButtonProps) {
    const { onClick, active } = props;
    const bgcolor = active ? PrimaryColor : "grey";
    const hover = active ? { bg: lineBlue } : { bg: "grey" };
    return (
        <Button height="5vh" fontSize="0.7vw" onClick={onClick} bg={bgcolor} _hover={hover}>
            Get Bounding Box
        </Button>
    );
}
