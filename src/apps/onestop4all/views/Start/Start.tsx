import { Box, Container, Flex } from "@open-pioneer/chakra-integration";
//import { ParentSize } from "@visx/responsive";
import { useIntl } from "open-pioneer:react-hooks";

import { SearchBar } from "../../components/SearchBar";
import { DemonstratorEntries } from "./Demonstrator/DemonstratorEntries";
import { CaseStudies } from "./CaseStudies/CaseStudies";
import { useRef } from "react";
import { LatestAdditions } from "./LatestAdditions/LatestAdditions";

export function StartView() {
    const intl = useIntl();

    const richTextIntl = {
        bold: (chunks: string[]) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            chunks.map((chunk, i) => (<b key={`bold_${i}`}>{chunks[0]}</b>) as any)
    };

    const resourcesSectionRef = useRef<HTMLInputElement>(null);
    const scrollToResources = () => {
        if (resourcesSectionRef.current) {
            resourcesSectionRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    };

    const missionLinksIntl = {
        MissionLink: (
            <a
                className="link"
                target="_blank"
                rel="noreferrer"
                key="2"
                href={intl.formatMessage({
                    id: "start.mission.links.MissionLinkUrl"
                })}
            >
                {intl.formatMessage({
                    id: "start.mission.links.MissionLinkLabel"
                })}
            </a>
        ),
        TrainingLink: (
            <a
                className="link"
                target="_blank"
                rel="noreferrer"
                key="4"
                href={intl.formatMessage({
                    id: "start.mission.links.TrainingLinkUrl"
                })}
            >
                {intl.formatMessage({
                    id: "start.mission.links.TrainingLinkLabel"
                })}
            </a>
        )
    };

    const resourcesLinksIntl = {
        MembersLink: (
            <a
                className="link"
                target="_blank"
                key="1"
                rel="noreferrer"
                href={intl.formatMessage({
                    id: "start.resources.links.MembersLinkUrl"
                })}
            >
                {intl.formatMessage({
                    id: "start.resources.links.MembersLinkLabel"
                })}
            </a>
        ),
        CommunityLink: (
            <a
                className="link"
                target="_blank"
                key="2"
                rel="noreferrer"
                href={intl.formatMessage({
                    id: "start.resources.links.CommunityLinkUrl"
                })}
            >
                {intl.formatMessage({
                    id: "start.resources.links.CommunityLinkLabel"
                })}
            </a>
        )
    };

    return (
        <Box className="start-view">
            <Box position="relative">
                <Box className="header-image" />
                <Box
                    position="absolute"
                    width="100%"
                    marginTop={{ base: "-40px", custombreak: "-170px" }}
                >
                    <Container maxW={{ base: "100%", custombreak: "80%" }}>
                        <Flex pt="60px" textAlign="center" justifyContent="flex-end">
                            <Box
                                maxW={{ base: "70%", custombreak: "45%" }}
                                fontSize={{ base: "16px", custombreak: "24px" }}
                                color="#737373"
                            >
                                {intl.formatMessage({ id: "start.banner.slogan" }, richTextIntl)}
                            </Box>
                        </Flex>
                    </Container>
                    <Container maxW={{ base: "100%", custombreak: "80%" }}>
                        <SearchBar></SearchBar>
                    </Container>
                </Box>
            </Box>

            <Container maxW={{ base: "100%", custombreak: "80%" }}>
                <Box height="80px"></Box>

                <Box className="mission">
                    <Box className="text-centered-box">
                        <Box className="text-centered-box-text">
                            {intl.formatMessage(
                                { id: "start.mission.slogan" },
                                {
                                    ...richTextIntl,
                                    ...missionLinksIntl
                                }
                            )}
                        </Box>
                        <Box paddingTop={10}>
                            <iframe 
                                width="760" 
                                height="409" 
                                src="https://www.youtube.com/embed/-SRh9k44IRo?si=5VsH34-Qs6RZdvGc" 
                                title="YouTube video player" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            />
                        </Box>
                    </Box>
                </Box>

                <div className="seperator"></div>
            </Container>

            <Box className="caseStudies" ref={resourcesSectionRef}>
                <Container maxW={{ base: "100%" }}>
                    <Box className="mission">
                        <Box className="mission-text text-centered-box">
                            <Box className="text-centered-box-text">{/*<CaseStudies />*/}</Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Box className="resources" ref={resourcesSectionRef}>
                <Container maxW={{ base: "100%" }}>
                    <Box className="mission">
                        <Box className="mission-text text-centered-box">
                            <Box className="text-centered-box-text">{<DemonstratorEntries />}</Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Box className="caseStudies" ref={resourcesSectionRef}>
                <Container maxW={{ base: "100%" }}>
                    <Box className="mission">
                        <Box className="mission-text text-centered-box">
                            <Box className="text-centered-box-text">{/*<LatestAdditions />*/}</Box>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
