import { Box } from "@open-pioneer/chakra-integration";

export function ErrorMessage (props:{message: string}) {
    const {message} = props;
    return (
        <Box
            backgroundColor="red.500"
            color="white"
            p={2}
            borderRadius="md"
            textAlign="center"
            boxShadow="md"
            maxW="400px"
            position="absolute"
            top="100px"
            left="50%"
            transform="translateX(-50%)"
            zIndex="1000"
        >
            {message}
        </Box>
    );
}