// SPDX-FileCopyrightText: con terra GmbH and contributors
// SPDX-License-Identifier: Apache-2.0
import { Container } from "@open-pioneer/chakra-integration";

import { Header } from "./components/Header/Header";

export function AppUI() {
    return (
        <Container maxW="80%">
            <Header></Header>
        </Container>
    );
}
