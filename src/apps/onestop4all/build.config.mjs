import { defineBuildConfig } from "@open-pioneer/build-support";

export default defineBuildConfig({
    styles: "styles.scss",
    i18n: ["en", "de"],
    services: {
        MenuHandler: {
            provides: ["onestop4all.MenuHandler"]
        },
        SearchService: {
            provides: ["onestop4all.SearchService"]
        }
    },
    properties: {
        solr: {
            url: "http://localhost:8983/solr",
            coreSelector: "metadata"
        }
    },
    ui: {
        references: [
            "runtime.ApplicationContext",
            "integration.ExternalEventService",
            "onestop4all.MenuHandler",
            "onestop4all.SearchService",
            "ol-map.MapRegistry"
        ]
    }
});
