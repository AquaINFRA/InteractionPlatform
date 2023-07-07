import { Icon, HStack } from "@open-pioneer/chakra-integration";
import {
    ResultsNavigationLeftLeft,
    ResultsNavigationLeft,
    ResultsNavigationRightRight,
    ResultsNavigationRight
} from "../Icons";

export const ResultsNavigation = (props: { result: number; of: number }) => {
    const { result, of } = props;
    return (
        <HStack>
            <a href="/search?">
                <Icon boxSize={10}>
                    <ResultsNavigationLeftLeft />
                </Icon>
            </a>
            <a href="/search?">
                <Icon boxSize={10} marginLeft="-4">
                    <ResultsNavigationLeft />
                </Icon>
            </a>
            <div className="seperator" style={{ width: "3%" }} />
            <div>
                Result <span className="resultsNavigation">{result}</span> of{" "}
                <span className="resultsNavigation">{of}</span>
            </div>
            <div className="seperator" style={{ width: "3%" }} />
            <a href="/search?">
                <Icon boxSize={10} marginRight="-4">
                    <ResultsNavigationRight />
                </Icon>
            </a>
            <a href="/search?">
                <Icon boxSize={10}>
                    <ResultsNavigationRightRight />
                </Icon>
            </a>
        </HStack>
    );
};
