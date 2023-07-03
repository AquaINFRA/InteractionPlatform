import { EventEmitter } from "@open-pioneer/core";

export interface MenuOpenerEvents {
    "open-menu": boolean;
}

export class MenuHandler extends EventEmitter<MenuOpenerEvents> {
    open(): void {
        this.emit("open-menu", true);
    }
    close(): void {
        this.emit("open-menu", false);
    }
}

import "@open-pioneer/runtime";
declare module "@open-pioneer/runtime" {
    interface ServiceRegistry {
        "empty.MenuHandler": MenuHandler;
    }
}
