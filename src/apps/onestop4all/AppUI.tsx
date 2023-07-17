import { Box, ChakraProvider, Container, Flex } from "@open-pioneer/chakra-integration";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { NavigationMenu } from "./components/NavigationMenu";
import { Theme } from "./Theme";
import { SearchView } from "./views/Search";
import { StandardView } from "./views/Standard/Standard";
import { ServiceView } from "./views/Service/Service";
import { StartView } from "./views/Start/Start";
import { ToolsSoftwareView } from "./views/ToolsSoftware/ToolsSoftware";

const basePath = "/";
// const basePath = "/";

const router = createBrowserRouter([
    {
        path: `${basePath}`,
        element: <StartView />
    },
    {
        path: `${basePath}search`,
        element: <SearchView />
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
        path: `${basePath}tools_software`,
        element: <ToolsSoftwareView />
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
]);

export function AppUI() {
    return (
        <ChakraProvider theme={Theme}>
            <NavigationMenu></NavigationMenu>

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
