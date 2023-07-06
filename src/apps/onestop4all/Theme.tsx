import { defineStyleConfig, extendTheme } from "@open-pioneer/chakra-integration";

export const PrimaryColor = "#05668D";

export const BorderColor = "#CCCCCC";

export const Theme = extendTheme({
    breakpoints: {
        custombreak: "1000px"
    },
    components: {
        Button: defineStyleConfig({
            baseStyle: {
                borderRadius: "0px"
            },
            variants: {
                solid: {
                    bg: PrimaryColor,
                    color: "white",
                    textTransform: "uppercase",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                    _hover: {
                        bg: PrimaryColor
                    }
                }
            }
        }),
        Link: defineStyleConfig({
            baseStyle: {
                color: PrimaryColor,
                fontWeight: 700
            }
        })
    }
});
