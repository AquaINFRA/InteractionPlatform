import { Box, Container, Image } from "@open-pioneer/chakra-integration";

import { SearchBar } from "../components/SearchBar";

export function StartView() {
    return (
        <>
            <Image src="/image1.png" width="100%" />
            <Box position="absolute" width="100%" marginTop="-50px">
                <Container maxW="80%">
                    <SearchBar></SearchBar>
                </Container>
            </Box>
        </>
    );
}
