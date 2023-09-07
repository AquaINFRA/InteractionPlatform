import { Box, Container, Flex } from "@open-pioneer/chakra-integration";
import { useState } from "react";

import { SupportForm } from "../SupportForm/SupportForm";

export const Footer = () => {
    const [openSupportForm, setOpenSupportForm] = useState(false);

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
                                <span className="section-entry">
                                    <a
                                        href="https://www.nfdi4earth.de/about-us"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        About us
                                    </a>
                                </span>
                                <span>|</span>
                                <span className="section-entry">
                                    <a
                                        href="https://www.nfdi4earth.de/about-us/consortium"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Partners
                                    </a>
                                </span>
                                <span>|</span>
                                <span className="section-entry">
                                    <a
                                        href="https://www.nfdi4earth.de/2coordinate/coordination-office"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Contact
                                    </a>
                                </span>
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
                                <Box
                                    className="section-entry"
                                    onClick={() => setOpenSupportForm(true)}
                                    _hover={{ cursor: "pointer" }}
                                >
                                    User Support
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            className="section"
                            gap={{ base: "column", custombreak: "10px" }}
                            flexDirection={{ base: "column", custombreak: "row" }}
                        >
                            <Box className="section-header">Legal information:</Box>
                            <Box display="flex" gap="8px">
                                <span className="section-entry">
                                    <a
                                        href="https://www.nfdi4earth.de/legal-notice"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Legal information
                                    </a>
                                </span>
                                <span>|</span>
                                <span className="section-entry">
                                    <a
                                        href="https://www.nfdi4earth.de/privacy-policy"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Privacy
                                    </a>
                                </span>
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
                            <a
                                href="https://git.rwth-aachen.de/nfdi4earth"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Flex gap="10px" alignItems="center">
                                    <img src="/gitlab-logo.svg" />
                                    <div className="label">GITLAB</div>
                                </Flex>
                            </a>
                        </Box>
                        <Box className="entry">
                            <a
                                href="https://twitter.com/nfdi4earth"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Flex gap="10px" alignItems="center">
                                    <img src="/twitter.svg" />
                                    <div className="label">TWITTER</div>
                                </Flex>
                            </a>
                        </Box>
                        <Box className="entry">
                            <a
                                href="https://creativecommons.org/licenses/by/4.0/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Flex gap="10px" alignItems="center">
                                    <img src="/cc-by.svg" />
                                    <div className="label">CC BY 4.0</div>
                                </Flex>
                            </a>
                        </Box>
                        <Box flex="1 1 50px"></Box>
                        <Box>
                            <img src="/dfg-logo.svg" />
                        </Box>
                    </Box>
                </Container>
            </div>

            <SupportForm
                openForm={openSupportForm}
                menuClosed={() => setOpenSupportForm(false)}
            ></SupportForm>
        </>
    );
};
