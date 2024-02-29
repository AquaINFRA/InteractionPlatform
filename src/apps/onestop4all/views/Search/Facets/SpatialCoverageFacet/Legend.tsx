import { Box } from "@open-pioneer/chakra-integration";

export function Legend() {
    return (
        <Box>
            <h4> Legend: </h4>
            <Box
                style={{
                    width: "30px",
                    height: "3px",
                    backgroundColor: "blue",
                    display: "inline-block"
                }}
            ></Box>{" "}
            Catchment area
            <Box
                style={{
                    width: "30px",
                    height: "3px",
                    backgroundColor: "green",
                    display: "inline-block",
                    border: "2px dashed white"
                }}
            ></Box>{" "}
            Bounding Box
        </Box>
    );
}
