import { Box, Container, Image } from "@open-pioneer/chakra-integration";

import { SearchBar } from "../../components/SearchBar";
import { Mission } from "./Mission/Mission";

export function StartView() {
    return (
        <>
            <Image src="/image1.png" width="100%" />

            <Box position="absolute" width="100%" marginTop="-70px">
                <Container maxW="80%">
                    <SearchBar></SearchBar>
                </Container>
            </Box>

            <Container maxW="80%">
                <Box height="80px"></Box>
                <Mission></Mission>
                <div className="seperator"></div>
            </Container>
        </>
    );
}
