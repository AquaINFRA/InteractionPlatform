import { defineStyleConfig, extendTheme } from "@chakra-ui/react";

export const PrimaryColor = "#05668D";

export const BorderColor = "#CCCCCC";

export const Theme = extendTheme({
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
                        bg: "green"
                    }
                }
            }
        })
    }
});
