import { Box, Container } from "@open-pioneer/chakra-integration";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import remarkGfm from "remark-gfm";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import parse from "html-react-parser";

import { SearchBar } from "../../../components/SearchBar";

export const HowToEntryContent = () => {
    const markdownContentRaw = useParams().content;
    const [markdownContent, setMdCon] = useState("");

    useEffect(() => {
        unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype, {})
            .use(rehypeStringify)
            .process(markdownContentRaw)
            .then((file) => {
                const parser = new DOMParser();
                const html = parser.parseFromString(file.value as string, "text/html");
                setMdCon(html.body.innerHTML as string);
                console.log(html.body.innerHTML);
            });
    }, [markdownContentRaw]);

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
                <Box w="90%" padding="3%">
                    <div>
                        {parse(markdownContent, {
                            replace: (domNode: any) => {
                                if (domNode.type === "tag" && domNode.name === "img") {
                                    const srcUrl =
                                        "https://git.rwth-aachen.de/nfdi4earth/livinghandbook/livinghandbook/-/raw/main/docs/" +
                                        domNode.attribs.src; // Replace with the correct URL
                                    return (
                                        <Box _hover={{ cursor: "pointer" }}>
                                            <img
                                                src={srcUrl}
                                                //className="faqListItems"
                                            >
                                                {domNode.children[0]?.data}
                                            </img>
                                        </Box>
                                    );
                                }
                            }
                        })}
                    </div>
                </Box>
            </Container>
        </Box>
    );
};
