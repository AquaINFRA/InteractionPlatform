/* eslint-disable */
import { Box, Container, Flex } from "@open-pioneer/chakra-integration";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import remarkGfm from "remark-gfm";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeCitation from "rehype-citation";
import rehypeStringify from "rehype-stringify";
import parse from "html-react-parser";
import {
    rehypeCitationOptions,
    parseMarkdown,
    getTags,
    getLinkType
} from "../../../services/MarkdownUtils";

import { BackIcon } from "../../../components/Icons";
import { useService } from "open-pioneer:react-hooks";
import { SearchBar } from "../../../components/SearchBar";

export interface HowToDocs {
    id: string;
}
export interface HowToResponse {
    docs: HowToDocs[];
}

export const HowToEntryContent = () => {
    const searchSrvc = useService("onestop4all.SearchService");

    const markdown = useParams().content;
    const [markdownContent, setMdCon] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype, {})
            .use(rehypeCitation, rehypeCitationOptions)
            .use(rehypeStringify)
            .process(markdown)
            .then((file) => {
                const html = parseMarkdown(file.value as string);
                const htmlTags = getTags(html);
                if (html && htmlTags && htmlTags.length > 0) {
                    for (let i = 0; i < htmlTags.length; i++) {
                        const tmp = htmlTags[i];
                        const tag = html.getElementsByTagName("a")[i];
                        const link = tag?.href;
                        const linkType = getLinkType(link as string);
                        if (tmp && linkType) {
                            tmp.target = "_blank";
                            tmp.rel = "noopener";
                            if (linkType == "mail" || linkType == "url") {
                                setMdCon(html.body.innerHTML as string);
                            }
                            if (linkType == "markdown") {
                                const markdownLink = html
                                    .getElementsByTagName("a")
                                    [i]?.href.split("/")
                                    .pop();
                                if (markdownLink) {
                                    searchSrvc.getChapter(markdownLink).then((result) => {
                                        const res = result.response as HowToResponse;
                                        const id =
                                            res && res.docs && res.docs[0] ? res.docs[0].id : "";
                                        tmp.href = "/result/" + id;
                                        setMdCon(html.body.innerHTML as string);
                                    });
                                }
                            }
                            if (linkType == "cordra") {
                                const id = tmp.href.split("/").pop();
                                tmp.href = "/result/" + id;
                                setMdCon(html.body.innerHTML as string);
                            }
                        }
                    }
                }
                setMdCon(html.body.innerHTML as string);
            });
    }, [markdown]);

    function backToStart() {
        navigate({ pathname: "/" });
    }

    return (
        <Box className="search-view">
            <Box position="relative">
                <Box className="header-image" />
            </Box>

            <Box
                position="absolute"
                width="100%"
                marginTop={{ base: "-40px", custombreak: "-50px" }}
            >
                <Container maxW={{ base: "100%", custombreak: "80%" }}>
                    <SearchBar></SearchBar>
                </Container>
            </Box>

            <Box height={{ base: "50px", custombreak: "80px" }}></Box>

            <Container maxW={{ base: "100%", custombreak: "80%" }}>
                <Flex alignItems="center" display="flex" gap="12px" height="32px">
                    <Box onClick={backToStart} _hover={{ cursor: "pointer" }}>
                        <BackIcon />
                    </Box>

                    <Box
                        className="resTypeHeaderBackBtn"
                        onClick={backToStart}
                        _hover={{ cursor: "pointer" }}
                    >
                        <span className="to">Back&nbsp;</span>
                        to starting page
                    </Box>
                </Flex>
                {markdownContent ? (
                    <Box w="90%" padding="3%">
                        {parse(markdownContent, {
                            replace: (domNode: any) => {
                                if (domNode.type === "tag" && domNode.name === "img") {
                                    const srcUrl =
                                        "https://git.rwth-aachen.de/nfdi4earth/livinghandbook/livinghandbook/-/raw/main/docs/" +
                                        domNode.attribs.src; // Replace with the correct URL
                                    return (
                                        <Box _hover={{ cursor: "pointer" }}>
                                            <img src={srcUrl}>{domNode.children[0]?.data}</img>
                                        </Box>
                                    );
                                }
                            }
                        })}
                    </Box>
                ) : (
                    <div className="notFound">No content found</div>
                )}
            </Container>
        </Box>
    );
};
