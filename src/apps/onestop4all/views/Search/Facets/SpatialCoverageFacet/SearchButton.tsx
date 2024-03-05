import { Button } from "@open-pioneer/chakra-integration";
import { useState } from "react";
import { PrimaryColor } from "../../../../Theme";
import { lineBlue } from "./PopupOverlay";
interface SearchButtonProps {
    onClick: () => void;
    active: boolean;
}
export function SearchButton(props: SearchButtonProps) {
    const { onClick, active } = props;
    const bgcolor = active ? PrimaryColor : "grey";
    const hover = active ? { bg: lineBlue } : { bg: "grey" };
    return (
        <Button bg={bgcolor} _hover={hover} height="5vh" fontSize="0.7vw" onClick={props.onClick}>
            Search for datasets that overlap with this area
        </Button>
    );
}
