import { Box, ChakraProvider, Container, Image } from "@open-pioneer/chakra-integration";

import { Header } from "./components/Header/Header";
import { NavigationMenu } from "./components/NavigationMenu";
import { SearchBar } from "./components/SearchBar";
import { Theme } from "./Theme";

export function AppUI() {
    return (
        <ChakraProvider theme={Theme}>
            <Container maxW="80%">
                <Header></Header>
            </Container>
            <Image src="/image1.png" width="100%" />
            <Box position="absolute" width="100%" marginTop="-50px">
                <Container maxW="80%">
                    <SearchBar></SearchBar>
                </Container>
            </Box>
            <NavigationMenu></NavigationMenu>
        </ChakraProvider>
    );
}
