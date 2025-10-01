import { Box, HStack, RadioGroup, Radio, Stack } from "@open-pioneer/chakra-integration";

interface CatchmentOptionsProps {
    onChange: (value: string) => void;
    selectedOption: string;
}

export function CatchmentOptions({ onChange, selectedOption }: CatchmentOptionsProps) {
    const instructionText =
        selectedOption === "full"
            ? "Select a polygon, click 'Apply Bounding Box', and use 'Shift' or a selection box for multiple selections."
            : "Set a point on the map and click 'Compute Catchment', then 'Apply Bounding Box'.";

    return (
        <RadioGroup defaultValue={selectedOption} onChange={onChange} my="1%">
            <Stack spacing={5} direction="row">
                <Radio value="full"><b>Full catchments and sea regions</b></Radio>
                <Radio value="upstream"><b>Upstream catchment</b></Radio>
            </Stack>
            <Box pt={1}>
                <HStack>
                    <Box>{instructionText}</Box>
                </HStack>
            </Box>
        </RadioGroup>
    );
}
