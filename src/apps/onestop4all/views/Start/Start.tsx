import { Box, Container, Flex, Image, Spacer } from "@open-pioneer/chakra-integration";

import { SearchBar } from "../../components/SearchBar";
import { Mission } from "./Mission/Mission";

export function StartView() {
    return (
        <>
            <Box position="relative">
                <Image src="/image1.png" width="100%" />
                <Box w="100%" position="absolute" top="0">
                    <Container maxW="80%">
                        <Flex pt="60px" color="white" textAlign="center" fontSize="24px">
                            <Spacer></Spacer>
                            <Box w="50%">
                                <div>Your One-Stop to FAIR, open and innovative</div>
                                <div>
                                    Research Data Management in{" "}
                                    <span style={{ fontWeight: 700 }}>Earth System Sciences</span>.
                                </div>
                            </Box>
                        </Flex>
                    </Container>
                </Box>
            </Box>

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
