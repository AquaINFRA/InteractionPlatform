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
    const [expanded, setExpanded] = useState(false);
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
            {/* Mobile view */}
            <Box id="mobileRelatedTerms">
                <Accordion allowMultiple defaultIndex={expanded ? [0] : [1]}>
                    <AccordionItem borderTopWidth="0 !important" borderBottomWidth="0 !important">
                        <AccordionPanel
                            paddingInlineStart="unset !important"
                            paddingInlineEnd="unset !important"
                            paddingTop="unset !important"
                        >
                            {<RelatedKeywords
                                list={myJson}
                                tag={"Related terms"}
                                element={"keyword"}
                                loading={loading}
                            />}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box>
            {/* Desktop view */}
            <Box id="desktopRelatedTerms">
                <RelatedKeywords 
                    list={myJson} 
                    tag={"Related terms"} 
                    element={"keyword"}
                    loading={loading} 
                />
            </Box>
        </Box>
    );
};
