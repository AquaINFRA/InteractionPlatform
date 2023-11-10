import { Box, SystemStyleObject } from "@open-pioneer/chakra-integration";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export interface H1 {
    innerHTML: string;
}

export interface Headings {
    innerHTML: string;
    localName: string;
    element: HTMLElement;
}

export const TOC = (props: { elementRef: any }) => {
    const { elementRef } = props;
    const [title, setTitle] = useState("");
    const [headings, setHeadings] = useState(new Array<HTMLElement>());

    const scrollTo = (element: HTMLElement) => {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const hoverStyle: SystemStyleObject = {
        cursor: "pointer",
        backgroundColor: "var(--primary-primary-transparent-background)"
    };

    useEffect(() => {
        const divElement = Array.from(elementRef.current.children[0].children);
        const headingsList = new Array<HTMLElement>();
        const h1 = divElement.filter((child: any) => child.localName === "h1")[0] as H1;
        const heading = divElement.filter(
            (child: any) => child.localName === "h2" || child.localName === "h3"
        );
        h1 ? setTitle(h1.innerHTML) : setTitle("Living Handbook");
        heading.forEach((elem: any) => {
            console.log(typeof elem);
            headingsList.push(elem);
        });
        setHeadings(headingsList);
    }, [elementRef.current.children[0]]);

    return (
        <nav>
            {headings && headings.length > 1 ? (
                <Box pt="80px">
                    <div className="tocHeader">Table of content</div>
                    <Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem
                            borderTopWidth="0 !important"
                            borderBottomWidth="0 !important"
                        >
                            <div>
                                <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left">
                                        <span className="tocTitle">{title}</span>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </div>
                            <AccordionPanel>
                                {headings.map((heading, i) =>
                                    heading.localName === "h2" ? (
                                        <Box
                                            className="tocElementH1"
                                            key={i}
                                            onClick={() => scrollTo(heading)}
                                            _hover={hoverStyle}
                                        >
                                            <li>{heading.innerHTML}</li>
                                        </Box>
                                    ) : heading.localName === "h3" ? (
                                        <Box
                                            className="tocElementH2"
                                            key={i}
                                            onClick={() => scrollTo(heading)}
                                            _hover={hoverStyle}
                                        >
                                            {heading.innerHTML}
                                        </Box>
                                    ) : null
                                )}
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
            ) : (
                <></>
            )}
        </nav>
    );
};
