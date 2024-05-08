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
                        <img src="/area.svg" />
                        <div className="label">legend</div>
                    </Flex>
                    Catchment area
                </Flex>
                <Flex style={{ marginBottom: "5px", fontSize: "2vh" }}>
                    <Flex marginTop={"-0.3vh"} width="7vh">
                        <img src="/areaSelected.svg" />
                        <div className="label">legend</div>
                    </Flex>
                    Selected area
                </Flex>
                <Flex style={{ marginBottom: "5px", fontSize: "2vh" }}>
                    <Flex marginTop={"-0.3vh"} width="7vh">
                        <img src="/bbox.svg" />
                        <div className="label">legend</div>
                    </Flex>
                    Bounding Box
                </Flex>
            </Flex>
        </Box>
    );
}
