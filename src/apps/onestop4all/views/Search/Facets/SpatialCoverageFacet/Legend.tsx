import { Box } from "@open-pioneer/chakra-integration";
import { lineBlue } from "./Styles";
import { Flex } from "@open-pioneer/chakra-integration";

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
                    <Flex gap="10px" alignItems="center">
                        <img src="/area.svg" />
                        <div className="label">legend</div>
                    </Flex>
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
                    <Flex gap="10px" alignItems="center">
                        <img src="/areaSelected.svg" />
                        <div className="label">legend</div>
                    </Flex>
                </Box>
                Selected area
            </Box>
            <Box style={{ marginBottom: "5px" }}>
                <Box
                    style={{
                        display: "inline-block",
                        verticalAlign: "middle",
                        marginRight: "5px"
                    }}
                >
                    <Flex gap="10px" alignItems="center">
                        <img src="/bbox.svg" />
                        <div className="label">legend</div>
                    </Flex>
                </Box>
                Bounding Box
            </Box>
        </Box>
    );
}
