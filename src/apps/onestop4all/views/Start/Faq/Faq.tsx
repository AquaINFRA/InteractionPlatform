/* eslint-disable */
import { Box, Flex, Container } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { SearchBar } from "../../../components/SearchBar";

import remarkGfm from "remark-gfm";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import parse from "html-react-parser";

export function Faq() {
    let faqId = useParams().faq;
    faqId = faqId !== "FAQ.md" ? faqId : "FAQ_RDM1.md";
    const [faqList, setFaqList] = useState("");
    const [markdownContent, setMdCon] = useState("");
    const [faq, setFaq] = useState("");

    const navigate = useNavigate();
    const searchSrvc = useService("onestop4all.SearchService");

    const removeYaml = (md: string) => {
        const yamlRegex = /^---\n([\s\S]*?)\n---\n/;
        const mdWithoutYaml = md.replace(yamlRegex, "");
        return mdWithoutYaml;
    };

    useEffect(() => {
        searchSrvc.getFaqList().then((res) => {
            const markdownWithoutYaml = removeYaml(res);
            setFaqList(markdownWithoutYaml);
        });
    }, []);

    useEffect(() => {
        unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype, {})
            .use(rehypeStringify)
            .process(faqList)
            .then((file) => {
                setMdCon(file.value as string);
            });
    }, [faqList]);

    useEffect(() => {
        faqId
            ? searchSrvc.getFaq(faqId).then((res) => {
                  const markdownWithoutYaml = removeYaml(res);
                  unified()
                      .use(remarkParse)
                      .use(remarkGfm)
                      .use(remarkRehype, {})
                      .use(rehypeStringify)
                      .process(markdownWithoutYaml)
                      .then((file) => {
                          setFaq(file.value as string);
                      });
              })
            : null;
    }, [faqId]);

    const handleClick = (event: any, to: any) => {
        event.preventDefault();
        navigate(to);
    };

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
                <Flex>
                    <Box w="50%" padding="3%">
                        <div>
                            {parse(markdownContent, {
                                replace: (domNode: any) => {
                                    if (domNode.type === "tag" && domNode.name === "a") {
                                        const to = "/faq/" + domNode.attribs.href; // Replace with the correct URL
                                        return (
                                            <Box _hover={{ cursor: "pointer" }}>
                                                <a
                                                    onClick={(event) => handleClick(event, to)}
                                                    className="faqListItems"
                                                >
                                                    {domNode.children[0]?.data}
                                                </a>
                                            </Box>
                                        );
                                    }
                                }
                            })}
                        </div>
                    </Box>
                    <Box w="50%" padding="3%">
                        <div>
                            {parse(faq, {
                                replace: (domNode: any) => {
                                    if (
                                        domNode.type === "tag" &&
                                        domNode.name === "a" &&
                                        !domNode.attribs.href?.includes("http") &&
                                        domNode.attribs.href?.includes(".md")
                                    ) {
                                        const to = "/faq/" + domNode.attribs.href; // Replace with the correct URL
                                        return (
                                            <Box _hover={{ cursor: "pointer" }}>
                                                <a
                                                    onClick={(event) => handleClick(event, to)}
                                                    className="faqListItems"
                                                >
                                                    {domNode.children[0]?.data}
                                                </a>
                                            </Box>
                                        );
                                    } else {
                                        if (
                                            domNode.type === "tag" &&
                                            domNode.name === "a" &&
                                            domNode.attribs.href?.includes("http")
                                        ) {
                                            const to = domNode.attribs.href; // Replace with the correct URL
                                            return (
                                                <a
                                                    href={to}
                                                    className="faqListItems"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    {domNode.children[0]?.data}
                                                </a>
                                            );
                                        }
                                    }
                                }
                            })}
                        </div>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}
