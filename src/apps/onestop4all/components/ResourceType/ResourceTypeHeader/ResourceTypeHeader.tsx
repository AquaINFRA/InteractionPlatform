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
    SeriesIcon,
    ModelIcon
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
            case ResourceType.Dataset:
                return <DatasetIcon />;
            case ResourceType.Software:
                return <ToolSoftwareIcon />;
            case ResourceType.Series:
                return <SeriesIcon />;
            case ResourceType.Model:
                return <ModelIcon />;
            case ResourceType.Poster:
                return <ModelIcon />;
            case ResourceType.Other:
                return <ModelIcon />;
            case ResourceType.Presentation:
                return <ModelIcon />;
            case ResourceType.Workflow:
                return <ModelIcon />;
            case ResourceType.Image:
                return <ModelIcon />;
            case ResourceType.Video:
                return <ModelIcon />;
            case ResourceType.Publication:
                return <ModelIcon />;
            default:
                return <></>;
        }
    }
}
