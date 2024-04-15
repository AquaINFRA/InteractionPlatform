import { Box, Container, Flex } from "@open-pioneer/chakra-integration";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "open-pioneer:react-hooks";

export const Footer = () => {
    const intl = useIntl();
    const [openSupportForm, setOpenSupportForm] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <Container maxW={{ base: "100%", custombreak: "80%" }} paddingBottom="4px">
                <div className="seperator"></div>
            </Container>
            <div className="footer">
                <Container maxW={{ base: "100%", custombreak: "80%" }} position="relative">
                    <Box
                        className="footer-navigation"
                        padding={{ base: "50px 0px", custombreak: "28px 0px" }}
                    >
                        <Box
                            className="section"
                            gap={{ base: "column", custombreak: "10px" }}
                            flexDirection={{ base: "column", custombreak: "row" }}
                        >
                            <Box className="section-header">
                                {intl.formatMessage({
                                    id: "footer.get-connected"
                                })}
                                :
                            </Box>
                            <Box display="flex" gap="8px">
                                <a
                                    href="https://aquainfra.eu/about"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="label"
                                >
                                    <div className="label">
                                        {intl.formatMessage({
                                            id: "footer.about"
                                        })}
                                    </div>
                                </a>
                                <span>|</span>
                                <a
                                    href="https://aquainfra.eu/partners"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="label"
                                >
                                    <div className="label">
                                        {intl.formatMessage({
                                            id: "footer.partners"
                                        })}
                                    </div>
                                </a>
                                <span>|</span>
                                <a
                                    href="https://aquainfra.eu/contact"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="label"
                                >
                                    <div className="label">
                                        {intl.formatMessage({
                                            id: "footer.contact"
                                        })}
                                    </div>
                                </a>
                            </Box>
                        </Box>
                        <Box
                            className="section"
                            gap={{ base: "column", custombreak: "10px" }}
                            flexDirection={{ base: "column", custombreak: "row" }}
                        >
                            <Box className="section-header">
                                {intl.formatMessage({
                                    id: "footer.legal-information"
                                })}
                                :
                            </Box>
                            <Box display="flex" gap="8px">
                                <a
                                    href="https://www.nfdi4earth.de/legal-notice"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="label"
                                >
                                    <div className="label">
                                        {intl.formatMessage({
                                            id: "footer.legal-information"
                                        })}
                                    </div>
                                </a>
                                <span>|</span>
                                <a
                                    href="https://www.nfdi4earth.de/privacy-policy"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <div className="label">
                                        {intl.formatMessage({
                                            id: "footer.privacy"
                                        })}
                                    </div>
                                </a>
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
                                href="https://github.com/AquaINFRA" 
                                target="_blank" 
                                rel="noreferrer"
                            >
                                <Flex gap="10px" alignItems="center">
                                    <Box w={"40px"}>
                                        <img src="/github.png" />
                                    </Box>
                                    <div className="label">GITHUB</div>
                                </Flex>
                            </a>
                        </Box>
                        <Box className="entry">
                            <a
                                href="https://twitter.com/AquainfraEU"
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
                        <Box flex="1 1 20px"></Box>
                        <Box w={{ base: "40%", custombreak: "20%" }}>
                            <a
                                href="https://cordis.europa.eu/project/id/101094434"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div className="label" style={{marginBottom:"5px"}}>Funded by:</div>
                                <img src="/ec-logo.svg" width={"100%"} />
                            </a>
                        </Box>
                    </Box>
                </Container>
            </div>
        </>
    );
};
