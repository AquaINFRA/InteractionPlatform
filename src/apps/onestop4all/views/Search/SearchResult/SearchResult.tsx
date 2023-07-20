import { Box, Flex } from "@open-pioneer/chakra-integration";
import { DateTime } from "luxon";

import { SearchResultItem } from "../../../services/SearchService";
import { BorderColor, PrimaryColor } from "../../../Theme";
import { ResourceIcon } from "../../Start/ResourceEntry/ResourceIcons";

export interface SearchResultProps {
    item: SearchResultItem;
}

export function SearchResult(props: SearchResultProps) {
    const { item } = props;
    return (
        <Flex alignItems="center">
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
                    <Box className="title">
                        <a href={"http://localhost:5173/" + item.url}>{item.title}</a>
                    </Box>
                </Flex>
                <Box className="abstract">{item.abstract}</Box>
            </Box>
            <Box flex="0 0 75px" hideBelow="custombreak">
                <a href={"http://localhost:5173/" + item.url}>
                    <svg
                        width="76"
                        height="76"
                        viewBox="0 0 76 76"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path opacity="0.3" d="M44 7.5L75 38L44 68.5" stroke="#05668D" />
                    </svg>
                </a>
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
