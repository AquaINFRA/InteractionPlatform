import { Flex, Divider, Box } from "@open-pioneer/chakra-integration";
import {
    ResultsNavigationLeftLeft,
    ResultsNavigationLeft,
    ResultsNavigationRightRight,
    ResultsNavigationRight
} from "../Icons";

export const ResultsNavigation = (props: { result: number; of: number }) => {
    const { result, of } = props;
    return (
        <Flex>
            <Box>
                <a href="/search?">
                    <ResultsNavigationLeftLeft />
                </a>
            </Box>

            <Box>
                <a href="/search?">
                    <ResultsNavigationLeft />
                </a>
            </Box>

            <Divider className="inbetweenLine" />

            <Box className="resultsNavigation">
                Result <span className="resultHit">{result}</span> of{" "}
                <span className="resultHit">{of}</span>
            </Box>

            <Divider className="inbetweenLine" />

            <Box>
                <a href="/search?">
                    <ResultsNavigationRight />
                </a>
            </Box>

            <Box>
                <a href="/search?">
                    <ResultsNavigationRightRight />
                </a>
            </Box>
        </Flex>
    );
};
