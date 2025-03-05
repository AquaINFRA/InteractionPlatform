import { IconButton } from "@open-pioneer/chakra-integration";
import { RectangleSelectIcon } from "../../../../../components/Icons";
import { ActiveControlColor, PrimaryColor } from "../../../../../Theme";

interface DrawBboxButtonProps {
    bboxActive: boolean;
    onClick: () => void;
}

export function DrawBboxButton(props: DrawBboxButtonProps) {
    const { bboxActive, onClick } = props;
    return (
        <IconButton
            aria-label="rectangle select"
            size="lg"
            rounded={"lg"}
            title="Click here to draw a bounding box"
            bg={bboxActive ? ActiveControlColor : PrimaryColor}
            onClick={() => onClick()}
            icon={<RectangleSelectIcon />}
        />
    );
}
