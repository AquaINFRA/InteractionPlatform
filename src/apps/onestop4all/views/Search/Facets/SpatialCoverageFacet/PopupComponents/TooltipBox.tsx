import { Box, Tooltip } from "@open-pioneer/chakra-integration";

export function TooltipBox (props: {content: string}) {
    const {content} = props;
    return(
        <Tooltip
            label={content}
            isOpen
            placement="right"
            bg="white"
            color="black"
            border="1px solid black"
            p="5px"
            zIndex="9990"
        >
            <Box
                position="absolute"
                top="110px"
                right="120px"
                zIndex="9999"
                pointerEvents="none"
                bg="black"
            />
        </Tooltip>
    );
}