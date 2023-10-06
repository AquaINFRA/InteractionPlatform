import { Box, Container, Flex, Image } from "@open-pioneer/chakra-integration";
import { ParentSize } from "@visx/responsive";

import NetworkGraph from "../../components/Graph/NetworkGraph";
import { SearchBar } from "../../components/SearchBar";
import { HowToEntry } from "./HowTo/HowToEntry";
import { ParticipateEntry, ParticipateEntryProps } from "./ParticipateEntry/ParticipateEntry";
import { ResourceEntries } from "./ResourceEntries/ResourceEntries";

export function StartView() {
    const getInvolvedEntries: ParticipateEntryProps[] = [
        {
            imageUrl: "image1.png",
            text: "Apply for a pilot or incubator"
        },
        {
            imageUrl: "image2.png",
            text: "Join the NFDI4Earth Academy"
        },
        {
            imageUrl: "image3.png",
            text: "Join or propose an NFDI4Earth Interest Group"
        },
        {
            imageUrl: "image4.png",
            text: "Contribute a Living Handbook article"
        },
        {
            imageUrl: "image5.png",
            text: "Sign the NFDI4Earth FAIRness & Openness Commitment"
        }
    ];

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
                                Your One-Stop to FAIR, open and innovative Research Data Management
                                in <span style={{ fontWeight: 700 }}>Earth System Sciences</span>.
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

                <Box className="how-to">
                    <Box className="text-centered-box">
                        <Box className="text-centered-box-header">
                            We provide guidance on Research Data Management in ESS
                        </Box>
                        <Box className="text-centered-box-text">
                            Here, you will find introductory articles to research data management in
                            the ESS.
                        </Box>
                    </Box>

                    <Flex className="how-to-entries" gap="32px">
                        <HowToEntry
                            description="Data and service discovery benefits from complete and up-to-date metadata and description of spatio-temporal context..."
                            heading="Discover and Explore Earth Data Sources"
                        />

                        <HowToEntry
                            description="Simplifying FAIR data publications and implementing curation with affordable efforts becomes increasingly important..."
                            heading="Data Publication and Data Curation"
                        />

                        <HowToEntry
                            description="Implementing FAIR, open and innovative RDM in ESS needs methods and services along all phases of the research data life cycle..."
                            heading="Research Data Management"
                        />

                        <HowToEntry
                            description="Sharing concepts of dataflows, distributed data processing and data portal technologies is key to create innovative data products..."
                            heading="Create and publish Information Products"
                        />
                    </Flex>
                </Box>
            </Container>

            <Box className="resources">
                <Container maxW={{ base: "100%", custombreak: "80%" }}>
                    <Box className="text-centered-box">
                        <Box className="text-centered-box-header">
                            We provide a harmonized view on linked ESS resources
                        </Box>
                        <Box className="text-centered-box-text">
                            Here you will find easy access to relevant resources from the Earth
                            System Sciences provided by the{" "}
                            <span className="link">NFDI4Earth members</span> and the{" "}
                            <span className="link">ESS community</span>.
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
                            We show how the resources are linked
                        </Box>
                        <Box className="text-centered-box-text">
                            Here you will get a graph-based overview on related resources to start
                            exploration.
                        </Box>
                    </Box>
                    <Box pt={"16px"}>
                        {/* <Graph data={[1, 2, 3, 4, 5, 6]}></Graph> */}
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
                            We welcome your participation
                        </Box>
                        <Box className="text-centered-box-text">
                            NFDI4Earth is a community-driven process. We welcome you to join our
                            NFDI4Earth activities. Here you will find information on how to
                            participate.
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
