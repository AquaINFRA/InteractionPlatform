import {
    Tooltip,
    Icon
} from "@open-pioneer/chakra-integration";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

export const Note = (props: {label: string}) => {
    const label = props.label;
    
    return (
        <Tooltip
            label={label}
            placement="right"
            hasArrow
        >
            <span>
                <Icon
                    as={QuestionOutlineIcon}
                    boxSize={7}
                    cursor="pointer"
                    color="gray.500"
                    marginLeft={2}
                />
            </span>
        </Tooltip>
    );
};
