import { defineBuildConfig } from "@open-pioneer/build-support";

export default defineBuildConfig({
    i18n: ["en", "de"],
    services: {
        MenuHandler: {
            provides: ["empty.MenuHandler"]
        }
    },
    ui: {
        references: [
            "runtime.ApplicationContext",
            "integration.ExternalEventService",
            "empty.MenuHandler"
        ]
    }
});
