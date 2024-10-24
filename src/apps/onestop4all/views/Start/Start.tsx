import { Box, Container, Flex } from "@open-pioneer/chakra-integration";

import { SearchBar } from "../../components/SearchBar";

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
                <Box className="mission">
                    <Box className="text-centered-box">
                        <Box paddingTop={10} id="introVideo1">
                            <Box marginBottom={2} marginTop={10}><b>Video 5: Ontology-based search and further filter options</b></Box>
                            <iframe
                                width="760"
                                height="409"
                                src="https://www.youtube.com/embed/D4gWc-RXUsU?si=qN3DZWOvqYFhhBIw"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            />
                            <Box marginBottom={2} marginTop={10}><b>Video 4: Importing data to Galaxy, option 2</b></Box>
                            <iframe
                                width="760"
                                height="409"
                                src="https://www.youtube.com/embed/roDOc1qkJdc?si=yN3F5ulDs9uRYKBl&amp;start=1"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            />
                            <Box marginBottom={2} marginTop={10}><b>Video 3: Searching with the help of catchment areas</b></Box>
                            <iframe
                                width="760"
                                height="409"
                                src="https://www.youtube.com/embed/fpaEtw35MoI?si=9Wikv8JGvH0BgM4M"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            />
                            <Box marginBottom={2} marginTop={10}><b>Video 2: Importing data to Galaxy, option 1</b></Box>
                            <iframe
                                width="760"
                                height="409"
                                src="https://www.youtube.com/embed/92VtJhJZA_Q?si=6SKcccEVXYdfuPhQ"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            />
                            <Box marginBottom={2} marginTop={10}><b>Video 1: Searching for datasets</b></Box>
                            <iframe
                                width="760"
                                height="409"
                                src="https://www.youtube.com/embed/-SRh9k44IRo?si=5VsH34-Qs6RZdvGc"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            />
                        </Box>
                        <Box paddingTop={10} id="introVideo2">
                            <Box marginBottom={2}><b>Video 5: Ontology-based search and further filter options</b></Box>
                            <iframe
                                width="330"
                                height="190"
                                src="https://www.youtube.com/embed/D4gWc-RXUsU?si=qN3DZWOvqYFhhBIw"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            />
                            <Box marginBottom={2} marginTop={10}><b>Video 4: Importing data to Galaxy, option 2</b></Box>
                            <iframe
                                width="330"
                                height="190"
                                src="https://www.youtube.com/embed/roDOc1qkJdc?si=yN3F5ulDs9uRYKBl&amp;start=1"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            />
                            <Box marginBottom={2} marginTop={10}><b>Video 3: Searching with the help of catchment areas</b></Box>
                            <iframe
                                width="330"
                                height="190"
                                src="https://www.youtube.com/embed/fpaEtw35MoI?si=9Wikv8JGvH0BgM4M"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            />
                            <Box marginBottom={2} marginTop={10}><b>Video 2: Importing data to Galaxy, option 1</b></Box>
                            <iframe
                                width="330"
                                height="190"
                                src="https://www.youtube.com/embed/92VtJhJZA_Q?si=6SKcccEVXYdfuPhQ"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            />
                            <Box marginBottom={2} marginTop={10}><b>Video 1: Searching for datasets</b></Box>
                            <iframe
                                width="330"
                                height="190"
                                src="https://www.youtube.com/embed/-SRh9k44IRo?si=5VsH34-Qs6RZdvGc"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
