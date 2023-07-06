import { Box } from "@chakra-ui/react";
import { Button } from "@open-pioneer/chakra-integration";
import { useState } from "react";

export interface HowToEntryProps {
    heading: string;
    description: string;
}

export const HowToEntry = (props: HowToEntryProps) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Box
            className={`how-to-entry ${hovered ? "hover" : "default"}`}
            onMouseLeave={() => setHovered(false)}
            onMouseEnter={() => setHovered(true)}
        >
            <Box className="frame">
                <Box className="heading">{props.heading}</Box>
                <Box className="abstract">{props.description}</Box>
            </Box>
            <Button size="sm">Learn More</Button>
        </Box>
    );
};
