import { Button } from "@open-pioneer/chakra-integration";
import { PrimaryColor } from "../../../../Theme";
import { lineBlue } from "./Styles";
interface SearchButtonProps {
    onClick: () => void;
    active: boolean;
}
export function SearchButton(props: SearchButtonProps) {
    const { onClick, active } = props;
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
            paddingLeft={"0.5vw"}
            paddingRight={"0.5vw"}
            height="5vh"
            fontSize="0.7vw"
            onClick={handleClick}
        >
            Search for datasets that overlap with this area
        </Button>
    );
}
