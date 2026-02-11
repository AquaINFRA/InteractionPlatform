import { Box, Input } from "@open-pioneer/chakra-integration";
import { ChangeEvent, useEffect } from "react";
import { isUrl } from "../Metadata/PersonalInfo";

type DatasetUrlInputProps = {
    value: string;
    onChange: (url: string, isValid: boolean) => void;
    imported?: boolean;
};

export const DatasetUrlInput = ({ value, onChange, imported }: DatasetUrlInputProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        onChange(url, isUrl(url));
    };

    useEffect(() => {
        if (imported) {
            onChange("", false);
        }
    }, [imported, onChange]);

    return (
        <>
            <div>
                <span className="metadataValue">Insert dataset URL for Galaxy import</span>
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
