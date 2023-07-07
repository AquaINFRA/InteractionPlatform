import { Box, Container, Flex, Image, Spacer } from "@open-pioneer/chakra-integration";

import { SearchBar } from "../../components/SearchBar";
import { HowToEntry } from "./HowTo/HowToEntry";
import { ResourceEntry, ResourceEntryProps, ResourceType } from "./ResourceEntry/ResourceEntry";

export function StartView() {
    const resources: ResourceEntryProps[] = [
        {
            resourceType: ResourceType.Repos,
            resultCount: 958
        },
        {
            resourceType: ResourceType.Services,
            resultCount: 86
        },
        {
            resourceType: ResourceType.Tools,
            resultCount: 75
        },
        {
            resourceType: ResourceType.Standards,
            resultCount: 54
        },
        {
            resourceType: ResourceType.Educational,
            resultCount: 325
        },
        {
            resourceType: ResourceType.Documents,
            resultCount: 52364
        },
        {
            resourceType: ResourceType.Organisations,
            resultCount: 216
        }
    ];
    return (
        <>
            <Box position="relative">
                <Image src="/image1.png" width="100%" />
                <Box w="100%" position="absolute" top="0">
                    <Container maxW="80%">
                        <Flex pt="60px" color="white" textAlign="center" fontSize="24px">
                            <Spacer></Spacer>
                            <Box w="50%">
                                <div>Your One-Stop to FAIR, open and innovative</div>
                                <div>
                                    Research Data Management in{" "}
                                    <span style={{ fontWeight: 700 }}>Earth System Sciences</span>.
                                </div>
                            </Box>
                        </Flex>
                    </Container>
                </Box>
            </Box>

            <Box position="absolute" width="100%" marginTop="-70px">
                <Container maxW="80%">
                    <SearchBar></SearchBar>
                </Container>
            </Box>

            <Container maxW="80%">
                <Box height="80px"></Box>

                <Box className="mission">
                    <img className="bg-icon" alt="Bg icon" src="/bg-icon.png" />
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
                <Container maxW="80%">
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

                    <Flex justifyContent="space-between" pt="32px">
                        {resources.map((e, i) => (
                            <Box key={i} flex="1 1 0px">
                                <ResourceEntry {...e}></ResourceEntry>
                            </Box>
                        ))}
                    </Flex>
                </Container>
            </Box>
        </>
    );
}
