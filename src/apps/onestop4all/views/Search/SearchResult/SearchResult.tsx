import { Box, Flex, SystemStyleObject } from "@open-pioneer/chakra-integration";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

import { SearchResultItem } from "../../../services/SearchService";
import { BorderColor, PrimaryColor } from "../../../Theme";
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
        navigate(`/result/${item.id}`);
        window.scrollTo(0, 0);
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
        if (props.item.publishDate) {
            return (
                <>
                    <Box flex="0 0 1px" bgColor={BorderColor} alignSelf="stretch" />
                    <Box className="date">
                        Published:{" "}
                        {DateTime.fromJSDate(props.item.publishDate).toFormat("MMMM yyyy")}
                    </Box>
                </>
            );
        }
        if (props.item.updateDate) {
            return (
                <>
                    <Box flex="0 0 1px" bgColor={BorderColor} alignSelf="stretch" />
                    <Box className="date">
                        Updated: {DateTime.fromJSDate(props.item.updateDate).toFormat("MMMM yyyy")}
                    </Box>
                </>
            );
        }
    }

    function locationSection() {
        return props.item.locality ? (
            <>
                <Box flex="0 0 1px" bgColor={BorderColor} alignSelf="stretch" />
                <Box className="date">{props.item.locality}</Box>
            </>
        ) : null;
    }
}
