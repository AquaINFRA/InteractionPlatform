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
import { MetadataContent } from "./MetadataContent";

export const Metadata = (props: {
    metadataElements: object;
    visibleElements: number;
    expandedByDefault: boolean;
}) => {
    const { visibleElements, expandedByDefault } = props;
    const [expanded, setExpanded] = useState(expandedByDefault);
    const metadataElements = Object.values(props.metadataElements);

    return (
        <Box>
            <Box>
                <p className="metadataSectionHeader">Metadata</p>
                <MetadataContent
                    metadataElements={props.metadataElements}
                    start={0}
                    end={visibleElements}
                />
            </Box>
            <Accordion allowMultiple defaultIndex={expanded ? [0] : [1]}>
                <AccordionItem borderTopWidth="0 !important" borderBottomWidth="0 !important">
                    <AccordionPanel
                        paddingInlineStart="unset !important"
                        paddingInlineEnd="unset !important"
                        paddingTop="unset !important"
                    >
                        <MetadataContent
                            metadataElements={props.metadataElements}
                            start={visibleElements}
                            end={metadataElements.length}
                        />
                    </AccordionPanel>
                    {visibleElements < metadataElements.length ? (
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
                                            <Box className="metadataShowHide">Show full list</Box>
                                            <Box>
                                                <DownIcon />
                                            </Box>
                                        </>
                                    )}
                                </Flex>
                            </AccordionButton>
                        </h2>
                    ) : (
                        <></>
                    )}
                </AccordionItem>
            </Accordion>
        </Box>
    );
};
