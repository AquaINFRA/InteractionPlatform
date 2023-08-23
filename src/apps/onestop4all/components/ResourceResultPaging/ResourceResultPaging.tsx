import { Box } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { navigateToResource } from "../../views/Search/helper";
import { useSearchState } from "../../views/Search/SearchState";
import { ResultsNavigation } from "../ResultsNavigation/ResultsNavigation";

export const ResourceResultPaging = () => {
    const id = useParams().id as string;
    const searchSrvc = useService("onestop4all.SearchService");

    const navigate = useNavigate();
    const [result, setResult] = useState<number>();
    const [resultCount, setResultCount] = useState<number>();
    const searchState = useSearchState();

    useEffect(() => {
        if (searchState.searchResults) {
            const idx = searchState.searchResults.results.findIndex((r) => r.id === id);
            setResult(idx + 1 + searchState.pageSize * searchState.pageStart);
            setResultCount(searchState.searchResults.count);
        }
    }, []);

    function stepBack(): void {
        if (result) {
            fetchResultId(result - 1);
        }
    }

    function stepForward(): void {
        if (result) {
            fetchResultId(result + 1);
        }
    }

    function stepToEnd(): void {
        if (resultCount) {
            fetchResultId(resultCount);
        }
    }

    function stepToStart(): void {
        if (result) {
            fetchResultId(1);
        }
    }

    function fetchResultId(result: number) {
        searchSrvc
            .doSearch({
                pageSize: 1,
                pageStart: result - 1,
                resourceTypes: searchState.selectedResoureTypes,
                searchTerm: searchState.searchTerm,
                spatialFilter: searchState.spatialFilter
            })
            .then((res) => {
                if (res.results[0]) {
                    navigateToResource(res.results[0], navigate);
                    setResult(result);
                }
            });
    }

    function renderPaging(): import("react").ReactNode {
        if (result !== undefined && resultCount !== undefined) {
            return (
                <ResultsNavigation
                    result={result}
                    of={resultCount}
                    label="result"
                    stepBack={stepBack}
                    stepFoward={stepForward}
                    stepToEnd={stepToEnd}
                    stepToStart={stepToStart}
                />
            );
        } else {
            return <></>;
        }
    }

    return <Box>{renderPaging()}</Box>;
};
