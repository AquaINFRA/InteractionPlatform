import { Box, SimpleGrid } from "@open-pioneer/chakra-integration";
import { useIntl } from "open-pioneer:react-hooks";

import { DemonstratorEntry } from "./DemonstratorEntry";

export const DemonstratorEntries = () => {
    const intl = useIntl();

    return (
        <Box className="how-to">
            <Box className="text-centered-box" marginBottom={{ base: "5%", custombreak: "0%" }}>
                <Box className="text-centered-box-header">
                    Browse through our ready-to-use demonstrators
                </Box>
            </Box>
            <SimpleGrid
                columns={[1, 2, 3]}
                spacing={5}
                //padding={"0px 0px"}
                marginTop={"1%"}
            >
                <DemonstratorEntry 
                    title={"Daugava use case"} 
                    subheading={"Investigating the ..."} 
                    id={"data"} 
                />
                <DemonstratorEntry 
                    title={"pyOWT"} 
                    subheading={"python library for Optical Water Type classification"} 
                    id={"tools"} 
                />
            </SimpleGrid>
        </Box>
    );
};
