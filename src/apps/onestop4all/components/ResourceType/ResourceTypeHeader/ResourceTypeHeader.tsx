import { Box, Divider, Flex } from "@open-pioneer/chakra-integration";
import { useNavigate } from "react-router-dom";

import { ResourceType } from "../../../views/Start/ResourceEntry/ResourceEntry";
import { ResourceIcon } from "../../../views/Start/ResourceEntry/ResourceIcons";
import {
    BackIcon,
    DocumentsIcon,
    EducationalResourceIcon,
    OrganisationsIcon,
    RepositoriesIcon,
    ServicesIcon,
    StandardIcon,
    ToolSoftwareIcon
} from "../../Icons";

export function ResourceTypeHeader(props: { resType: string }) {
    const { resType } = props;
    const navigate = useNavigate();

    function backToSearch() {
        navigate({ pathname: "/search" });
    }

    return (
        <Flex alignItems="center" display="flex" gap="12px">
            <Box onClick={backToSearch} _hover={{ cursor: "pointer" }}>
                <BackIcon />
            </Box>

            <Box
                className="resTypeHeaderBackBtn"
                onClick={backToSearch}
                _hover={{ cursor: "pointer" }}
            >
                <span className="to">Back&nbsp;</span>
                to result list
            </Box>

            <Divider className="resTypeHeaderLine" />

            <Box className="resTypeHeader">{resType}</Box>

            <Box>
                {resType == ResourceType.Repos ? (
                    <RepositoriesIcon />
                ) : resType == ResourceType.Services ? (
                    <ServicesIcon />
                ) : resType == ResourceType.Tools ? (
                    <ToolSoftwareIcon />
                ) : resType == ResourceType.Standards ? (
                    <StandardIcon />
                ) : resType == ResourceType.Educational ? (
                    <EducationalResourceIcon />
                ) : resType == ResourceType.Documents || resType == ResourceType.Articles ? (
                    <DocumentsIcon />
                ) : resType == ResourceType.Organisations ? (
                    <OrganisationsIcon />
                ) : resType == ResourceType.Datasets ? (
                    <ResourceIcon type={resType} size={32} /> //To do: make that consistent
                ) : resType == ResourceType.Documents ? (
                    <DocumentsIcon />
                ) : (
                    <></>
                )}
            </Box>
        </Flex>
    );
}
