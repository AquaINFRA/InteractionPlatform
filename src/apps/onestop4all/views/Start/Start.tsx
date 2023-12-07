import { Box, Container, Flex, Image } from "@open-pioneer/chakra-integration";
import { ParentSize } from "@visx/responsive";
import { useIntl } from "open-pioneer:react-hooks";

import NetworkGraph from "../../components/Graph/NetworkGraph";
import { SearchBar } from "../../components/SearchBar";
import { ParticipateEntries } from "./ParticipateEntries/ParticipateEntries";
import { ResourceEntries } from "./ResourceEntries/ResourceEntries";
import { HowToEntries } from "./HowTo/HowToEntries";
import { useRef } from "react";

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
        NFDI4EarthLink: (
            <a
                className="link"
                target="_blank"
                key="1"
                rel="noreferrer"
                href={intl.formatMessage({
                    id: "start.mission.links.NFDI4EarthLinkUrl"
                })}
            >
                {intl.formatMessage({
                    id: "start.mission.links.NFDI4EarthLinkLabel"
                })}
            </a>
        ),
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
        ResourcesLink: (
            <a
                className="link"
                target="_blank"
                rel="noreferrer"
                key="3"
                onClick={scrollToResources}
                style={{ cursor: "pointer" }}
            >
                {intl.formatMessage({
                    id: "start.mission.links.ResourcesLinkLabel"
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
                <Box w="100%" position="absolute" top="0">
                    <Container maxW={{ base: "100%", custombreak: "80%" }}>
                        <Flex pt="60px" textAlign="center" justifyContent="flex-end">
                            <Box
                                maxW={{ base: "70%", custombreak: "50%" }}
                                fontSize={{ base: "16px", custombreak: "24px" }}
                                color="white"
                            >
                                {intl.formatMessage({ id: "start.banner.slogan" }, richTextIntl)}
                            </Box>
                        </Flex>
                    </Container>
                </Box>
            </Box>

            <Box
                position="absolute"
                width="100%"
                marginTop={{ base: "-40px", custombreak: "-70px" }}
            >
                <Container maxW={{ base: "100%", custombreak: "80%" }}>
                    <SearchBar></SearchBar>
                </Container>
            </Box>

            <Container maxW={{ base: "100%", custombreak: "80%" }}>
                <Box height="80px"></Box>

                <Box className="mission">
                    <Image className="bg-icon" alt="Bg icon" src="/bg-icon.png" />
                    <Box className="mission-text text-centered-box">
                        <Box className="text-centered-box-text">
                            {intl.formatMessage(
                                { id: "start.mission.slogan" },
                                {
                                    ...richTextIntl,
                                    ...missionLinksIntl
                                }
                            )}
                        </Box>
                    </Box>
                </Box>

                <div className="seperator"></div>

                <HowToEntries lang={intl.locale} />
            </Container>

            <Box className="resources" ref={resourcesSectionRef}>
                <Container maxW={{ base: "100%", custombreak: "80%" }}>
                    <Box className="text-centered-box">
                        <Box className="text-centered-box-header">
                            {intl.formatMessage({ id: "start.resources.title" })}
                        </Box>
                        <Box className="text-centered-box-text">
                            {intl.formatMessage(
                                { id: "start.resources.description" },
                                { ...richTextIntl, ...resourcesLinksIntl }
                            )}
                        </Box>
                    </Box>

                    <Box pt="32px" overflow="auto">
                        <ResourceEntries></ResourceEntries>
                    </Box>
                </Container>
            </Box>

            <Container maxW={{ base: "100%", custombreak: "80%" }}>
                <Box className="graph">
                    <Box className="text-centered-box">
                        <Box className="text-centered-box-header">
                            {intl.formatMessage({ id: "start.graph.title" })}
                        </Box>
                        <Box className="text-centered-box-text">
                            {intl.formatMessage({ id: "start.graph.description" })}
                        </Box>
                    </Box>
                    <Box pt={"16px"}>
                        <ParentSize>
                            {(parent) => <NetworkGraph width={parent.width} height={500} />}
                        </ParentSize>
                    </Box>
                </Box>
                <ParticipateEntries lang={intl.locale} />
            </Container>
        </Box>
    );
}
