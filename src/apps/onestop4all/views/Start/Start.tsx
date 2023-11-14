import { Box, Container, Flex, Image } from "@open-pioneer/chakra-integration";
import { ParentSize } from "@visx/responsive";
import { useIntl } from "open-pioneer:react-hooks";

import NetworkGraph from "../../components/Graph/NetworkGraph";
import { SearchBar } from "../../components/SearchBar";
import { HowToEntry } from "./HowTo/HowToEntry";
import { ParticipateEntry, ParticipateEntryProps } from "./ParticipateEntry/ParticipateEntry";
import { ResourceEntries } from "./ResourceEntries/ResourceEntries";

export function StartView() {
    const intl = useIntl();
    const getInvolvedEntries: ParticipateEntryProps[] = [
        {
            imageUrl: "image1.png",
            text: intl.formatMessage({ id: "start.get-involved.entry-1" })
        },
        {
            imageUrl: "image2.png",
            text: intl.formatMessage({ id: "start.get-involved.entry-2" })
        },
        {
            imageUrl: "image3.png",
            text: intl.formatMessage({ id: "start.get-involved.entry-3" })
        },
        {
            imageUrl: "image4.png",
            text: intl.formatMessage({ id: "start.get-involved.entry-4" })
        },
        {
            imageUrl: "image5.png",
            text: intl.formatMessage({ id: "start.get-involved.entry-5" })
        }
    ];

    const richTextIntl = {
        bold: (chunks: string[]) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            chunks.map((chunk, i) => (<b key={`bold_${i}`}>{chunks[0]}</b>) as any)
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
                key="3"
                rel="noreferrer"
                href={intl.formatMessage({
                    id: "start.mission.links.ResourcesLinkUrl"
                })}
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

                <Box className="how-to">
                    <Box className="text-centered-box">
                        <Box className="text-centered-box-header">
                            {intl.formatMessage({ id: "start.how-to.title" })}
                        </Box>
                        <Box className="text-centered-box-text">
                            {intl.formatMessage({ id: "start.how-to.description" })}
                        </Box>
                    </Box>

                    <Flex className="how-to-entries" gap="32px">
                        <HowToEntry
                            heading={intl.formatMessage({
                                id: "start.how-to.how-to-entries-1.title"
                            })}
                            description={intl.formatMessage({
                                id: "start.how-to.how-to-entries-1.description"
                            })}
                        />

                        <HowToEntry
                            heading={intl.formatMessage({
                                id: "start.how-to.how-to-entries-2.title"
                            })}
                            description={intl.formatMessage({
                                id: "start.how-to.how-to-entries-2.description"
                            })}
                        />

                        <HowToEntry
                            heading={intl.formatMessage({
                                id: "start.how-to.how-to-entries-3.title"
                            })}
                            description={intl.formatMessage({
                                id: "start.how-to.how-to-entries-3.description"
                            })}
                        />

                        <HowToEntry
                            heading={intl.formatMessage({
                                id: "start.how-to.how-to-entries-4.title"
                            })}
                            description={intl.formatMessage({
                                id: "start.how-to.how-to-entries-4.description"
                            })}
                        />
                    </Flex>
                </Box>
            </Container>

            <Box className="resources">
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
            </Container>

            <Container maxW={{ base: "100%", custombreak: "80%" }}>
                <Box className="get-involved">
                    <Box className="text-centered-box">
                        <Box className="text-centered-box-header">
                            {intl.formatMessage({ id: "start.get-involved.title" })}
                        </Box>
                        <Box className="text-centered-box-text">
                            {intl.formatMessage({ id: "start.get-involved.description" })}
                        </Box>
                    </Box>

                    <Flex
                        className="entries"
                        justifyContent="space-between"
                        pt="32px"
                        overflow="auto"
                    >
                        {getInvolvedEntries.map((e, i) => (
                            <Box key={i}>
                                <ParticipateEntry {...e}></ParticipateEntry>
                            </Box>
                        ))}
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
}
