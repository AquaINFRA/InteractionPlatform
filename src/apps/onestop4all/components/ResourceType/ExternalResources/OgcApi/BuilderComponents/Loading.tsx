import {
    Box,
    Spinner
} from "@open-pioneer/chakra-integration";

export const Loading = () => {
    return (
        <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="rgba(255,255,255,0.6)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex="20"
            pointerEvents="none"
        >
            <Spinner size="xl" thickness="4px" />
        </Box>
    );
};
