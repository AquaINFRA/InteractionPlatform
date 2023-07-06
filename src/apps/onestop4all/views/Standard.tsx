import { Box, Container, Image, Grid, GridItem } from "@open-pioneer/chakra-integration";
import { SearchBar } from "../components/SearchBar";
import { ResourceTypeHeader } from "../components/ResourceType/ResourceTypeHeader";

export function StandardView() {
    return (
        <>
            <Image src="/image2.png" width="100%" />
            <Box position="absolute" width="100%" marginTop="-50px">BorderColor
                <Container maxW="80%">
                    <SearchBar></SearchBar>
                </Container>
            </Box>
            <ResourceTypeHeader resType="standard"></ResourceTypeHeader>
        </>
    );
}