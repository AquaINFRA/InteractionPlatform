import React from "react";
import { Box, Flex } from "@open-pioneer/chakra-integration";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { ZenodoResultItem } from "../../services/SearchService";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";

export interface SoftwareViewProps {
    item: ZenodoResultItem;
}

export function SoftwareView(props: SoftwareViewProps) {
    const object = props.item;
    const metadata = object.metadata;
    console.log(object);

    return (
        <Box>
            <Flex gap="10%">
                <Box w="65%">
                    {metadata.title ? (
                        <Box className="title" pt="15px">
                            {metadata.title}
                        </Box>
                    ) : null}
                    <Box pt="36px">
                        <Metadata
                            metadataElements={[
                                {
                                    element: "programmingLanguage",
                                    tag: "Programming languages",
                                    val: ["R", "Python", "XML"]
                                },
                                {
                                    element: "created",
                                    tag: "Created",
                                    val: "2024-10-31T08:38:41.003327+00:00"
                                },
                                {
                                    element: "modified",
                                    tag: "Modified",
                                    val: "2024-10-31T09:56:57.817489+00:00"
                                },
                                {
                                    element: "keywords",
                                    tag: "Keywords",
                                    val: [ "AquaINFRA", "OGC API Processes", "Galaxy" ]
                                },
                                {
                                    element: "lang",
                                    tag: "Language",
                                    val: "English"
                                },
                                {
                                    element: "license",
                                    tag: "License",
                                    val: "Apache License 2.0"
                                },
                                {
                                    element: "version",
                                    tag: "Version",
                                    val: "1.0"
                                }
                            ]}
                            visibleElements={3}
                            expandedByDefault={false}
                        />
                    </Box>
                    {metadata.description ? (
                        <Box>
                            <Box>
                                <Abstract abstractText={metadata.description} />
                            </Box>
                            <Box
                                dangerouslySetInnerHTML={{ __html: '<iframe title="Galaxy Workflow Embed" style="width: 100%; height: 700px; border: none;" src="https://aqua.usegalaxy.eu/published/workflow?id=d2cea0f0800891bf&embed=true&buttons=true&about=false&heading=false&minimap=true&zoom_controls=true&initialX=-20&initialY=-20&zoom=1"></iframe>' }}
                            />
                        </Box>
                    ) : null}
                </Box>
                <Box w="25%">
                    <Box>
                        <div className="abstractSectionHeader">Access Workflow</div>
                        <Box pt={3}>
                            <div className="seperator" />
                            <div>
                                <span className="metadataTag">Title: </span>
                                <span className="metadataValue">Visit worflow in Galaxy</span>
                            </div>
                            <Flex flexDirection="column"> 
                                <Box pt={3}>
                                    <ActionButton
                                        label="Visit"
                                        icon={<ExternalLinkIcon color="white" />}
                                        variant="solid"
                                        fun={() => window.open("https://aqua.usegalaxy.eu/published/workflow?id=d2cea0f0800891bf" as string, "_blank")} // Opens the visit link in a new tab
                                    />
                                </Box>
                            </Flex>
                        </Box>
                        <Box pt={3}>
                            <div className="seperator" />
                            <div>
                                <span className="metadataTag">Title: </span>
                                <span className="metadataValue">Visit repository</span>
                            </div>
                            <Flex flexDirection="column"> 
                                <Box pt={3}>
                                    <ActionButton
                                        label="Visit"
                                        icon={<ExternalLinkIcon color="white" />}
                                        variant="solid"
                                        fun={() => window.open("https://sandbox.zenodo.org/records/123424" as string, "_blank")} // Opens the visit link in a new tab
                                    />
                                </Box>
                            </Flex>
                        </Box>
                        <Box pt={3}>
                            <div className="seperator" />
                        </Box>
                        <Box pt={3}>
                            <div className="abstractSectionHeader">Input Data</div>
                        </Box>
                        <Box pt={3}>
                            <div className="seperator" />
                            <div>
                                <span className="metadataTag">Title: </span>
                                <span className="metadataValue">Regions</span>
                            </div>
                            <Flex flexDirection="column"> 
                                <Box pt={3}>
                                    <ActionButton
                                        label="Visit"
                                        icon={<ExternalLinkIcon color="white" />}
                                        variant="solid"
                                        fun={() => window.open("https://aquainfra.dev.52north.org/result/aquainfra-platform:3bc62e14-e6b3-476e-9be2-989477fea534" as string, "_blank")} // Opens the visit link in a new tab
                                    />
                                </Box>
                            </Flex>
                        </Box>
                        <Box pt={3}>
                            <div className="seperator" />
                            <div>
                                <span className="metadataTag">Title: </span>
                                <span className="metadataValue">Points</span>
                            </div>
                            <Flex flexDirection="column"> 
                                <Box pt={3}>
                                    <ActionButton
                                        label="Visit"
                                        icon={<ExternalLinkIcon color="white" />}
                                        variant="solid"
                                        fun={() => window.open("https://aquainfra.dev.52north.org/result/helcom:c0d4c02f-4617-4636-94ef-8ea129094b52" as string, "_blank")} // Opens the visit link in a new tab
                                    />
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}
