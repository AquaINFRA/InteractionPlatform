import { Button } from "@open-pioneer/chakra-integration";

interface GetBboxButtonProps {
    onClick: () => void;
}
export function GetBboxButton(props: GetBboxButtonProps) {
    return (
        <Button height="5vh" fontSize="0.7vw" onClick={props.onClick}>
            Get Bounding Box
        </Button>
    );
}
