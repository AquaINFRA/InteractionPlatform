import { ChakraProvider, Container } from "@open-pioneer/chakra-integration";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { NavigationMenu } from "./components/NavigationMenu";
import { Theme } from "./Theme";
import { SearchView } from "./views/Search";
import { StartView } from "./views/Start";
import { StandardView } from "./views/Standard";

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
        path: "*",
        element: <Navigate to="/" />
    }
]);

export function AppUI() {
    return (
        <ChakraProvider theme={Theme}>
            <Container maxW="80%">
                <Header></Header>
            </Container>
            <NavigationMenu></NavigationMenu>
            <RouterProvider router={router}></RouterProvider>
        </ChakraProvider>
    );
}
