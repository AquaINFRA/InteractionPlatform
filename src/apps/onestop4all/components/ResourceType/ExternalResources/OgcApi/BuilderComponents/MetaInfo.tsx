import { Box } from "@chakra-ui/react";

export const MetaInfo = (props: {title: string; description: string; crs: string;}) => {
    const {title, description, crs} = props;
    return (
        <Box>
            <p><b>Title:</b> {title}</p>
            <p><b>Description:</b> {description}</p>
            <p>
                <b>Coordinate Reference System (CRS):</b>{" "}
                <a 
                    href={crs} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: "#05668d", textDecoration: "underline" }}
                >
                    {crs}
                </a>
            </p>
        </Box>
    );
};
