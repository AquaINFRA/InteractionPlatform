import { ExternalLinkIcon, LinkIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@open-pioneer/chakra-integration";

import { MetadataSourceIcon, SeeOtherCoursesIcon } from "../../components/Icons";
import { Abstract } from "../../components/ResourceType/Abstract/Abstract";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";

export function OerView() {
    const metadataResponse = {
        resourceType: "Educational resources",
        title: "Earth System Science Data Analytics: Foundations of Image Processing",
        abstract:
            "This course is an online, open-access program that provides a comprehensive and interactive learning experience for students interested in the field of Earth system science. It is most suitable for master students in the remote sensing, cartography, and geodesy and geoinformatics programs. This course covers a range of topics related to geospatial data analysis, with a particular focus on image processing techniques. Students will gain practical skills in Python programming and libraries such as NumPy and OpenCV. The course also provides an online open-access and interactive coding exercise environment for students, allowing them to practice their skills and test their knowledge. Requirements Requirements for the course include a PC with internet access and basic knowledge of Python programming. What You Will Learn Basic image processing techniques, including grayscale conversion and histogram equalization Image filtering, including low-pass, high-pass, and median filters Morphological operations, including erosion, dilation, opening, and closing Thresholding techniques, including global and adaptive thresholding Extraction of regions and edges, including contour detection and watershed segmentation Geometric transformations of images, including rotation, translation, and scaling Harris corner detection for feature extraction.",
        resourceProviders: [
            {
                name: "Farzaneh Sadeghi",
                orcid: null
            },
            {
                name: "Carsten Kessler",
                orcid: null
            }
        ],
        dateOfPublication: "01.05.2023",
        language: "English",
        keywords: ["IPFS", "Pinning Service", "FAIR", "Open Science", "Climate"],
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
            }
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
                                    tag: "Resource providers",
                                    val: metadataResponse["resourceProviders"]
                                },
                                {
                                    tag: "Language",
                                    val: metadataResponse["language"]
                                },
                                {
                                    tag: "Date of publication",
                                    val: metadataResponse["dateOfPublication"]
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
                    <Box className="actionButtonGroup" pt="74px">
                        <ActionButton
                            label="Start learning"
                            icon={<ExternalLinkIcon color="white" />}
                            variant="solid"
                            fun={fun}
                        />
                        <ActionButton
                            label="See other courses"
                            icon={<SeeOtherCoursesIcon />}
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
        </Box>
    );
}
