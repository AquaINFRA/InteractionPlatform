import { Button } from "@open-pioneer/chakra-integration";
import { useState } from "react";
import { PrimaryColor } from "../../../../Theme";
interface SearchButtonProps {
    onClick: () => void;
    active: boolean;
}
export function SearchButton(props: SearchButtonProps) {
    const [bgcolor, setbgcolor] = useState("grey");
    const [hover, setHover] = useState({
        bg: "grey"
    });
    return (
        <Button bg={bgcolor} _hover={hover} height="5vh" fontSize="0.7vw" onClick={props.onClick}>
            Search for datasets that overlap with this area
        </Button>
    );
}
