import { Box } from "@open-pioneer/chakra-integration";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon
} from "@chakra-ui/react";

export const TOC = (props: { md: string }) => {
    const md = props.md;

    const extractHeadings = (md: string) => {
        const headingsRegex = /#{1,6}.+/g;
        const headings = md.match(headingsRegex);
        const headingAndSubheading = new Array<string>();
        headings?.map((h) => {
            const level = h.match(/#/g)?.length;
            level == 1 || level == 2 ? headingAndSubheading.push(h.slice(level)) : null;
        });
        return headingAndSubheading;
    };

    const headings = extractHeadings(md);

    return (
        <Box style={{ overflowY: "scroll" }}>
            <p className="tocHeader">Table of contents</p>
            <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem borderTopWidth="0 !important" borderBottomWidth="0 !important">
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                <span className="tocTitle">{headings[0]}</span>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel>
                        {headings.slice(1).map((heading, i) => (
                            <p key={i}>
                                {i + 1} {heading}
                            </p>
                        ))}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
};
