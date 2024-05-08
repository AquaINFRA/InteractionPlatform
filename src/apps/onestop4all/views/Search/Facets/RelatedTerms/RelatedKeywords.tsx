import {
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    HStack,
    Stack,
    VStack,
    extendTheme
} from "@open-pioneer/chakra-integration";
import { checkboxAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { useSearchState } from "../../SearchState";
import { useState } from "react";

interface Item {
    value?: string;
    type?: string;
}

export const RelatedKeywords = (props: {
    list: Array<Item>;
    tag: string;
    element: string;
    type?: string;
}) => {
    const { list, tag, element, type } = props;

    const searchState = useSearchState();
    const [isSelected, setIsSelected] = useState("none");

    const createQuery = (element: string, elem: string) => {
        if (element == "keyword") {
            return "/search?searchterm=" + elem;
        } else {
            if (element == "theme") {
                return "/search?subjects=" + elem;
            } else {
                return "/";
            }
        }
    };

    function getClassName(item: Item) {
        // console.log(item);
        if (item.type != null) {
            // console.log("TYPE: " + item.type);
            switch (item.type) {
                case "originalMatch":
                    return "metadataKeyword";
                case "narrower":
                    return "metadataKeywordNarrower";
                case "broader":
                    return "metadataKeywordBroader";
                case "related":
                    return "metadataKeywordRelated";
            }
        } else return element == "keyword" ? "metadataKeyword" : "metadataTheme";
    }
    // shorten the list
    const shortList: Array<Item> = [];
    let originalIndex = 0;
    let narrowerIndex = 0;
    let broaderIndex = 0;
    let relatedIndex = 0;
    list.map((item: Item) => {
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

    return (
        <Box className="metadataSection">
            <Stack spacing={3} direction="row" wrap="wrap">
                <span className="metadataTag">{tag}:</span>
                <Checkbox defaultChecked>
                    <Box borderRadius="50px" background={"rgba(34, 192, 210, 0.2)"} padding="3px">
                        Original Match
                    </Box>
                </Checkbox>
                <Checkbox defaultChecked>
                    <Box borderRadius="50px" background={"rgb(255, 222, 173)"} padding="3px">
                        Narrower
                    </Box>
                </Checkbox>
                <Checkbox defaultChecked>
                    <Box borderRadius="50px" background={"rgb(230, 230, 250)"} padding="3px">
                        Broader
                    </Box>
                </Checkbox>
                <Checkbox defaultChecked>
                    <Box borderRadius="50px" background={"rgb(210, 180, 140)"} padding="3px">
                        Related
                    </Box>
                </Checkbox>
                <HStack spacing="3px">
                    <Button
                        height="3vh"
                        width="12vw"
                        fontSize="0.7vw"
                        onClick={() => searchState.setSearchTerm("Test")}
                    >
                        Search for selected terms
                    </Button>
                </HStack>
            </Stack>
            {shortList.map((item: Item, j: number) => (
                <button
                    className={getClassName(item)}
                    style={{ border: isSelected }}
                    key={j}
                    onClick={() => setIsSelected("2px solid black")}
                >
                    {item.value}
                </button>
            ))}
            <div className="seperator" style={{ marginTop: "10px" }}></div>
        </Box>
    );
};
