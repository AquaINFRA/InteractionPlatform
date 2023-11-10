/* eslint-disable */
import { Box, Flex } from "@open-pioneer/chakra-integration";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { LastUpdate } from "../../components/ResourceType/Metadata/LastUpdate";
import { Metadata } from "../../components/ResourceType/Metadata/Metadata";
import { Support } from "../../components/ResourceType/Support/Support";
import { TOC } from "../../components/ResourceType/TOC/TOC";
import { SolrSearchResultItem } from "../../services/SearchService";
import { ActionButton } from "../../components/ResourceType/ActionButton/ActionButton";
import { MetadataSourceIcon } from "../../components/Icons";
import remarkGfm from "remark-gfm";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeCitation from "rehype-citation";
import rehypeStringify from "rehype-stringify";
import parse from "html-react-parser";

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
    const metadata = props.item;
    //const markdownContent = metadata.articleBody[0];
    const [markdownContent, setMdCon] = useState("");
    const elementRef = useRef();
    const bibliography = "https://raw.githubusercontent.com/MarkusKonk/test/main/ref.bib";
    const cff = "https://raw.githubusercontent.com/timlrx/rehype-citation/main/test/CITATION.cff";
    const rehypeCitationOptions = { bibliography, cff };

    const setIdsInHtml = (html: Document, tag: string) => {
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
    };

    useEffect(() => {
        unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype, {})
            .use(rehypeCitation, rehypeCitationOptions)
            .use(rehypeStringify)
            .process(metadata.articleBody[0])
            .then((file) => {
                const parser = new DOMParser();
                let html = parser.parseFromString(file.value as string, "text/html");
                html = setIdsInHtml(html, "h2");
                html = setIdsInHtml(html, "h3");
                setMdCon(html.body.innerHTML as string);
            });
    }, [markdownContent, rehypeCitationOptions]);

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
                        {markdownContent != "" ? <div>{parse(markdownContent)}</div> : null}
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
                    {metadata.articleBody[0] &&
                    elementRef.current &&
                    elementRef.current.children ? (
                        <TOC elementRef={elementRef} />
                    ) : null}
                </Box>
            </Flex>
        </Box>
    );
}
