import { Box } from "@open-pioneer/chakra-integration";
import { lineBlue } from "./Styles";
import { Flex } from "@open-pioneer/chakra-integration";

export function Legend() {
    return (
        <Box
            background={"rgba(255,255,255,0.7)"}
            borderRadius={"2%"}
            padding={"5"}
            paddingTop={"2"}
            paddingBottom={"2"}
        >
            <p style={{ fontWeight: "bold", fontSize: "20px", marginBottom: "5%" }}> Legend </p>
            <Flex direction={"column"} gap={"1vh"}>
                <Flex style={{ fontSize: "16px", fontWeight: "700" }}>
                    <Flex marginTop={"-0.3vh"} width="5vh">
                        <img src="/area.svg" alt="Catchment area" />
                    </Flex>
                    Catchment area
                </Flex>
                <Flex style={{ fontSize: "16px", fontWeight: "700" }}>
                    <Flex marginTop={"-0.3vh"} width="5vh">
                        <img src="/areaSelected.svg" alt="Selected area" />
                    </Flex>
                    Selected area
                </Flex>
                <Flex style={{ fontSize: "16px", fontWeight: "700" }}>
                    <Flex marginTop={"-0.3vh"} width="5vh">
                        <img src="/bbox.svg" alt="Bounding box" />
                    </Flex>
                    Bounding box
                </Flex>
            </Flex>
        </Box>
    );
}
