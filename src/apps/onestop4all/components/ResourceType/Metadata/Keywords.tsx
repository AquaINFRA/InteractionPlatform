import { Box } from "@open-pioneer/chakra-integration";

export const Keywords = (props: { keywords: Array<string>; tag: string }) => {
    const { keywords, tag } = props;

    const createQuery = (tag: string, elem: string) => {
        if (tag == "keyword") {
            return "/search?searchterm=" + elem;
        } else {
            if (tag == "theme") {
                return "/search?subjects=" + elem;
            } else {
                return "/";
            }
        }
    };

    return (
        <Box className="metadataKeywords">
            <div className="seperator"></div>
            <span className="metadataTag">
                {tag == "keyword" ? "Keywords" : tag == "theme" ? "Themes" : ""}:&nbsp;
            </span>
            {keywords.map((elem: string, j: number) => (
                <a
                    href={createQuery(tag, elem)}
                    className={tag == "keyword" ? "metadataKeyword" : "metadataTheme"}
                    key={j}
                >
                    {elem}
                </a>
            ))}
        </Box>
    );
};
