import { Box, Flex, Skeleton } from "@open-pioneer/chakra-integration";
import { useIntl } from "open-pioneer:react-hooks";

import { ResourceType } from "../../services/ResourceTypeUtils";
import {
    DatasetIcon,
    DocumentsIcon,
    LearningResourceIcon,
    OrganisationsIcon,
    RepositoriesIcon,
    SeriesIcon,
    ServicesIcon,
    StandardIcon,
    ToolSoftwareIcon
} from "../Icons";

export function ResourceTypeLabel(props: {
    resType: ResourceType | undefined;
    loading: boolean;
    iconAlign: "left" | "right";
}) {
    const { resType, loading = false, iconAlign } = props;
    const intl = useIntl();
    const loadingText = intl.formatMessage({ id: "resource-type-header.loading" });

    return (
        <Flex
            whiteSpace="nowrap"
            textTransform="uppercase"
            fontWeight="700"
            color="#666666"
            letterSpacing="0.8px"
            alignItems="center"
            gap="12px"
        >
            {loading ? (
                <Skeleton>{loadingText}</Skeleton>
            ) : (
                <>
                    {iconAlign === "left" && <Box>{getIcon()}</Box>}
                    <Box>{resType}</Box>
                    {iconAlign === "right" && <Box>{getIcon()}</Box>}
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
            case ResourceType.Service:
                return <ServicesIcon />;
            case ResourceType.Series:
                return <SeriesIcon />;
            default:
                return <></>;
        }
    }
}
