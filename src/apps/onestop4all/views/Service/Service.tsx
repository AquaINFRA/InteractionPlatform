import { LinkIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@open-pioneer/chakra-integration";

import { MetadataSourceIcon, OpenCapabilitiesIcon } from "../../components/Icons";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { SpatialInformation } from "../../components/ResourceType/SpatialInformation/SpatialInformation";

export function ServiceView() {
    const metadataResponse = {
        resourceType: "Services",
        title: "WMS-Dienst des Deutschen Wetterdienst",
        abstract: "WMS Dienst für meteorologische und klimatologische Daten.",
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
        ],
        location: "POLYGON ((5.77 47.22, 6.77 55.1, 16.16 55.1, 15.17 47.22, 5.77 47.22))",
        referenceSystems: [
            "EPSG:3044",
            "EPSG:3045",
            "EPSG:3413",
            "EPSG:3857",
            "EPSG 4258",
            "EPSG 4326",
            "EPSG:4839",
            "EPSG:25832",
            "EPSG:25833",
            "EPSG:31467",
            "EPSG:31468",
            "EPSG:900913",
            "EPSG:1000001"
        ]
    };

    const fun = () => {
        console.log("This is a fun");
    };
    return (
        <Box>
            <Flex gap="10%">
                <Box w="65%">
                    <Box className="title" pt="15px">
                        {metadataResponse["title"]}
                    </Box>
                    <Box pt="36px">
                        <Metadata
                            metadataElements={[
                                {
                                    tag: "Service provider",
                                    val: metadataResponse["serviceProvider"]
                                },
                                {
                                    tag: "Service type",
                                    val: metadataResponse["serviceType"]
                                },
                                { tag: "URL", val: metadataResponse["url"] },
                                { tag: "Keywords", val: metadataResponse["keywords"] },
                                {
                                    tag: "Label",
                                    val: metadataResponse["label"]
                                }
                            ]}
                            visibleElements={3}
                            expandedByDefault={false}
                        />
                    </Box>
                    <Box pt="80px">
                        <Abstract abstractText={metadataResponse["abstract"]} />
                    </Box>
                </Box>
                <Box w="25%">
                    {/* <ResourceResultPaging /> */}
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
        </Box>
    );
}
