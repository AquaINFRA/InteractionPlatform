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

export function DatasetView() {
    const metadataResponse = {
        resourceType: "Datasets",
        title: "2m temperature at RBSN stations",
        alsoKnownAs: "2m Temperatur an RBSN Stationen",
        abstract:
            "Messwerte der 2m Temperatur an den DWD Stationen im Regional Basic Synoptic Network der WMO. Erweitert um weitere Stationen der Grundversorgung. 2m temperature measurements at DWD stations in the Regional Basic Synoptic Network of the WMO, plus additional stations from the so called 'Global Dataset' of DWD.",
        dateOfPublication: "25.02.2016",
        dataAggregator: "Deutscher Wetterdienst",
        dataSourceUrl: "https://geoportal.de/Metadata/de.dwd.geoserver.fach.RBSN_T2m",
        supportedFormat: "XML",
        keywords: [
            "meteorological",
            "inspireidentifiziert",
            "humanGeographicViewer",
            "Temperatur 2m überGrund",
            "Temperatur",
            "meteorology",
            "Meteorologisch-geografische Kennwerte",
            "Deutschland"
        ],
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
        location: "POLYGON ((5.77 47.22, 6.77 55.1, 16.16 55.1, 15.17 47.22, 5.77 47.22))",
        referenceSystems: ["EPSG: 4258", "EPSG 4326"]
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
                        <ResourceTypeHeader resType="Dataset" />
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
                                        tag: "Date of publication",
                                        val: metadataResponse["dateOfPublication"]
                                    },
                                    {
                                        tag: "Data aggregator",
                                        val: metadataResponse["dataAggregator"]
                                    },
                                    {
                                        tag: "Data Source URL",
                                        val: metadataResponse["dataSourceUrl"]
                                    },
                                    {
                                        tag: "Supported formats",
                                        val: metadataResponse["supportedFormat"]
                                    },
                                    {
                                        tag: "Keywords",
                                        val: metadataResponse["keywords"]
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
                                label="Open repository"
                                icon={<ExternalLinkIcon color="white" />}
                                variant="solid"
                                fun={fun}
                            />
                            <ActionButton
                                label="Download metadata"
                                icon={<DownloadMetadataIcon />}
                                variant="outline"
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
                    <SpatialInformation
                        metadataElements={[
                            {
                                tag: "Bounding box",
                                val: metadataResponse["location"]
                            },
                            {
                                tag: "Reference systems",
                                val: metadataResponse["referenceSystems"]
                            }
                        ]}
                        bbox={metadataResponse["location"]}
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
