import { useEffect, useState } from "react";
import { Keywords } from "../../../../components/ResourceType/Metadata/Keywords";
import { useService } from "open-pioneer:react-hooks";
import { RelatedKeywords } from "./RelatedKeywords";
import { SearchState, useSearchState } from "../../SearchState";
import { UpIcon, DownIcon } from "../../../../components/Icons";
import {
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionButton,
    Box,
    Flex
} from "@open-pioneer/chakra-integration";

export const RelatedTerms = () => {
    const [related, setRelated] = useState<any>();
    const [myArray, setMyArray] = useState<Array<string>>([]);
    const searchSrvc = useService("onestop4all.SearchService");
    const [myJson, setMyJson] = useState<Array<object>>([]);
    const searchState = useSearchState();
    const [expanded, setExpanded] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        searchSrvc.getRelatedSearchterms(searchState.searchTerm).then((res: any) => {
            setRelated(res);
            const json: JSON = JSON.parse(res);
            const tmpArray: Array<string> = [];
            const tmpJson: Array<object> = [];
            // console.log("RES: " + res);
            Object.entries(json).forEach((entry) => {
                const [key, object] = entry;
                tmpJson.push({ type: object.type, value: object.value });
                tmpArray.push(object.value);
            });
            setLoading(false);
            setMyArray(tmpArray);
            setMyJson(tmpJson);
            // console.log(myJson);
        });
    }, [searchState]);
    return (
        <Box className="relatedTermsBox">
            <Box>
                <Accordion allowMultiple defaultIndex={expanded ? [0] : [1]}>
                    <AccordionItem borderTopWidth="0 !important" borderBottomWidth="0 !important">
                        <AccordionPanel
                            paddingInlineStart="unset !important"
                            paddingInlineEnd="unset !important"
                            paddingTop="unset !important"
                        >
                            <RelatedKeywords
                                list={myJson}
                                tag={"Related terms"}
                                element={"keyword"}
                                loading={loading}
                            />
                        </AccordionPanel>
                        <div>
                            <AccordionButton
                                justifyContent="center"
                                onClick={() => setExpanded(!expanded)}
                                marginBottom={"2%"}
                            >
                                <Flex
                                    alignItems="center"
                                    direction="column"
                                    gap="4px"
                                    style={{ marginLeft: "40%", marginRight: "40%" }}
                                >
                                    {expanded ? (
                                        <>
                                            <Box>
                                                <UpIcon />
                                            </Box>
                                            <Box className="metadataShowHide">Hide related terms</Box>
                                        </>
                                    ) : (
                                        <>
                                            <Box className="metadataShowHide">Show related terms</Box>
                                            <Box>
                                                <DownIcon />
                                            </Box>
                                        </>
                                    )}
                                </Flex>
                            </AccordionButton>
                        </div>
                    </AccordionItem>
                </Accordion>
            </Box>
        </Box>
    );
};
