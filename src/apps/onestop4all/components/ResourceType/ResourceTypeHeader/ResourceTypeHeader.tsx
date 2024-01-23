import { Box, Divider, Flex, Skeleton } from "@open-pioneer/chakra-integration";
import { useNavigate } from "react-router-dom";

import {
    BackIcon,
    DatasetIcon,
    DocumentsIcon,
    LearningResourceIcon,
    OrganisationsIcon,
    RepositoriesIcon,
    StandardIcon,
    ToolSoftwareIcon,
    SeriesIcon
} from "../../Icons";
import { ResourceType } from "../../../services/ResourceTypeUtils";

export function ResourceTypeHeader(props: { resType: ResourceType | undefined; loading: boolean }) {
    const { resType, loading = false } = props;
    const navigate = useNavigate();

    function backToSearch() {
        navigate({ pathname: "/search" });
    }

    return (
        <Flex alignItems="center" display="flex" gap="12px" height="32px">
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

            {loading ? (
                <Skeleton className="resTypeHeader">Loading...</Skeleton>
            ) : (
                <>
                    <Box className="resTypeHeader">{resType}</Box>
                    <Box>{getIcon()}</Box>
                </>
            )}
        </Flex>
    );

    function getIcon() {
        switch (resType) {
            case ResourceType.Repos:
                return <RepositoriesIcon />;
            case ResourceType.Tools:
                return <ToolSoftwareIcon />;
            case ResourceType.Standards:
                return <StandardIcon />;
            case ResourceType.Learning_Resource:
                return <LearningResourceIcon />;
            case ResourceType.LHB_Articles:
            case ResourceType.Articles:
                return <DocumentsIcon />;
            case ResourceType.Organisations:
                return <OrganisationsIcon />;
            // case ResourceType.Services:
            //     return <ServicesIcon />;
            case ResourceType.Dataset:
                return <DatasetIcon />;
            case ResourceType.Software:
                return <ToolSoftwareIcon />;
            case ResourceType.Series:
                return <SeriesIcon />;
            default:
                return <></>;
        }
    }
}
