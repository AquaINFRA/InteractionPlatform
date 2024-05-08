import { Box } from "@open-pioneer/chakra-integration";
import { lineBlue } from "./Styles";
import { Flex } from "@open-pioneer/chakra-integration";

export function Legend() {
    return (
        <Box>
            <h4 style={{ fontWeight: "bold", fontSize: "4vh" }}> Legend </h4>
            <Flex direction={"column"} gap={"1vh"}>
                <Flex style={{ marginBottom: "5px", fontSize: "2vh" }}>
                    <Flex marginTop={"-0.3vh"} width="7vh">
                        <img src="/area.svg" alt="Catchment area" />
                    </Flex>
                    Catchment area
                </Flex>
                <Flex style={{ marginBottom: "5px", fontSize: "2vh" }}>
                    <Flex marginTop={"-0.3vh"} width="7vh">
                        <img src="/areaSelected.svg" alt="Selected area" />
                    </Flex>
                    Selected area
                </Flex>
                <Flex style={{ marginBottom: "5px", fontSize: "2vh" }}>
                    <Flex marginTop={"-0.3vh"} width="7vh">
                        <img src="/bbox.svg" alt="Bounding box" />
                    </Flex>
                    Bounding box
                </Flex>
            </Flex>
        </Box>
    );
}
