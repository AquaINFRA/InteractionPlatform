/* eslint-disable */
import { Box, Flex } from "@open-pioneer/chakra-integration";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useService } from "open-pioneer:react-hooks";

import remarkGfm from "remark-gfm";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeCitation from "rehype-citation";
import rehypeStringify from "rehype-stringify";
import parse from "html-react-parser";

import { LastUpdate } from "../../components/ResourceType/Metadata/LastUpdate";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Support } from "../../components/ResourceType/Support/Support";
import { TOC } from "../../components/ResourceType/TOC/TOC";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { MetadataSourceIcon } from "../../components/Icons";
import { SolrSearchResultItem, proxy } from "../../services/SearchService";
import { HowToResponse } from "../Start/HowTo/HowToEntryContent";

export interface LHB_ArticleMetadataResponse extends SolrSearchResultItem {
    name: string;
    description: string;
    author: string;
    articleBody: string;
    keyword: string;
    language: string;
    relatedContent: Array<object>;
    sourceSystem_id: string;
    targetGroup: string;
    isPartOf: string;
    hasPart: string;
    additionalType: string;
    about: string;
    audience: string;
}

export interface ArticleViewProps {
    item: LHB_ArticleMetadataResponse;
}

export function LHB_ArticleView(props: ArticleViewProps) {
    const searchSrvc = useService("onestop4all.SearchService");
    const metadata = props.item;
    const markdown = metadata.articleBody[0];
    const [markdownHtml, setMdCon] = useState("");

    const elementRef = useRef<HTMLInputElement>(null);

    //const bibliography = "https://raw.githubusercontent.com/MarkusKonk/test/main/ref.bib";
    const bibliography =
        proxy +
        "https://git.rwth-aachen.de/nfdi4earth/livinghandbook/livinghandbook/-/raw/main/assets/references.bib";
    const citationFileFormat =
        "https://raw.githubusercontent.com/timlrx/rehype-citation/main/test/CITATION.cff";
    const rehypeCitationOptions = { bibliography, citationFileFormat };

    //NOTE: setIdsInHtml enriches the html parsed from markdown with IDs. Thought this is necessary for the TOC but it's not needed for now but might be useful in the future.
    /*const setIdsInHtml = (html: Document, tag: string) => {
        const htmlTags = html.getElementsByTagName(tag);
        if (html && htmlTags.length > 0) {
            for (let i = 0; i < htmlTags.length; i++) {
                const idString = html
                    .getElementsByTagName(tag)
                    [i]?.innerHTML.toLocaleLowerCase()
                    .replaceAll(" ", "_");
                if (htmlTags && Array.isArray(htmlTags) && htmlTags[i] && htmlTags[i].id) {
                    htmlTags[i].id = idString + "_" + i;
                }
            }
            return html;
        } else {
            return html;
        }
    };*/

    useEffect(() => {
        unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype, {})
            .use(rehypeCitation, rehypeCitationOptions)
            .use(rehypeStringify)
            .process(markdown)
            .then((file) => {
                const parser = new DOMParser();
                console.log(file.value);
                const html = parser.parseFromString(file.value as string, "text/html");
                const htmlTags = html.getElementsByTagName("a");
                if (html && htmlTags && htmlTags.length > 0) {
                    for (let i = 0; i < htmlTags.length; i++) {
                        const tmp = htmlTags[i];
                        const link = html.getElementsByTagName("a")[i]?.href;
                        const linkType =
                            link?.includes("mailto") &&
                            !link?.includes(".md") &&
                            !link?.includes("http")
                                ? "mail"
                                : link?.includes("http") &&
                                  !link?.includes(".md") &&
                                  !link?.includes("mailto") &&
                                  !link?.includes("cordra.knowledgehub.nfdi4earth.de")
                                ? "url"
                                : link?.includes(".md") && !link?.includes("mailto")
                                ? "markdown"
                                : link?.includes("cordra.knowledgehub.nfdi4earth.de")
                                ? "cordra"
                                : undefined;
                        console.log(link, linkType);
                        if (tmp && linkType) {
                            if (linkType == "mail") {
                                setMdCon(html.body.innerHTML as string);
                            }
                            if (linkType == "url") {
                                tmp.target = "_blank";
                                tmp.rel = "noopener";
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
                                        tmp.target = "_blank";
                                        tmp.rel = "noopener";
                                        setMdCon(html.body.innerHTML as string);
                                    });
                                }
                            }
                            if (linkType == "cordra") {
                                const id = tmp.href.split("/").pop();
                                tmp.href = "/result/" + id;
                                tmp.target = "_blank";
                                tmp.rel = "noopener";
                                setMdCon(html.body.innerHTML as string);
                            }
                        }
                    }
                }
                setMdCon(html.body.innerHTML as string);
            });
    }, [markdown]);

    return (
        <Box>
            <Flex gap="10%">
                <Box w="65%">
                    {metadata.name ? (
                        <Box className="title" pt="15px">
                            {metadata.name}
                        </Box>
                    ) : null}
                    <Box pt="36px">
                        <Metadata
                            metadataElements={[
                                {
                                    element: "author",
                                    tag: metadata.author?.length > 1 ? "Authors" : "Author",
                                    val: metadata.author
                                },
                                {
                                    element: "description",
                                    tag: "Description",
                                    val: metadata.description
                                },
                                {
                                    element: "keyword",
                                    tag: metadata.keyword?.length > 1 ? "Keywords" : "Keyword",
                                    val: metadata.keyword
                                },
                                {
                                    element: "language",
                                    tag: metadata.language?.length > 1 ? "Languages" : "Language",
                                    val: metadata.language
                                },
                                {
                                    element: "type",
                                    tag: "Type",
                                    val: metadata.type
                                },
                                {
                                    element: "about",
                                    tag: "About",
                                    val: metadata.about
                                },
                                {
                                    element: "targetGroup",
                                    tag:
                                        metadata.targetGroup?.length > 1
                                            ? "Target groups"
                                            : "Target group",
                                    val: metadata.targetGroup
                                },
                                {
                                    element: "audience",
                                    tag: metadata.audience?.length > 1 ? "Audiences" : "Audience",
                                    val: metadata.audience
                                },
                                {
                                    element: "partOf",
                                    tag: "Is part of",
                                    val: metadata.isPartOf
                                },
                                {
                                    element: "hasPart",
                                    tag: metadata.hasPart?.length > 1 ? "Has parts" : "Has part",
                                    val: metadata.hasPart
                                },
                                {
                                    element: "additionalType",
                                    tag:
                                        metadata.additionalType?.length > 1
                                            ? "Additional types"
                                            : "Additional type",
                                    val: metadata.additionalType
                                }
                            ]}
                            visibleElements={2}
                            expandedByDefault={false}
                        />
                    </Box>
                    <Box pt="80px" ref={elementRef}>
                        {markdownHtml != "" ? <div>{parse(markdownHtml)}</div> : null}
                    </Box>
                    <Box pt="80px">
                        <Support />
                    </Box>
                </Box>
                <Box w="25%">
                    {metadata.sourceSystem_id ? (
                        <Box className="actionButtonGroup" pt="74px">
                            {metadata.sourceSystem_id ? (
                                <Link
                                    to={
                                        ("https://git.rwth-aachen.de/nfdi4earth/livinghandbook/livinghandbook/-/blob/main/" +
                                            metadata.sourceSystem_id) as string
                                    }
                                    className="actionButtonLink"
                                    target="_blank"
                                >
                                    <ActionButton
                                        label="Visit metadata source"
                                        icon={<MetadataSourceIcon color="white" />}
                                        variant="outline"
                                        fun={() => void 0}
                                    />
                                </Link>
                            ) : null}
                        </Box>
                    ) : null}
                    {metadata.dateModified ? (
                        <Box pt="33">
                            <LastUpdate date={metadata.dateModified} />
                        </Box>
                    ) : null}
                    {markdown && elementRef.current && elementRef.current.children ? (
                        <TOC elementRef={elementRef} sourceId={metadata.sourceSystem_id} />
                    ) : null}
                </Box>
            </Flex>
        </Box>
    );
}
