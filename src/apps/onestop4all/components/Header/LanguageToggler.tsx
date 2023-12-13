import { Box, HStack, Icon, Link } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";

import { PrimaryColor } from "../../Theme";
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
            <Icon boxSize={6} color={PrimaryColor}>
                <WorldIcon />
            </Icon>
            <Link
                whiteSpace="nowrap"
                display="flex"
                gap={{ base: "0px", custombreak: "4px" }}
                onClick={() => toggleLocale()}
            >
                <Box style={{ fontWeight: locale === "en" ? "bold" : "lighter" }}>EN</Box>
                <Box style={{ fontWeight: "lighter" }}>/</Box>
                <span style={{ fontWeight: locale === "de" ? "bold" : "lighter" }}>DE</span>
            </Link>
        </HStack>
    );
}
