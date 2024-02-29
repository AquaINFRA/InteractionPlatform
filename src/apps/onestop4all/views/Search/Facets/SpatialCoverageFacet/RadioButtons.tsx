import { RadioGroup } from "@open-pioneer/chakra-integration";
import { Radio } from "@open-pioneer/chakra-integration";
import { Stack } from "@open-pioneer/chakra-integration";
export function RadioButtons() {
    return (
        <RadioGroup defaultValue="default" marginTop="20px">
            <Stack spacing={5} direction="row">
                <Radio value="option1">Option 1</Radio>
                <Radio value="option2">Option 2</Radio>
                <Radio value="default">Default</Radio>
            </Stack>
        </RadioGroup>
    );
}
