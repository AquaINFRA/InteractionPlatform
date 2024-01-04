/* eslint-disable */
import { Box, Flex, SimpleGrid } from "@open-pioneer/chakra-integration";
import { HowToEntry } from "./HowToEntry";

export const HowToEntries = () => {
    const howToEntries = ["Title 1", "Title 2", "Title 3"];

    if (howToEntries.length > 2) {
        return (
            <Box className="how-to">
                <Box className="text-centered-box">
                    <Box className="text-centered-box-header">
                        Browse through our ready-to-use demonstrators
                    </Box>
                    <Box className="text-centered-box-text">
                        The demonstrators showcase the features provided by the Virtual Research
                        Environment and can be combined with a training.
                    </Box>
                </Box>
                <SimpleGrid columns={[1, 2, 3]} spacing={10} padding={"0px 100px"} marginTop={"1%"}>
                    {howToEntries.map((howToEntry, index) => (
                        <Flex key={index}>
                            <HowToEntry howToEntryTitle={howToEntry} key={index} />
                        </Flex>
                    ))}
                </SimpleGrid>
            </Box>
        );
    } else {
        return null;
    }
};
