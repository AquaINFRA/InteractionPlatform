import { Box } from "@open-pioneer/chakra-integration";
import { lineBlue } from "./Styles";

export function Legend() {
    return (
        <Box>
            <h4> Legend: </h4>
            <Box
                style={{
                    width: "30px",
                    height: "3px",
                    backgroundColor: lineBlue,
                    display: "inline-block"
                }}
            ></Box>{" "}
            Catchment area
            <Box
                style={{
                    width: "30px",
                    height: "3px",
                    backgroundColor: "rgba(0, 19, 255, 1)",
                    display: "inline-block",
                    border: "2px dashed white"
                }}
            ></Box>{" "}
            Bounding Box
        </Box>
    );
}
