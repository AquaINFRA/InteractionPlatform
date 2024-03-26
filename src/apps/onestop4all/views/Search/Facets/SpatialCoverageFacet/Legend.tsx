import { Box } from "@open-pioneer/chakra-integration";
import { lineBlue } from "./Styles";

export function Legend() {
    return (
        <Box>
            <h4 style={{ fontWeight: "bold" }}> Legend </h4>
            <Box style={{ marginBottom: "5px" }}>
                <Box
                    style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        marginRight: "5px"
                    }}
                >
                    <Box
                        style={{
                            width: "30px",
                            height: "3px",
                            backgroundColor: lineBlue
                        }}
                    ></Box>
                </Box>
                Catchment area
            </Box>
            <Box style={{ marginBottom: "5px" }}>
                <Box
                    style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        marginRight: "5px"
                    }}
                >
                    <Box
                        style={{
                            width: "30px",
                            height: "3px",
                            backgroundColor: "rgba(0, 19, 255, 1)",
                            border: "2px dashed white"
                        }}
                    ></Box>
                </Box>
                Bounding Box
            </Box>
        </Box>
    );
}
