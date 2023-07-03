import { Button, HStack } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";

import { WorldIcon } from "../Icons";

export function LanguageToggler() {
    const appCtx = useService("runtime.ApplicationContext");
    const locale = appCtx.getLocale();

    const eventService = useService("integration.ExternalEventService");

    function toggleLocale(): void {
        eventService.emitEvent("locale-changed", {
            locale: locale === "en" ? "de" : "en"
        });
    }

    return (
        <HStack>
            <Button
                leftIcon={<WorldIcon boxSize={6} />}
                variant="ghost"
                colorScheme="teal"
                onClick={() => toggleLocale()}
            >
                <span style={{ fontWeight: locale === "en" ? "bold" : "lighter" }}>EN</span>
                <span style={{ padding: "5px", fontWeight: "lighter" }}> / </span>
                <span style={{ fontWeight: locale === "de" ? "bold" : "lighter" }}>DE</span>
            </Button>
        </HStack>
    );
}
