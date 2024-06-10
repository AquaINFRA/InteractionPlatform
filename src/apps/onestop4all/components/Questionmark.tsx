import { IconButton, Tooltip } from "@open-pioneer/chakra-integration";
import { QuestionmarkIcon } from "./Icons";

interface QuestionmarkProps {
    label: string;
    size: string;
}
/* Displays a questionmark icon and an explanatory text when hovering over the icon*/
export const Questionmark = (props: QuestionmarkProps) => {
    const { label, size } = props;
    return (
        <Tooltip
            fontFamily="Arial"
            label={label}
            hasArrow
            placement="top"
            openDelay={0}
            borderRadius="8px"
            backgroundColor="rgba(1,1,1,0.8)"
        >
            <IconButton
                className="question-mark"
                aria-label="explanation"
                size={size}
                isRound={true}
                icon={<QuestionmarkIcon />}
                _hover={{ cursor: "default" }}
                isDisabled={true}
            />
        </Tooltip>
    );
};
