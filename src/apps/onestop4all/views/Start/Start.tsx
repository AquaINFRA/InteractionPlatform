import { Box, Container, Flex } from "@open-pioneer/chakra-integration";

import { SearchBar } from "../../components/SearchBar";
import { DemonstratorEntries } from "./Demonstrator/DemonstratorEntries";
import { Videos } from "./Videos/Videos";

export function StartView() {

    return (
        <Box className="start-view">
            <Box position="relative">
                <Box className="header-image" />
                <Box w="100%" position="absolute" top="-20">
                    <Container maxW={{ base: "100%", custombreak: "80%" }}>
                        <Flex
                            pt={{ base: "90px", custombreak: "60px" }}
                            textAlign="center"
                            justifyContent="flex-end"
                        >
                            <Box
                                maxW={{ base: "90%", custombreak: "50%" }}
                                fontSize={{ base: "18px", custombreak: "24px" }}
                                color="#4f4f4f"
                            >
                                <b>The central gateway for scientific communities to find, access, and reuse aquatic digital resources.</b>
                            </Box>
                        </Flex>
                    </Container>
                </Box>
            </Box>
            <Box
                position="absolute"
                width="100%"
                marginTop="-40px"
            >
                <Container maxW={{ base: "100%", custombreak: "80%" }}>
                    <SearchBar />
                </Container>
            </Box>

            <Container maxW={{ base: "100%", custombreak: "80%" }}>
                {/*<Box height="130px"></Box>
                <DemonstratorEntries/>*/}
                <Box height="80px"></Box>
                <Videos />
            </Container>
        </Box>
    );
}
