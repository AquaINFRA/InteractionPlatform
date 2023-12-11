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
import rehypeCitation from "rehype-citation";
import parse from "html-react-parser";
import {
    rehypeCitationOptions,
    parseMarkdown,
    getTags,
    getLinkType
} from "../../../services/MarkdownUtils";
import { HowToResponse } from "../../Start/HowTo/HowToEntryContent";

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
            .use(rehypeCitation, rehypeCitationOptions)
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
                      .use(rehypeCitation, rehypeCitationOptions)
                      .use(rehypeStringify)
                      .process(markdownWithoutYaml)
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
                                          setFaq(html.body.innerHTML as string);
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
                                                      res && res.docs && res.docs[0]
                                                          ? res.docs[0].id
                                                          : "";
                                                  tmp.href = "/result/" + id;
                                                  setFaq(html.body.innerHTML as string);
                                              });
                                          }
                                      }
                                      if (linkType == "cordra") {
                                          const id = tmp.href.split("/").pop();
                                          tmp.href = "/result/" + id;
                                          setFaq(html.body.innerHTML as string);
                                      }
                                  }
                              }
                          }
                          setFaq(html.body.innerHTML as string);
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
                        <div>{parse(faq)}</div>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}
