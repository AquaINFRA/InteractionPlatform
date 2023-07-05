import { Container } from "@open-pioneer/chakra-integration";

export const Footer = () => {
    return (
        <>
            <Container maxW="80%" paddingBottom="4px">
                <div className="seperator"></div>
            </Container>
            <div className="footer">
                <Container maxW="80%" position="relative">
                    <div className="footer-navigation">
                        <div className="section">
                            <div className="section-header">GET CONNECTED:</div>
                            <span className="section-entry">About us</span>
                            <span>|</span>
                            <span className="section-entry">Partners</span>
                            <span>|</span>
                            <span className="section-entry">Contact</span>
                        </div>
                        <div className="section">
                            <div className="section-header">SUPPORT:</div>
                            <span className="section-entry">FAQ</span>
                            <span>|</span>
                            <span className="section-entry">User Support</span>
                        </div>
                        <div className="section">
                            <div className="section-header">LEGAL INFORMATION:</div>
                            <span className="section-entry">Legal information</span>
                            <span>|</span>
                            <span className="section-entry">Privacy</span>
                        </div>
                    </div>
                    <div className="social-media">
                        <div className="entry">
                            <img src="/gitlab-logo.svg" />
                            <div className="label">GITLAB</div>
                        </div>
                        <div className="entry">
                            <img src="/twitter.svg" />
                            <div className="label">TWITTER</div>
                        </div>
                        <div className="entry">
                            <img src="/cc-by.svg" />
                            <div className="label">CC BY 2.0</div>
                        </div>
                    </div>
                    <img className="dfg-logo" src="/dfg-logo.svg" />
                </Container>
            </div>
        </>
    );
};
