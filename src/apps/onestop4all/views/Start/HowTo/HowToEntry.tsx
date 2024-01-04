import { Box } from "@chakra-ui/react";
import { useIntl } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { useService } from "open-pioneer:react-hooks";
import { useNavigate } from "react-router-dom";
import yaml from "js-yaml";

export interface HowToEntryYaml {
    name: string;
    description: string;
}

export const HowToEntry = (props: { howToEntryTitle: string }) => {
    const [hovered, setHovered] = useState(false);

    const navigate = useNavigate();

    const howToEntryTitle = props.howToEntryTitle;

    const handleClick = () => {
        navigate(`/demonstrator/`);
        window.scroll(0, 0);
    };

    return (
        <div style={{ width: "100%" }}>
            <Box
                className={`how-to-entry ${hovered ? "hover" : "default"}`}
                onMouseLeave={() => setHovered(false)}
                onMouseEnter={() => setHovered(true)}
                onClick={() => {
                    handleClick();
                }}
            >
                <Box className="frame">
                    <Box className="heading">Title</Box>
                    <Box className="abstract">Text</Box>
                </Box>
            </Box>
        </div>
    );
};
