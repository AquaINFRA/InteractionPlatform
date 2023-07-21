import { Box, ChakraProvider, Container, Flex } from "@open-pioneer/chakra-integration";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { BaseMenu } from "./components/BaseMenu/BaseMenu";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Theme } from "./Theme";
import { SearchView } from "./views/Search/Search";
import { SearchState } from "./views/Search/SearchState";
import { ServiceView } from "./views/Service/Service";
import { StandardView } from "./views/Standard/Standard";
import { StartView } from "./views/Start/Start";

const basePath = "/";

const router = createBrowserRouter([
    {
        path: `${basePath}`,
        element: <StartView />
    },
    {
        path: `${basePath}search`,
        element: (
            <SearchState>
                <SearchView />
            </SearchState>
        )
    },
    {
        path: `${basePath}standard`,
        element: <StandardView />
    },
    {
        path: `${basePath}service`,
        element: <ServiceView />
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
]);

export function AppUI() {
    return (
        <ChakraProvider theme={Theme}>
            <BaseMenu></BaseMenu>

            <Flex as="header" position="fixed" w="100%" bg="white" zIndex="1000">
                <Container maxW={{ base: "100%", custombreak: "80%" }}>
                    <Header></Header>
                </Container>
            </Flex>

            <Box as="main" w="100%" pt="152px">
                <RouterProvider router={router}></RouterProvider>
            </Box>

            <Box as="footer" w="100%">
                <Footer></Footer>
            </Box>
        </ChakraProvider>
    );
}
