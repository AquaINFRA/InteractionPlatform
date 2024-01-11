import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const DemonstratorEntry = (props: { demonstratorEntryTitle: string }) => {
    const [hovered, setHovered] = useState(false);

    const navigate = useNavigate();

    const demonstratorEntryTitle = props.demonstratorEntryTitle;

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
                    <Box className="heading">{demonstratorEntryTitle}</Box>
                    <Box className="abstract">Text</Box>
                </Box>
            </Box>
        </div>
    );
};
