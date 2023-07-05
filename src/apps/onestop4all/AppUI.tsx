import { ChakraProvider, Container } from "@open-pioneer/chakra-integration";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { NavigationMenu } from "./components/NavigationMenu";
import { Theme } from "./Theme";
import { SearchView } from "./views/Search";
import { StartView } from "./views/Start";

const basePath = "/sites/onestop4all/";
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
        path: "*",
        element: <Navigate to="/" />
    }
]);

export function AppUI() {
    return (
        <ChakraProvider theme={Theme}>
            <NavigationMenu></NavigationMenu>

            <Container maxW="80%">
                <Header></Header>
            </Container>
            <RouterProvider router={router}></RouterProvider>
            <Footer></Footer>
        </ChakraProvider>
    );
}
