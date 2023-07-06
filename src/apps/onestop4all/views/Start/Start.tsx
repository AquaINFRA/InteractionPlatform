import { Box, Container, Flex, Image, Spacer } from "@open-pioneer/chakra-integration";

import { SearchBar } from "../../components/SearchBar";

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

                <Box className="mission">
                    <img className="bg-icon" alt="Bg icon" src="/bg-icon.png" />
                    <Box className="mission-text text-centered-box">
                        <Box className="text-centered-box-text">
                            The <span className="bold">OneStop4All</span> is the primary visual and
                            user-friendly <span className="link">NFDI4Earth</span> access point. It
                            offers a coherent view on and points to all relevant Earth System
                            Sciences (ESS) RDM resources provided by NFDI4Earth members and the ESS
                            community, such as data repositories, software tools, information on
                            Research Data Management (RDM), education and training materials. Learn
                            more about our <span className="link">Mission</span> and the{" "}
                            <span className="link">Resources</span>.
                        </Box>
                    </Box>
                </Box>

                <div className="seperator"></div>
            </Container>
        </>
    );
}
