import { Button } from "@chakra-ui/react";

export const ResetButton = (props: {fun: () => void;}) => {
    return (
        <Button
            size="xs"
            w={"fit-content"}
            paddingLeft={"10px"}
            paddingRight={"10px"}
            marginRight={"10px"}
            onClick={() => props.fun()}
        >
            Reset
        </Button>
    );
};
