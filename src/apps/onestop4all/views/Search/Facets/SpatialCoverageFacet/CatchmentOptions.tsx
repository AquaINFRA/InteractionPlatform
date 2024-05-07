import { RadioGroup } from "@open-pioneer/chakra-integration";
import { Radio } from "@open-pioneer/chakra-integration";
import { Stack } from "@open-pioneer/chakra-integration";

export function CatchmentOptions() {
    return (
        <RadioGroup defaultValue="option2" marginTop="20px">
            <Stack spacing={5} direction="row">
                <Radio value="option1">Upstream Catchment</Radio>
                <Radio value="option2">Full catchment</Radio>
            </Stack>
        </RadioGroup>
    );
}
