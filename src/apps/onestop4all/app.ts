// SPDX-FileCopyrightText: con terra GmbH and contributors
// SPDX-License-Identifier: Apache-2.0
import { createCustomElement } from "@open-pioneer/runtime";
import * as appMetadata from "open-pioneer:app";

import { AppUI } from "./AppUI";

fetch("./config.json").then((file) => {
    file.json().then((config) => {
        const Element = createCustomElement({
            component: AppUI,
            config: {
                properties: {
                    onestop4all: config
                }
            },
            appMetadata,
            async resolveConfig(ctx) {
                const locale = ctx.getAttribute("forced-locale");
                if (!locale) {
                    return undefined;
                }
                return { locale };
            }
        });

        customElements.define("onestop4all-app", Element);
    });
});
