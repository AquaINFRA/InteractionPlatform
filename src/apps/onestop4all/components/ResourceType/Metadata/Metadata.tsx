import {
    Flex,
    Box,
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionButton
} from "@open-pioneer/chakra-integration";
import { useState } from "react";
import { UpIcon, DownIcon } from "../../Icons";

export const Metadata = (props: { metadataElements: object }) => {
    const metadataElements = Object.values(props.metadataElements);

    function isUrl(url: string) {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(url);
    }

    const [expanded, setExpanded] = useState(true);

    return (
        <Accordion allowMultiple defaultIndex={expanded ? [0] : [1]}>
            <AccordionItem>
                <AccordionPanel>
                    <Box>
                        <p className="metadataSectionHeader">Metadata</p>
                        <div className="seperator"></div>
                        {metadataElements.map((e, i) =>
                            e.tag != "Keywords" ? (
                                <Box key={i}>
                                    <div>
                                        {!isUrl(e.val) ? (
                                            <Flex>
                                                <span className="metadataTag">{e.tag}:&nbsp;</span>
                                                <span className="metadataValue">{e.val}</span>
                                            </Flex>
                                        ) : (
                                            <Flex>
                                                <span className="metadataTag">{e.tag}:&nbsp;</span>{" "}
                                                <span className="metadataValue">
                                                    <a href={e.val} className="metadataLink">
                                                        {e.val}
                                                    </a>
                                                </span>
                                            </Flex>
                                        )}
                                    </div>
                                    <div className="seperator"></div>
                                </Box>
                            ) : (
                                <Box key={i}>
                                    <span className="metadataTag">{e.tag}:&nbsp;</span>
                                    {e.val.map((elem: string, j: number) => (
                                        <a
                                            href={"/search?keyword=" + elem}
                                            className="metadataKeyword"
                                            key={j}
                                        >
                                            {elem}
                                        </a>
                                    ))}
                                </Box>
                            )
                        )}
                    </Box>
                </AccordionPanel>
                <h2>
                    <AccordionButton onClick={() => setExpanded(!expanded)}>
                        <Flex
                            alignItems="center"
                            direction="column"
                            gap="4px"
                            style={{ marginLeft: "40%", marginRight: "40%" }}
                        >
                            {expanded ? (
                                <>
                                    <Box>
                                        <UpIcon />
                                    </Box>
                                    <Box className="metadataShowHide">Hide metadata</Box>
                                </>
                            ) : (
                                <>
                                    <Box className="metadataShowHide">Show metadata</Box>
                                    <Box>
                                        <DownIcon />
                                    </Box>
                                </>
                            )}
                        </Flex>
                    </AccordionButton>
                </h2>
            </AccordionItem>
        </Accordion>
    );
};
