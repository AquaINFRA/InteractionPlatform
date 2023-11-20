import {
    Box,
    Button,
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack
} from "@open-pioneer/chakra-integration";
import { ParentSize } from "@visx/responsive";
import { useEffect, useState } from "react";

import { DisableOverlay } from "../../../../components/DisableOverlay/DisableOverlay";
import { TemporalFacet } from "../../../../services/SearchService";
import { ActiveControlColor } from "../../../../Theme";
import { TemporalFacetEndYear, TemporalFacetStartYear, useSearchState } from "../../SearchState";
import { FacetBase } from "../FacetBase/FacetBase";
import TemporalGraph from "./TemporalGraph";

export function TemporalCoverageFacet() {
    const searchState = useSearchState();

    const [startYear, setStartYear] = useState(TemporalFacetStartYear);
    const [endYear, setEndYear] = useState(TemporalFacetEndYear);
    const [periods, setPeriods] = useState<TemporalFacet[]>();
    const [disabled, setDisable] = useState(false);

    useEffect(() => {
        if (searchState.temporalFilter) {
            const s = searchState.temporalFilter.startYear;
            const e = searchState.temporalFilter.endYear;
            setStartYear(s);
            setEndYear(e);
        } else {
            setStartYear(TemporalFacetStartYear);
            setEndYear(TemporalFacetEndYear);
        }
    }, [searchState.temporalFilter]);

    useEffect(() => {
        if (searchState.temporalFacets) {
            setPeriods(searchState.temporalFacets);
        }
        setDisable(searchState.temporalFilterDisabled);
    }, [searchState.temporalFacets, searchState.temporalFilterDisabled]);

    function setTimespan(): void {
        searchState.setTemporalFilter({ startYear, endYear });
    }

    function selectPeriod(selectedEntry: TemporalFacet): void {
        const year = parseInt(selectedEntry.dateStr);
        searchState.setTemporalFilter({ startYear: year, endYear: year });
    }

    function sliderChange(values: number[]): void {
        if (values[0] && values[1]) {
            setStartYear(values[0]);
            setEndYear(values[1]);
        }
    }

    const SliderHandle = (
        <svg width="10" height="9">
            <line x1="1" y1="2.18556e-08" x2="1" y2="9" stroke="white" />
            <line x1="5" y1="2.18556e-08" x2="5" y2="9" stroke="white" />
            <line x1="9" y1="2.18556e-08" x2="9" y2="9" stroke="white" />
        </svg>
    );

    return (
        <Box>
            <FacetBase title="Temporal Coverage" expanded>
                <Box position="relative">
                    <ParentSize>
                        {(parent) => (
                            <TemporalGraph
                                width={parent.width}
                                height={200}
                                facets={periods || []}
                                selected={selectPeriod}
                            ></TemporalGraph>
                        )}
                    </ParentSize>

                    <Box padding="10px">
                        <RangeSlider
                            min={TemporalFacetStartYear}
                            max={TemporalFacetEndYear}
                            value={[startYear, endYear]}
                            onChange={sliderChange}
                        >
                            <RangeSliderTrack>
                                <RangeSliderFilledTrack bg={ActiveControlColor} />
                            </RangeSliderTrack>
                            <RangeSliderThumb
                                index={0}
                                boxSize={5}
                                backgroundColor={ActiveControlColor}
                                borderRadius={0}
                            >
                                <Box>{SliderHandle}</Box>
                            </RangeSliderThumb>
                            <RangeSliderThumb
                                index={1}
                                boxSize={5}
                                backgroundColor={ActiveControlColor}
                                borderRadius={0}
                            >
                                <Box>{SliderHandle}</Box>
                            </RangeSliderThumb>
                        </RangeSlider>
                    </Box>

                    <Flex justifyContent="space-between" padding="10px 0px">
                        <NumberInput
                            value={startYear}
                            onChange={(valueString) => setStartYear(parseInt(valueString))}
                            min={TemporalFacetStartYear}
                            max={endYear}
                            keepWithinRange={true}
                            clampValueOnBlur={false}
                            size="sm"
                            maxW={20}
                            variant="custom"
                        >
                            <NumberInputField readOnly />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>

                        <NumberInput
                            value={endYear}
                            onChange={(valueString) => setEndYear(parseInt(valueString))}
                            min={startYear}
                            max={TemporalFacetEndYear}
                            keepWithinRange={true}
                            clampValueOnBlur={false}
                            size="sm"
                            maxW={20}
                            variant="custom"
                        >
                            <NumberInputField readOnly />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </Flex>
                    <Button width="100%" onClick={setTimespan}>
                        set timespan
                    </Button>

                    {disabled && (
                        <DisableOverlay label="The temporal selection is disabled"></DisableOverlay>
                    )}
                </Box>
            </FacetBase>
        </Box>
    );
}
