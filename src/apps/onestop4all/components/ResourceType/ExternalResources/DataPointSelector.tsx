import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Input } from "@open-pioneer/chakra-integration";
import React from "react";

interface DataPointsSelectorProps {
    maxSliderValue: number;
    sliderValue: number;
    inputValue: string;
    onSliderChange: (value: number) => void;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onInputBlur: () => void;
}

const DataPointsSelector: React.FC<DataPointsSelectorProps> = ({
    maxSliderValue,
    sliderValue,
    inputValue,
    onSliderChange,
    onInputChange,
    onInputBlur,
}) => {
    return (
        <>
            <Box mb={4}>
                <Box mt={2} marginBottom={1}>
                    Maximum number of data points: {maxSliderValue}{" "}
                    {maxSliderValue === 111111 ? (
                        <span>(<b>Note:</b> The maximum value is most likely not correct.)</span>
                    ) : (
                        ""
                    )}
                </Box>
                {maxSliderValue > 0 && (
                    <Slider
                        aria-label="slider-ex-1"
                        value={sliderValue}
                        onChange={onSliderChange}
                        min={1}
                        max={maxSliderValue}
                    >
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                )}
            </Box>

            <Box mb={4}>
                <Box marginBottom={2}>Selected number of datapoints:</Box>
                <Input
                    type="text"
                    value={inputValue}
                    onChange={onInputChange}
                    onBlur={onInputBlur}
                    max={maxSliderValue}
                    min={1}
                    autoFocus
                />
            </Box>
        </>
    );
};

export default DataPointsSelector;
