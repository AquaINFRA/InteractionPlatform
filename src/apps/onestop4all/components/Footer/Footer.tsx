import { Box, Container } from "@open-pioneer/chakra-integration";

export const Footer = () => {
    return (
        <>
            <Container maxW={{ base: "100%", custombreak: "80%" }} paddingBottom="4px">
                <div className="seperator"></div>
            </Container>
            <div className="footer">
                <Container maxW={{ base: "100%", custombreak: "80%" }} position="relative">
                    <Box
                        className="footer-navigation"
                        padding={{ base: "50px 0px", custombreak: "84px 0px" }}
                    >
                        <Box
                            className="section"
                            gap={{ base: "column", custombreak: "10px" }}
                            flexDirection={{ base: "column", custombreak: "row" }}
                        >
                            <Box className="section-header">Get connected:</Box>
                            <Box display="flex" gap="8px">
                                <span className="section-entry">About us</span>
                                <span>|</span>
                                <span className="section-entry">Partners</span>
                                <span>|</span>
                                <span className="section-entry">Contact</span>
                            </Box>
                        </Box>
                        <Box
                            className="section"
                            gap={{ base: "column", custombreak: "10px" }}
                            flexDirection={{ base: "column", custombreak: "row" }}
                        >
                            <Box className="section-header">Support:</Box>
                            <Box display="flex" gap="8px">
                                <span className="section-entry">FAQ</span>
                                <span>|</span>
                                <span className="section-entry">User Support</span>
                            </Box>
                        </Box>
                        <Box
                            className="section"
                            gap={{ base: "column", custombreak: "10px" }}
                            flexDirection={{ base: "column", custombreak: "row" }}
                        >
                            <Box className="section-header">Legal information:</Box>
                            <Box display="flex" gap="8px">
                                <span className="section-entry">Legal information</span>
                                <span>|</span>
                                <span className="section-entry">Privacy</span>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        className="social-media"
                        display="flex"
                        flexDirection={{ base: "column", custombreak: "row" }}
                        gap={{ base: "20px", custombreak: "52px" }}
                    >
                        <Box className="entry">
                            <img src="/gitlab-logo.svg" />
                            <div className="label">GITLAB</div>
                        </Box>
                        <Box className="entry">
                            <img src="/twitter.svg" />
                            <div className="label">TWITTER</div>
                        </Box>
                        <Box className="entry">
                            <img src="/cc-by.svg" />
                            <div className="label">CC BY 2.0</div>
                        </Box>
                        <Box flex="1 1 50px"></Box>
                        <Box>
                            <img src="/dfg-logo.svg" />
                        </Box>
                    </Box>
                </Container>
            </div>
        </>
    );
};
