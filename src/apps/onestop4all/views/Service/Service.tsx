import { Box, Container, Image, Flex, Divider } from "@open-pioneer/chakra-integration";
import { SearchBar } from "../../components/SearchBar";
import { ResourceTypeHeader } from "../../components/ResourceType/ResourceTypeHeader/ResourceTypeHeader";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { RelatedContent } from "../../components/ResourceType/RelatedContent/RelatedContent";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { ResultsNavigation } from "../../components/ResultsNavigation/ResultsNavigation";
import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { MetadataSourceIcon, OpenCapabilitiesIcon } from "../../components/Icons";

export function ServiceView() {
    const metadataResponse = {
        resourceType: "Services",
        title: "WMS-Dienst des Deutschen Wetterdienst",
        abstract: "WMS Dienst für meteorologische und klimatologische Daten",
        serviceProvider: "Deutscher Wetterdienst",
        serviceType: "WMS",
        url: "https://maps.dwd.de/geoserver/ows?service=wms&version=1.3.0&request=GetCapabilities",
        keywords: [
            "humanGeographicViewer",
            "inspireidentifiziert",
            "meteorologisch",
            "Wetter",
            "meteorology",
            "Atmosphärische Bedingungen",
            "Deutschland"
        ],
        label: "NFDI4Earth Label",
        lastUpdate: "01.01.2015",
        relatedContentItems: [
            {
                resourceType: "Repositories / Archives",
                title: "Environmental Information Data Centre",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Services",
                title: "Environmental Information Data Centre",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Educational resources",
                title: "Environmental Information Data Centre",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Documents",
                title: "Environmental Information Data Centre",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Documents",
                title: "Environmental Information Data Centre",
                url: "https://www.nfdi4earth.de/"
            },
            {
                resourceType: "Documents",
                title: "Environmental Information Data Centre",
                url: "https://www.nfdi4earth.de/"
            }
        ]
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
                                        tag: "Service Provider",
                                        val: metadataResponse["serviceProvider"]
                                    },
                                    {
                                        tag: "Service Type",
                                        val: metadataResponse["serviceType"]
                                    },
                                    { tag: "URL", val: metadataResponse["url"] },
                                    { tag: "Keywords", val: metadataResponse["keywords"] },
                                    {
                                        tag: "Label",
                                        val: metadataResponse["label"]
                                    }
                                ]}
                                visibleElements={5}
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
                                label="OPEN CAPABILITIES"
                                icon={<OpenCapabilitiesIcon />}
                                variant="solid"
                                fun={fun}
                            />
                            <ActionButton
                                label="VISIT METADATA SOURCE"
                                icon={<MetadataSourceIcon color="#05668D" />}
                                variant="outline"
                                fun={fun}
                            />
                            <ActionButton
                                label="COPY PERMALINK"
                                icon={<LinkIcon color="#05668D" />}
                                variant="outline"
                                fun={fun}
                            />
                        </Box>
                    </Box>
                </Flex>
                <Box w="100%" pt="80px">
                    <Box>
                        <RelatedContent
                            relatedContentItems={metadataResponse["relatedContentItems"]}
                        />
                    </Box>
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
