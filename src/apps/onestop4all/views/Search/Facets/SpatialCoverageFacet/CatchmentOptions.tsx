import { RadioGroup } from "@open-pioneer/chakra-integration";
import { Radio } from "@open-pioneer/chakra-integration";
import { Stack } from "@open-pioneer/chakra-integration";
import { useState } from "react";

interface CatchmentOptionsProps {
    onChange: (value: string) => void;
    selectedOption: string;
}
export function CatchmentOptions(props: CatchmentOptionsProps) {
    const { onChange, selectedOption } = props;
    return (
        <RadioGroup defaultValue="full" onChange={(value) => onChange(value)}>
            <Stack spacing={5} direction="row">
                <Radio value="full">Full catchment</Radio>
                <Radio value="upstream">Upstream catchment</Radio>
            </Stack>
            {selectedOption}
        </RadioGroup>
    );
}
