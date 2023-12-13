/* eslint-disable */
import { proxy } from "./SearchService";

//const bibliography = "https://raw.githubusercontent.com/MarkusKonk/test/main/ref.bib";
const bibliography =
    proxy +
    "https://git.rwth-aachen.de/nfdi4earth/livinghandbook/livinghandbook/-/raw/main/assets/references.bib";
const citationFileFormat =
    "https://raw.githubusercontent.com/timlrx/rehype-citation/main/test/CITATION.cff";
export const rehypeCitationOptions = { bibliography, citationFileFormat };

export interface HtmlTag {
    href?: string;
    target: string;
    rel: string;
}

export function parseMarkdown(markdown: string) {
    const parser = new DOMParser();
    const html = parser.parseFromString(markdown, "text/html");
    return html;
}

export function getTags(html: Document) {
    const htmlTags = html.getElementsByTagName("a");
    return htmlTags;
}

export function getLinkType(link: string) {
    return link?.includes("mailto") && !link?.includes(".md") && !link?.includes("http")
        ? "mail"
        : link?.includes("http") &&
          !link?.includes(".md") &&
          !link?.includes("mailto") &&
          !link?.includes("cordra.knowledgehub.nfdi4earth.de") &&
          !link?.includes("pdf/") &&
          !link?.includes(".docx")
        ? "url"
        : link?.includes(".md") && !link?.includes("mailto")
        ? "markdown"
        : link?.includes("cordra.knowledgehub.nfdi4earth.de")
        ? "cordra"
        : link?.includes("pdf/") && link?.includes(".docx")
        ? "pdf_docx"
        : link?.includes("pdf/") && link?.includes(".pdf")
        ? "pdf_docx"
        : undefined;
}
