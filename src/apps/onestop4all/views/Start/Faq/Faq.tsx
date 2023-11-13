import { Box, Button } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeCitation from "rehype-citation";
import rehypeStringify from "rehype-stringify";
import parse from "html-react-parser";

export function Faq() {
    const resultId = useParams().faq;
    console.log(resultId);
    const navigate = useNavigate();
    const searchSrvc = useService("onestop4all.SearchService");
    const [faqList, setFaqList] = useState("");
    const [markdownContent, setMdCon] = useState("");

    const modifyHtml = (html: Document, tag: string) => {
        const htmlTags = html.getElementsByTagName(tag);
        if (html && htmlTags.length > 0) {
            for (let i = 0; i < htmlTags.length; i++) {
                const naviagteTo = htmlTags[i]?.pathname;
                htmlTags[i]?.removeAttribute("href");
                htmlTags[i].onclick = () => {console.log("test");};
                //console.log(htmlTags[i]);
            }
            console.log(html);
            return html;
        } else {
            return html;
        }
    };

    useEffect(() => {
        searchSrvc.getFaq().then((result) => {
            result.text().then((res) => {
                const yamlRegex = /^---\n([\s\S]*?)\n---\n/;
                const mdWithoutYaml = res.replace(yamlRegex, ""); 
                setFaqList(mdWithoutYaml); 
            });
        });
    }, []);

    useEffect(() => {
        unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype, {})
            //.use(rehypeCitation, rehypeCitationOptions)
            .use(rehypeStringify)
            .process(faqList)
            .then((file) => {
                const parser = new DOMParser();
                let html = parser.parseFromString(file.value as string, "text/html");
                html = modifyHtml(html, "a"); // see comment above 
                //html = setIdsInHtml(html, "h3"); // see comment above
                console.log(html);
                setMdCon(html.body.innerHTML as string);
            });
    }, [faqList]);


    return (
        <Box>
            {parse(markdownContent)}
            <Button onClick={()=>{navigate("/faq/FAQ_RMD2.md");}}>
                test
            </Button>
        </Box>
    );
}
