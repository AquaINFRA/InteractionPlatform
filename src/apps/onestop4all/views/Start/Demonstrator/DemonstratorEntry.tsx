import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useService } from "open-pioneer:react-hooks";
import { useNavigate } from "react-router-dom";
//import Skeleton from "../../../components/Skeleton/Skeleton";
import { SearchService } from "../../../services";

export interface DemonstratorEntryMetadata {
    name: string;
    description: string;
    id: string;
}

export interface DemonstratorEntryResult {
    response: {
        docs?: [
            {
                mainTitle: string;
                description: string;
                id: string;
            }
        ];
    };
}

export const DemonstratorEntry = (props: { title: string; subheading: string; id: string; }) => {
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();
    
    const {title, subheading, id} = props;

    const handleClick = (id: string) => {
        navigate(`/demonstrator/` + id);
        window.scroll(0, 0);
    };

    return (
        <Box 
            display="flex" 
            width="100%" 
            flexWrap="wrap" // If you want multiple boxes to wrap in the same container
        >
            <Box
                className={`how-to-entry ${hovered ? "hover" : "default"}`}
                onMouseLeave={() => setHovered(false)}
                onMouseEnter={() => setHovered(true)}
                onClick={() => handleClick(id)}
                boxShadow="md"
                backgroundColor={hovered ? "gray.100" : "white"}
            >
                <Box className="frame" display="flex" flexDirection="column" height="100%">
                    <Box className="heading" fontSize="lg">{title}</Box>
                    <Box className="abstract" fontSize="md" marginTop="0.5rem">{subheading}</Box>
                </Box>
            </Box>
        </Box>
    );
};
