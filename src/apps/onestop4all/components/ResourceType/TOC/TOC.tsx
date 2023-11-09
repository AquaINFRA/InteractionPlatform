import { Box } from "@open-pioneer/chakra-integration";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export interface HeadingProperties {
    title: string;
    offset: number;
}

export interface H1 {
    innerHTML: string;
}

export const TOC = (props: { elementRef: any }) => {
    const { elementRef } = props;
    const [title, setTitle] = useState("");
    const [heading, setHeading] = useState(new Array<HeadingProperties>());

    const scrollTo = (offset: number) => {
        window.scrollTo({
            top: offset - 151, //151 is the height of the header
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const divElement = Array.from(elementRef.current.children);
        const headingsList = new Array<HeadingProperties>();
        console.log(elementRef);
    }, []);

    return (
        <Box pt="80px">
            <div className="tocHeader">Table of content</div>
            <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem borderTopWidth="0 !important" borderBottomWidth="0 !important">
                    <div>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                <span className="tocTitle">{title}</span>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </div>
                    <AccordionPanel>
                        {heading.map((heading, i) => (
                            <Box
                                className="tocElement"
                                key={i}
                                onClick={() => scrollTo(heading.offset)}
                                _hover={{ cursor: "pointer" }}
                            >
                                {i + 1} {heading.title}
                            </Box>
                        ))}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    );
};
