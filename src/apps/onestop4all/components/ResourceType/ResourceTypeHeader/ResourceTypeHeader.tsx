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

            <Box className="ResTypeHeaderBackBtn">
                <a href="/search">
                    <span className="to">Back&nbsp;</span>
                    to result list
                </a>
            </Box>

            <Divider className="ResTypeHeaderLine" />

            <Box className="resourceTypeHeader">{resourceType}</Box>

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
