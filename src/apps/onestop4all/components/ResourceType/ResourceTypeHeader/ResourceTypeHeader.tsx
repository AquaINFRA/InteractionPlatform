import { Box, Flex, Divider } from "@open-pioneer/chakra-integration";
import { useNavigate } from "react-router-dom";
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
import { ResourceIcon } from "../../../views/Start/ResourceEntry/ResourceIcons";

export function ResourceTypeHeader(props: { resType: string }) {
    const { resType } = props;
    const navigate = useNavigate();

    return (
        <Flex alignItems="center" display="flex" gap="12px">
            <Box
                onClick={() => {
                    navigate(-1);
                }}
                _hover={{ cursor: "pointer" }}
            >
                <BackIcon />
            </Box>

            <Box
                className="resTypeHeaderBackBtn"
                onClick={() => {
                    navigate(-1);
                }}
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
