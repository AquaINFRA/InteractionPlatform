import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@chakra-ui/react";
import { scrollUp } from "../../../services/SearchUtils";
import { DkpProvider } from "../../../services/DkpUtils";

const PROVIDER_LABELS: Record<DkpProvider, string> = {
    zenodo: "Zenodo",
    b2share: "B2Share"
};

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

export const DemonstratorEntry = (props: { title: string; provider: DkpProvider; id: string; }) => {
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();
    
    const {title, provider, id} = props;

    const handleClick = () => {
        navigate(`/result/${provider}:${id}`);
        scrollUp(0);
    };

    return (
        <Box 
            display="flex" 
            width="100%" 
            flexWrap="wrap"
        >
            <Box
                className={`how-to-entry ${hovered ? "hover" : "default"}`}
                onMouseLeave={() => setHovered(false)}
                onMouseEnter={() => setHovered(true)}
                onClick={handleClick}
                boxShadow="md"
                backgroundColor={hovered ? "gray.100" : "white"}
            >
                <Box className="frame" display="flex" flexDirection="column" height="100%">
                    <Box className="heading" fontSize="lg">{title}</Box>
                    <Box display="flex" gap={2} flexWrap="wrap">
                        <Badge colorScheme="purple">Data-to-Knowledge Package</Badge>
                        <Badge colorScheme="gray">{PROVIDER_LABELS[provider]}</Badge>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
