import { Box, Flex, Divider } from "@open-pioneer/chakra-integration";
import {
    StandardIcon,
    EducationalResourceIcon,
    BackIcon,
    RepositoriesIcon,
    ServicesIcon,
    ToolSoftwareIcon,
    DocumentsIcon,
    OrganisationsIcon
} from "../../Icons";
import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";

export function ResourceTypeHeader(props: { resType: string }) {
    const resourceType = props.resType;

    return (
        <Flex alignItems="center">
            <Box>
                <a href="/search?">
                    <BackIcon />
                </a>
            </Box>

            <Box className="back">
                <a href="/search">
                    <span className="to">Back&nbsp;</span>
                    <span className="resultList">to result list</span>
                </a>
            </Box>

            <Divider className="inbetweenLine" />

            <Box className="resourceType">{resourceType}</Box>

            <Box>
                {resourceType == ResourceType.Repos ? (
                    <RepositoriesIcon />
                ) : resourceType == ResourceType.Services ? (
                    <ServicesIcon />
                ) : resourceType == ResourceType.Tools ? (
                    <ToolSoftwareIcon />
                ) : resourceType == ResourceType.Standards ? (
                    <StandardIcon />
                ) : resourceType == ResourceType.Educational ? (
                    <EducationalResourceIcon />
                ) : resourceType == ResourceType.Documents ? (
                    <DocumentsIcon />
                ) : resourceType == ResourceType.Organisations ? (
                    <OrganisationsIcon />
                ) : (
                    <></>
                )}
            </Box>
        </Flex>
    );
}
