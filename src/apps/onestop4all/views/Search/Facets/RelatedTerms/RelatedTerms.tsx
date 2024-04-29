import { useEffect, useState } from "react";
import { Keywords } from "../../../../components/ResourceType/Metadata/Keywords";
import { useService } from "open-pioneer:react-hooks";
import { RelatedKeywords } from "./RelatedKeywords";
import { SearchState, useSearchState } from "../../SearchState";

export const RelatedTerms = () => {
    const [related, setRelated] = useState<any>();
    const [myArray, setMyArray] = useState<Array<string>>([]);
    const searchSrvc = useService("onestop4all.SearchService");
    const [myJson, setMyJson] = useState<Array<object>>([]);
    const searchState = useSearchState();

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

            setMyArray(tmpArray);
            setMyJson(tmpJson);
            console.log(myJson);
        });
    });
    return <RelatedKeywords list={myJson} tag={"Related terms"} element={"keyword"} />;
};
