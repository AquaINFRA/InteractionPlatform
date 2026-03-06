import { IconButton } from "@open-pioneer/chakra-integration";
import { ActiveControlColor, PrimaryColor } from "../../../../../Theme";
import { InfoIcon } from "@chakra-ui/icons";

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
            icon={<InfoIcon />}
        />
    );
}
