import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Input } from "@open-pioneer/chakra-integration";
import React from "react";
import { FacetBase } from "../../../../../views/Search/Facets/FacetBase/FacetBase";

interface DataPointsSelectorProps {
    maxSliderValue: number;
    sliderValue: number;
    inputValue: string;
    onSliderChange: (value: number) => void;
    onSliderChangeEnd: (value: number) => void;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onInputBlur: () => void;
}

export const DataPointsSelector = ({
    maxSliderValue,
    sliderValue,
    inputValue,
    onSliderChange,
    onSliderChangeEnd,
    onInputChange,
    onInputBlur,
}: DataPointsSelectorProps) => {
    return (
        <>
            <Box mb={4}>
                <Box mt={2} marginBottom={1}>
                    Maximum number of data points: {maxSliderValue}{" "}
                    {maxSliderValue === 111111 && (
                        <span>(<b>Note:</b> The maximum value is most likely not correct.)</span>
                    )}
                </Box>

                {maxSliderValue > 0 && (
                    <Box display="flex" alignItems="center" gap={3}>
                        <Box flex={1}>
                            <Slider
                                aria-label="slider-ex-1"
                                value={sliderValue}
                                onChange={onSliderChange}
                                onChangeEnd={onSliderChangeEnd}
                                min={1}
                                max={maxSliderValue}
                            >
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </Box>
                        <Input
                            type="text"
                            value={inputValue}
                            onChange={onInputChange}
                            onBlur={onInputBlur}
                            max={maxSliderValue}
                            min={1}
                            width="80px"
                        />
                    </Box>
                )}
            </Box>
        </>
    );
};