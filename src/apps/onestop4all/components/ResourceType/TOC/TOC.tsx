import { Box, SystemStyleObject } from "@open-pioneer/chakra-integration";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useService } from "open-pioneer:react-hooks";
import { useNavigate } from "react-router-dom";
import yaml from "js-yaml";

export interface H1 {
    innerHTML: string;
}

export interface Headings {
    innerHTML: string;
    localName: string;
    element: HTMLElement;
}

export interface LhbStructure {
    nav: object[];
}

export interface OtherChaptersLinking {
    id: string;
    name: string;
}

const findLhbStructure = (sections: object | [], sourceId: string) => {
    sourceId = sourceId.includes("/") ? (sourceId.split("/").pop() as string) : sourceId;
    let foundList = new Array<string>();

    if (Array.isArray(sections) && sections.length > 0 && sourceId) {
        sections.some((section) => {
            const key = Object.keys(section)[0];
            if (key !== undefined) {
                if (typeof section === "string") {
                    const fileId = section;
                    if (fileId === sourceId) {
                        foundList = sections;
                        return true;
                    }
                } else if (typeof section[key] === "object") {
                    const result = findLhbStructure(section[key], sourceId);
                    if (result.length > 0) {
                        foundList = result;
                        return true;
                    }
                }
            }
            return false;
        });
    }
    return foundList;
};

const removeEmptyObjects = (chapters: any[]) => {
    const newChapters = new Array<object>();
    if (chapters.length > 0) {
        chapters.forEach((chapter) => {
            chapter.numFound > 0 ? newChapters.push(chapter.docs[0]) : null;
        });
    }
    return newChapters;
};

const sortChapters = (chapters: any[], lhbToc: string[]) => {
    const newChapters = new Array<object>();
    lhbToc.forEach((lhb) => {
        chapters.forEach((chapter) => {
            lhb === chapter.sourceSystem_id.split("/").pop() ? newChapters.push(chapter) : null;
        });
    });
    return newChapters;
};

const splitChapters = (chapters: any[], sourceId: string, order: string) => {
    let indexOfLhb = -1;
    chapters.forEach((chapter, i) => {
        sourceId === chapter.sourceSystem_id ? (indexOfLhb = i) : null;
    });
    if (indexOfLhb > -1 && order === "before") {
        return chapters.slice(0, indexOfLhb);
    } else {
        if (indexOfLhb > -1 && order === "after") {
            return chapters.slice(indexOfLhb + 1, chapters.length);
        } else {
            return undefined;
        }
    }
};

export const TOC = (props: { elementRef: any; sourceId: string }) => {
    const { elementRef, sourceId } = props;
    const [title, setTitle] = useState("");
    const [headings, setHeadings] = useState(new Array<HTMLElement>());
    const searchSrvc = useService("onestop4all.SearchService");
    const [chaptersBefore, setChaptersBefore] = useState<OtherChaptersLinking[]>();
    const [chaptersAfter, setChaptersAfter] = useState<OtherChaptersLinking[]>();
    const navigate = useNavigate();

    const scrollTo = (element: HTMLElement) => {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const hoverStyle: SystemStyleObject = {
        cursor: "pointer",
        backgroundColor: "var(--primary-primary-transparent-background)"
    };

    const OtherChaptersLink = (props: {
        otherChapters: OtherChaptersLinking[];
        chapterNumber?: number;
    }) => {
        const { otherChapters, chapterNumber } = props;
        return (
            <div className="tocElementOther">
                {otherChapters?.map((chap, index) => (
                    <Box
                        key={index}
                        onClick={() => {
                            navigate("/result/" + chap.id);
                        }}
                        _hover={{ cursor: "pointer" }}
                        className="tocElementOtherIndividual"
                    >
                        {index + (chapterNumber ? chapterNumber : 0)}{" "}
                        <a className="faqListItems">{chap.name}</a>
                    </Box>
                ))}
            </div>
        );
    };

    const Title = (props: { otherChapters?: object[]; title: string }) => {
        const { otherChapters, title } = props;
        return (
            <Box as="span" flex="1" textAlign="left" className="tocTitle">
                {otherChapters && otherChapters.length > 0 ? otherChapters.length + 1 : 1} {title}
            </Box>
        );
    };

    useEffect(() => {
        console.log("TOC component rendered with sourceId:", sourceId);
        searchSrvc.getLhbStructure().then((result) => {
            result.text().then((res) => {
                const parsedYaml = yaml.load(res) as LhbStructure;
                const lhbStructure = findLhbStructure(parsedYaml.nav, sourceId);
                if (lhbStructure.length > 0) {
                    let chapters = new Array<object>();
                    lhbStructure.forEach((element) => {
                        searchSrvc.getChapter(element).then((ch) => {
                            ch.json().then((chapter) => {
                                chapters.push(chapter.response);
                                if (chapters.length === lhbStructure.length) {
                                    chapters = removeEmptyObjects(chapters);
                                    if (chapters.length > 0) {
                                        chapters = sortChapters(chapters, lhbStructure);
                                        const chaptersBefore = splitChapters(
                                            chapters,
                                            sourceId,
                                            "before"
                                        );
                                        const chaptersAfter = splitChapters(
                                            chapters,
                                            sourceId,
                                            "after"
                                        );
                                        setChaptersBefore(chaptersBefore);
                                        setChaptersAfter(chaptersAfter);
                                    }
                                }
                            });
                        });
                    });
                }
            });
        });
    }, [sourceId]);

    useEffect(() => {
        const divElement = Array.from(elementRef.current.children[0].children);
        const headingsList = new Array<HTMLElement>();
        const h1 = divElement.filter((child: any) => child.localName === "h1")[0] as H1;
        const heading = divElement.filter(
            (child: any) => child.localName === "h2" || child.localName === "h3"
        );
        h1 ? setTitle(h1.innerHTML) : setTitle("Living Handbook");
        heading.forEach((elem: any) => {
            headingsList.push(elem);
        });
        setHeadings(headingsList);
    }, [elementRef.current.children[0]]);

    return (
        <nav>
            <Box pt="80px">
                <div className="tocHeader">Table of content</div>
                {chaptersBefore && chaptersBefore.length > 0 ? (
                    <OtherChaptersLink otherChapters={chaptersBefore} chapterNumber={1} />
                ) : null}
                {headings && headings.length > 0 ? (
                    <Accordion defaultIndex={[0]} allowMultiple>
                        <AccordionItem
                            borderTopWidth="0 !important"
                            borderBottomWidth="0 !important"
                        >
                            <AccordionButton paddingInlineStart={0}>
                                <Title otherChapters={chaptersBefore} title={title} />
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel>
                                {headings.map((heading, i) =>
                                    heading.localName === "h2" ? (
                                        <Box
                                            className="tocElementH2"
                                            key={i}
                                            onClick={() => scrollTo(heading)}
                                            _hover={hoverStyle}
                                        >
                                            <li>{heading.innerHTML}</li>
                                        </Box>
                                    ) : heading.localName === "h3" ? (
                                        <Box
                                            className="tocElementH3"
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
                ) : (
                    <Title otherChapters={chaptersBefore} title={title} />
                )}
                {chaptersAfter && chaptersAfter.length > 0 ? (
                    <OtherChaptersLink
                        otherChapters={chaptersAfter}
                        chapterNumber={
                            chaptersBefore && chaptersBefore.length ? chaptersBefore.length + 2 : 2
                        }
                    />
                ) : null}
            </Box>
        </nav>
    );
};
