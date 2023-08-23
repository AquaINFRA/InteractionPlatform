import { Box, ChakraProvider, Container, Flex } from "@open-pioneer/chakra-integration";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";

import { BaseMenu } from "./components/BaseMenu/BaseMenu";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Theme } from "./Theme";
import { ArticleView } from "./views/Article/Article";
import { DatasetView } from "./views/Dataset/Dataset";
import { DocumentView } from "./views/Document/Document";
import { OerView } from "./views/OpenEducationalResource/Oer";
import { OrganisationView } from "./views/Organisation/Organisation";
import { RepositoryView } from "./views/Repository/Repository";
import { SearchView } from "./views/Search/Search";
import { SearchState } from "./views/Search/SearchState";
import { ServiceView } from "./views/Service/Service";
import { StandardView } from "./views/Standard/Standard";
import { StartView } from "./views/Start/Start";
import { ToolsSoftwareView } from "./views/ToolsSoftware/ToolsSoftware";

const basePath = "/";

const router = createBrowserRouter([
    {
        path: `${basePath}`,
        element: <Layout />,
        children: [
            {
                path: ``,
                element: <StartView />
            },
            {
                path: `search`,
                element: <SearchView />
            },
            {
                path: `standard/:id`,
                element: <StandardView />
            },
            {
                path: `service/:id`,
                element: <ServiceView />
            },
            {
                path: `tools_software/:id`,
                element: <ToolsSoftwareView />
            },
            {
                path: `oer/:id`,
                element: <OerView />
            },
            {
                path: `repository/:id`,
                element: <RepositoryView />
            },
            {
                path: `dataset/:id`,
                element: <DatasetView />
            },
            {
                path: `organisation/:id`,
                element: <OrganisationView />
            },
            {
                path: `document/:id`,
                element: <DocumentView />
            },
            {
                path: `article/:id`,
                element: <ArticleView />
            },
            {
                path: "*",
                element: <Navigate to="/" />
            }
        ]
    }
]);

export function AppUI() {
    return <RouterProvider router={router}></RouterProvider>;
}

function Layout() {
    return (
        <>
            <ChakraProvider theme={Theme}>
                <BaseMenu></BaseMenu>

                <Flex as="header" position="fixed" w="100%" bg="white" zIndex="1000">
                    <Container maxW={{ base: "100%", custombreak: "80%" }}>
                        <Header></Header>
                    </Container>
                </Flex>

                <Box as="main" w="100%" pt="152px">
                    <SearchState>
                        <Outlet />
                    </SearchState>
                </Box>

                <Box as="footer" w="100%">
                    <Footer></Footer>
                </Box>
            </ChakraProvider>
        </>
    );
}
