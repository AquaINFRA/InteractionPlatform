import { Box, Flex, SystemStyleObject } from "@open-pioneer/chakra-integration";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

import { SearchResultItem } from "../../../services/SearchService";
import { BorderColor, PrimaryColor } from "../../../Theme";
import { ResourceType } from "../../Start/ResourceEntry/ResourceEntry";
import { ResourceIcon } from "../../Start/ResourceEntry/ResourceIcons";

export interface SearchResultProps {
    item: SearchResultItem;
}

export function SearchResult(props: SearchResultProps) {
    const { item } = props;
    const navigate = useNavigate();

    const hoverStyle: SystemStyleObject = {
        cursor: "pointer",
        backgroundColor: "var(--primary-primary-transparent-background)"
    };

    function navigateTo(): void {
        switch (item.resourceType) {
            case ResourceType.Repos:
                navigate(`/repository/${item.id}`);
                break;
            case ResourceType.Datasets:
                navigate(`/dataset/${item.id}`);
                break;
            case ResourceType.Organisations:
                navigate(`/organisation/${item.id}`);
                break;
            case ResourceType.Documents:
                navigate(`/document/${item.id}`);
                break;
            case ResourceType.Services:
                navigate(`/service/${item.id}`);
                break;
            case ResourceType.Tools:
                navigate(`/tools_software/${item.id}`);
                break;
            case ResourceType.Standards:
                navigate(`/standard/${item.id}`);
                break;
            case ResourceType.Articles:
            case ResourceType.Educational:
            default:
                throw new Error(`Unknown navigation for ${item.resourceType}`);
        }
    }

    return (
        <Flex alignItems="center" _hover={hoverStyle} onClick={navigateTo}>
            <Box className="search-result" flex="1" overflow={"hidden"}>
                <Flex gap="8px">
                    <Box className="resource-type">{item.resourceType}</Box>
                    {dateSection()}
                    {locationSection()}
                </Flex>
                <Flex gap="8px" padding="8px 0">
                    <Box>
                        <ResourceIcon
                            type={item.resourceType}
                            size={24}
                            color={PrimaryColor}
                        ></ResourceIcon>
                    </Box>
                    <Box flex="0 0 1px" bgColor={BorderColor} alignSelf="stretch" />
                    <Box className="title">{item.title}</Box>
                </Flex>
                <Box className="abstract">{item.abstract}</Box>
            </Box>
            <Box flex="0 0 75px" hideBelow="custombreak">
                <svg
                    width="76"
                    height="76"
                    viewBox="0 0 76 76"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path opacity="0.3" d="M44 7.5L75 38L44 68.5" stroke="#05668D" />
                </svg>
            </Box>
        </Flex>
    );

    function dateSection() {
        if (props.item.date) {
            return (
                <>
                    <Box flex="0 0 1px" bgColor={BorderColor} alignSelf="stretch" />
                    <Box className="date">
                        {DateTime.fromJSDate(props.item.date).toFormat("MMMM yyyy")}
                    </Box>
                </>
            );
        }
    }

    function locationSection() {
        return props.item.location ? (
            <>
                <Box flex="0 0 1px" bgColor={BorderColor} alignSelf="stretch" />
                <Box className="date">{props.item.location}</Box>
            </>
        ) : null;
    }
}
