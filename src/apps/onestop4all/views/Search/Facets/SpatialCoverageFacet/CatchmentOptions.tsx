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
        <RadioGroup 
            defaultValue={selectedOption} 
            onChange={(value) => onChange(value)} 
            marginY={"1%"}
        >
            <Stack spacing={5} direction="row">
                <Radio value="full" ><b>Full catchment</b></Radio>
                <Radio value="upstream"><b>Upstream catchment</b></Radio>
            </Stack>
        </RadioGroup>
    );
}
