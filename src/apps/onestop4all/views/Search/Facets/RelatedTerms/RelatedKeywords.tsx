import { Box, Button, Flex, Stack } from "@open-pioneer/chakra-integration";
import { useSearchState } from "../../SearchState";
import { useState } from "react";
import { FilterCheckbox } from "./FilterCheckbox";

interface SearchTermItem {
    value?: string;
    type?: string;
}

export const RelatedKeywords = (props: {
    list: Array<SearchTermItem>;
    tag: string;
    element: string;
    type?: string;
}) => {
    const { list, tag, element } = props;

    const searchState = useSearchState();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [filterCategories, setFilterCategories] = useState<string[]>([
        "originalMatch",
        "narrower",
        "broader",
        "related"
    ]);

    const itemBorder = (item: SearchTermItem) => {
        if (item.value && selectedItems.includes(item.value)) {
            return "2px solid black";
        } else return "2px solid white";
    };

    function getClassName(item: SearchTermItem) {
        if (item.type != null) {
            switch (item.type) {
                case "originalMatch":
                    return "";
                case "narrower":
                    return "metadataKeywordNarrower";
                case "broader":
                    return "metadataKeywordBroader";
                case "related":
                    return "metadataKeywordRelated";
            }
        } else return element == "keyword" ? "metadataKeyword" : "metadataTheme";
    }

    const shortList: Array<SearchTermItem> = [];

    let originalIndex = 0;
    let narrowerIndex = 0;
    let broaderIndex = 0;
    let relatedIndex = 0;

    list.map((item: SearchTermItem) => {
        if (item.type == "originalMatch") {
            originalIndex++;
            if (originalIndex < 6) shortList.push(item);
        }
        if (item.type == "narrower") {
            narrowerIndex++;
            if (narrowerIndex < 6) shortList.push(item);
        }
        if (item.type == "broader") {
            broaderIndex++;
            if (broaderIndex < 6) shortList.push(item);
        }
        if (item.type == "related") {
            relatedIndex++;
            if (relatedIndex < 6) shortList.push(item);
        }
    });

    const combineSearchTerms = (searchTermList: string[]) => {
        let searchTermsCombined = searchState.searchTerm + " ";
        searchTermList.forEach((searchTerm) => {
            searchTermsCombined = searchTermsCombined + searchTerm + " ";
        });
        return searchTermsCombined;
    };

    const updateFilter = (isChecked: boolean, type: string) => {
        if (isChecked && !filterCategories.includes(type)) {
            const tmp = filterCategories.slice();
            tmp.push(type);
            setFilterCategories(tmp);
        } else {
            if (filterCategories.includes(type)) {
                setFilterCategories(filterCategories.filter((item) => item != type));
            }
        }
    };

    const updateSelectedItems = (itemValue: string) => {
        let tmp = selectedItems.slice();
        if (itemValue) {
            if (tmp.includes(itemValue)) {
                tmp = tmp.filter((i) => itemValue != i);
            } else {
                tmp.push(itemValue);
            }
        }
        setSelectedItems(tmp);
    };

    return (
        <Box className="relatedTermsBox">
            <Flex align="center">
                <Stack spacing={1} direction="row" wrap="wrap">
                    <span className="relatedTermsTitle">{tag}:</span>
                    <FilterCheckbox
                        label="Original Match"
                        background="rgba(34, 192, 210, 0.2)"
                        filterType="originalMatch"
                        updateFilter={updateFilter}
                    />
                    <FilterCheckbox
                        label="Narrower"
                        background="rgb(255, 222, 173)"
                        filterType="narrower"
                        updateFilter={updateFilter}
                    />
                    <FilterCheckbox
                        label="Broader"
                        background="rgb(230, 230, 250)"
                        filterType="broader"
                        updateFilter={updateFilter}
                    />
                    <FilterCheckbox
                        label="Related"
                        background="rgb(210, 180, 140)"
                        filterType="related"
                        updateFilter={updateFilter}
                    />
                </Stack>
            </Flex>
            {shortList
                .filter((item) => {
                    return filterCategories.includes(item.type!);
                })
                .map((item: SearchTermItem, j: number) => (
                    <Box
                        className={"metadataKeyword " + getClassName(item)}
                        style={{ border: itemBorder(item) }}
                        key={j}
                        onClick={() => {
                            updateSelectedItems(item.value!);
                        }}
                        _hover={{ cursor: "pointer" }}
                    >
                        {item.value}
                    </Box>
                ))}
            <Box pt={3}>
                <Button
                    className="CatchmentButton"
                    onClick={() => {
                        if (selectedItems.length != 0)
                            searchState.setSearchTerm(combineSearchTerms(selectedItems));
                    }}
                    isActive={selectedItems.length == 0}
                >
                    Search for selected terms
                </Button>
            </Box>
            <div className="seperator" style={{ marginTop: "10px" }}></div>
        </Box>
    );
};
