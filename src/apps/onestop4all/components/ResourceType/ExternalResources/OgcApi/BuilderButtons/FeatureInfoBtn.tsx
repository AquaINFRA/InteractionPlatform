import { IconButton } from "@open-pioneer/chakra-integration";
import { QuestionmarkIcon } from "../../../../../components/Icons";
import { ActiveControlColor, PrimaryColor } from "../../../../../Theme";

interface FeatureInfoBtnProps {
    infoActive: boolean;
    onClick: () => void;
}

export function FeatureInfoBtn(props: FeatureInfoBtnProps) {
    const { infoActive, onClick } = props;
    return (
        <IconButton
            aria-label="rectangle select"
            size="lg"
            rounded={"lg"}
            title="Click here to draw a bounding box"
            bg={infoActive ? ActiveControlColor : PrimaryColor}
            onClick={() => onClick()}
            icon={<QuestionmarkIcon />}
        />
    );
}
