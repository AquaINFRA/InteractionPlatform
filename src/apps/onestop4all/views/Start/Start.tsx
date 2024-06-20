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
                <Box position="absolute" w="100%" top="0">
                    <Container maxW={{ base: "100%", custombreak: "80%" }}>
                        <Flex
                            pt={{ base: "10px", custombreak: "60px" }}
                            textAlign="center"
                            justifyContent="flex-end"
                        >
                            <Box
                                maxW={{ base: "80%", custombreak: "45%" }}
                                fontSize={{ base: "16px", custombreak: "24px" }}
                                //top={"50px"}
                                color="#4f4f4f"
                            >
                                {intl.formatMessage({ id: "start.banner.slogan" }, richTextIntl)}
                            </Box>
                        </Flex>
                    </Container>
                    <Container maxW={{ base: "100%", custombreak: "80%" }}>
                        <SearchBar />
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
            </Box>

            <Container maxW={{ base: "100%", custombreak: "80%" }}>
                <Box minH={{ base: "1700px", custombreak: "2700px" }}></Box>

                <div className="seperator"></div>
            </Container>

            {/*<Box className="caseStudies" ref={resourcesSectionRef}>
                <Container maxW={{ base: "100%" }}>
                    <Box className="mission">
                        <Box className="mission-text text-centered-box">
                            <Box className="text-centered-box-text"><CaseStudies /></Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Box className="resources" ref={resourcesSectionRef}>
                <Container maxW={{ base: "100%" }}>
                    <Box className="mission">
                        <Box className="mission-text text-centered-box">
                            <Box className="text-centered-box-text"><DemonstratorEntries /></Box>
                        </Box>
                    </Box>
                </Container>
            </Box>}

            {<Box className="caseStudies" ref={resourcesSectionRef}>
                <Container maxW={{ base: "100%" }}>
                    <Box className="mission">
                        <Box className="mission-text text-centered-box">
                            <Box className="text-centered-box-text"><LatestAdditions /></Box>
                        </Box>
                    </Box>
                </Container>
            </Box>*/}
        </Box>
    );
}
