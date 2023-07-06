import { Container, Image, HStack, Grid, GridItem } from "@open-pioneer/chakra-integration";
import { BorderColor } from "../../Theme";

export function ResourceTypeHeader(props: { resType: string }) {
    const resourceType = props.resType;
    const resourceIcon = "/" + resourceType + ".png";
    return (
        <Grid
            gridTemplateColumns={"2% 8% 40% 6% 4%"}
            //gridTemplateRows={"500px 1fr 300px"}
            //h="100px"
            //gap="1"
            color="blackAlpha.700"
            fontWeight="bold"
            marginLeft="10%"
            //marginRight="10%"
            marginTop="5%"
            //gridGap="1%"
        >
            <GridItem>
                <a href="/search">
                    <svg
                        width="16"
                        height="24"
                        viewBox="0 0 16 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.9546 22.5L2.50004 12L13.9546 1.5"
                            stroke="#05668D"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                    </svg>
                </a>
            </GridItem>
            <GridItem>
                <span>
                    <a href="/search">
                        <p
                            style={{
                                color: "#05668D",
                                fontSize: "14px",
                                //fontFamily: "Open Sans",
                                fontStyle: "normal",
                                fontWeight: "700",
                                lineHeight: "24px",
                                letterSpacing: "0.6px",
                                textTransform: "uppercase"
                            }}
                        >
                            Back <span style={{ color: "#666666" }}>to result</span>
                        </p>
                    </a>
                </span>
            </GridItem>
            <GridItem>
                <HStack
                    gap="20px"
                    margin="13px -5px"
                    padding="0px 0px"
                    borderBottom="1px solid"
                    borderBottomColor={BorderColor}
                    width="99%"
                ></HStack>
            </GridItem>
            <GridItem>
                <p
                    style={{
                        color: "#666666",
                        fontSize: "16px",
                        //fontFamily: "Open Sans",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "24px",
                        letterSpacing: "0.8px",
                        textTransform: "uppercase"
                    }}
                >
                    {resourceType}
                </p>
            </GridItem>
            <GridItem>
                <Image src={resourceIcon} width="60%" />
            </GridItem>
        </Grid>
    );
}
