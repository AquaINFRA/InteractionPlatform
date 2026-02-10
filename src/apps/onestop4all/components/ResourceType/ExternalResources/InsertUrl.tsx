import { Box, Input } from "@open-pioneer/chakra-integration";
import { ChangeEvent } from "react";
import { isUrl } from "../Metadata/PersonalInfo";

type DatasetUrlInputProps = {
    value: string;
    onChange: (url: string, isValid: boolean) => void;
};

export const DatasetUrlInput = ({ value, onChange }: DatasetUrlInputProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        onChange(url, isUrl(url));
    };

    return (
        <>
            <div>
                <span className="metadataValue">Insert URL to a dataset</span>
            </div>
            <Box pt={3}>
                <Input
                    value={value}
                    onChange={handleChange}
                    placeholder="Insert here"
                />
            </Box>
        </>
    );
};
