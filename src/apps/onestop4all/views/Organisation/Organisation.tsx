import { Box, Container, Image, Flex, Divider } from "@open-pioneer/chakra-integration";
import { SearchBar } from "../../components/SearchBar";
import { ResourceTypeHeader } from "../../components/ResourceType/ResourceTypeHeader/ResourceTypeHeader";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { RelatedContent } from "../../components/ResourceType/RelatedContent/RelatedContent";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { ResultsNavigation } from "../../components/ResultsNavigation/ResultsNavigation";
import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { MetadataSourceIcon, DownloadMetadataIcon } from "../../components/Icons";
import { SpatialInformation } from "../../components/ResourceType/SpatialInformation/SpatialInformation";
import { Contact } from "../../components/ResourceType/Contact/Contact";

export function OrganisationView() {
    const metadataResponse = {
        resourceType: "Organisations",
        title: "Deutsches Klimarechenzentrum",
        alsoKnownAs: "DKRZ, German Climate Computing Centre",
        abstract:
            "The German Climate Computing Center (Deutsches Klimarechenzentrum, DKRZ) is a central service center for German climate and earth system research. Its high performance computers, data storage and services form the central research infrastructure for simulation-based climate science in Germany. Apart from providing computing power, data storage capacity and technical support for models and simulations in climate research, DKRZ offers its scientific users an extensive portfolio of tailor-made services. It maintains and develops application software relevant to climate research and supports its users in matters of data processing. Finally, DKRZ also participates in national and international joint projects and cooperations with the aim of improving the infrastructure for climate modeling. DKRZ was founded on November 11, 1987 and took up its services on January 1, 1988. It is a non-profit and non-commercial limited company with four shareholders: The Max Planck Society The Freie und Hansestadt Hamburg, represented by the University of Hamburg The Alfred Wegener Institute - Helmholtz Centre for Polar and Marine Research and the Helmholtz Zentrum Hereon Moreover, DKRZ is sponsored by the Federal Ministry of Education and Research and the The Helmholtz Association of German Research Centres. DKRZ provides its resources (computing time, hard-drive storage and archive capacity, consultancy and visualizations) free of charge. Any scientists conducting research in the field of climate and earth system science in Germany, and requiring HPC resources for their work may apply for resources at DKRZ. DKRZ engages more than 100 employees, mainly with a background in natural and/or computer sciences and is devided into three scientific departments - Application Support, Data Management and Systems - and the Administration. Furthermore, the Managing Director of DKRZ, Prof. Dr. Thomas Ludwig, also heads the scientific computing group of the department of Informatics at the University of Hamburg, which is located in the same building and strongly collaborates with DKRZ. Our vision: The DKRZ will dependably unlock the potential of rapid technological advances for the benefit of climate research.",
        organisationType: "Facility",
        organisationUrl: "https://www.dkrz.de/",
        rorUrl: "https://ror.org/03ztgj037",
        relatedContentItems: [
            {
                resourceType: "Educational resources",
                title: "Earth System Science Data Analytics: Introduction to Python",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Educational resources",
                title: "How to create publishable netcdf-data",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Educational resources",
                title: "How to create publishable netcdf-data",
                url: "https://www.nfdi4earth.de/"
            }
        ],
        location: [[[9.976106388256488, 53.567053294230824]]],
        address: "Bundesstraße 45a, 20146 Hamburg, Germany"
    };

    const fun = () => {
        console.log("This is a fun");
    };

    return (
        <Box>
            <Box position="relative">
                <Image src="/image2.png" width="100%" />
            </Box>

            <Box position="absolute" width="100%" marginTop="-70px">
                <Container maxW="80%">
                    <SearchBar></SearchBar>
                </Container>
            </Box>

            <Container maxW="80%">
                <Box height="80px" />
                <Flex gap="10%">
                    <Box w="65%">
                        <ResourceTypeHeader resType={metadataResponse["resourceType"]} />
                        <Box className="title" pt="15px">
                            {metadataResponse["title"]}
                        </Box>
                        <Box pt="36px">
                            <Metadata
                                metadataElements={[
                                    {
                                        tag: "Also known as",
                                        val: metadataResponse["alsoKnownAs"]
                                    },
                                    {
                                        tag: "Organisation type",
                                        val: metadataResponse["organisationType"]
                                    },
                                    {
                                        tag: "Organisation URL",
                                        val: metadataResponse["organisationUrl"]
                                    },
                                    {
                                        tag: "ROR URL",
                                        val: metadataResponse["rorUrl"]
                                    }
                                ]}
                                visibleElements={3}
                                expandedByDefault={true}
                            />
                        </Box>
                        <Box pt="80px">
                            <Abstract abstractText={metadataResponse["abstract"]} />
                        </Box>
                    </Box>
                    <Box w="25%">
                        <ResultsNavigation result={1} of={100} />
                        <Box className="actionButtonGroup" pt="74px">
                            <ActionButton
                                label="Visit organisation"
                                icon={<ExternalLinkIcon color="white" />}
                                variant="solid"
                                fun={fun}
                            />
                            <ActionButton
                                label="Visit metadata source"
                                icon={<MetadataSourceIcon color="#05668D" />}
                                variant="outline"
                                fun={fun}
                            />
                            <ActionButton
                                label="Copy permalink"
                                icon={<LinkIcon color="#05668D" />}
                                variant="outline"
                                fun={fun}
                            />
                        </Box>
                    </Box>
                </Flex>
                <Box pt="80px">
                    <Contact
                        address={{
                            tag: "Address",
                            val: metadataResponse["address"]
                        }}
                        location={metadataResponse["location"]}
                    />
                </Box>
                <Box w="100%" pt="80px">
                    <RelatedContent relatedContentItems={metadataResponse["relatedContentItems"]} />
                    <Flex gap="10%" alignItems="center" pt="120px">
                        <Divider className="seperator" w="65%" />
                        <Box w="25%">
                            <ResultsNavigation result={1} of={100} />
                        </Box>
                    </Flex>
                </Box>
                <Box pt="135px" />
            </Container>
        </Box>
    );
}
