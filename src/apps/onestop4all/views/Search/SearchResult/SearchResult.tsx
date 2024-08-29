import { Box, Flex, SystemStyleObject } from "@open-pioneer/chakra-integration";
import { DateTime } from "luxon";
import { Link, useNavigate } from "react-router-dom";

import { SearchResultItem } from "../../../services/SearchService";
import { mapToResourceType } from "../../../services/ResourceTypeUtils";
import { BorderColor, PrimaryColor } from "../../../Theme";
import { ResourceIcon } from "../../Start/ResourceEntry/ResourceIcons";
import { useSearchState } from "../SearchState";

export interface SearchResultProps {
    item: SearchResultItem;
}

export function SearchResult(props: SearchResultProps) {
    const { item } = props;
    const navigate = useNavigate();
    const type = item.properties.type;
    const resType = type ? mapToResourceType(type) : mapToResourceType("unknown");
    const searchState = useSearchState();

    const idx = searchState.searchResults?.results.findIndex((r) => r.id === item.id) || 0;
    const resultPage = idx + 1 + searchState.pageSize * searchState.pageStart;

    const hoverStyle: SystemStyleObject = {
        cursor: "pointer",
        backgroundColor: "var(--primary-primary-transparent-background)"
    };

    function navigateTo(): void {
        // calculate result page
        const idx = searchState.searchResults?.results.findIndex((r) => r.id === item.id) || 0;
        const resultPage = idx + 1; //+ searchState.pageSize * searchState.pageStart;
        navigate(`/result/${item.id}`, { state: { resultPage } });
        window.scrollTo(0, 0);
    }

    return (
        <Link
            to={`/result/${item.id}`}
            state={{ resultPage: resultPage }}
            style={{ textDecoration: "none" }}
        >
            <Flex alignItems="center" _hover={hoverStyle}>
                <Box className="search-result" flex="1" overflow={"hidden"}>
                    <Flex gap="8px">
                        <Box className="resource-type">
                            {item.properties?.type ? item.properties?.type : "Resource"}
                        </Box>
                        {/*dateSection()*/}
                        {/*locationSection()*/}
                        {providerSection()}
                    </Flex>
                    <Flex gap="8px" padding="8px 0">
                        <Box>
                            {resType ? (
                                <ResourceIcon type={resType} size={24} color={PrimaryColor} />
                            ) : null}
                        </Box>
                        <Box flex="0 0 1px" bgColor={BorderColor} alignSelf="stretch" />
                        <Box className="title">{item.properties?.title}</Box>
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
        </Link>
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
        /*if (props.item.updateDate) {
            return (
                <>
                    <Box flex="0 0 1px" bgColor={BorderColor} alignSelf="stretch" />
                    <Box className="date">
                        Updated: {DateTime.fromJSDate(props.item.updateDate).toFormat("MMMM yyyy")}
                    </Box>
                </>
            );
        }*/
    }

    function locationSection() {
        return props.item.locality ? (
            <>
                <Box flex="0 0 1px" bgColor={BorderColor} alignSelf="stretch" />
                <Box className="date">{props.item.locality}</Box>
            </>
        ) : null;
    }

    function providerSection() {
        return props.item.properties.aicollection ? (
            <>
                <Box flex="0 0 1px" bgColor={BorderColor} alignSelf="stretch" />
                <Box className="date">{props.item.properties.aicollection}</Box>
            </>
        ) : null;
    }
}
