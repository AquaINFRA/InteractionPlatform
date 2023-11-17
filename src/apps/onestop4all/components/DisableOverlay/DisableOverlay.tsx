import { Box } from "@open-pioneer/chakra-integration";

export function DisableOverlay(props: { label: string }) {
    const { label } = props;
    return (
        <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            backgroundColor="rgb(5, 102, 141, 0.4)"
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex="9999"
        >
            <Box backgroundColor="white" padding="10px">
                {label}
            </Box>
        </Box>
    );
}
