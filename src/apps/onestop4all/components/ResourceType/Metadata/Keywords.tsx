import { Box } from "@open-pioneer/chakra-integration";

export const Keywords = (props: { list: Array<string>; tag: string }) => {
    const { list, tag } = props;
    let metadataElement = tag;
    if (tag == "keyword") {
        if (list.length > 1) {
            metadataElement = "Keywords";
        } else {
            metadataElement = "Keyword";
        }
    } else {
        if (list.length > 1) {
            metadataElement = "Themes";
        } else {
            metadataElement = "Theme";
        }
    }

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
        <Box className="metadataSection">
            <div className="seperator"></div>
            <span className="metadataTag">
                {metadataElement}
                :&nbsp;
            </span>
            {list.map((elem: string, j: number) => (
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
