import { Box } from "@open-pioneer/chakra-integration";

export const Keywords = (props: { list: Array<string>; tag: string; element: string }) => {
    const { list, tag, element } = props;

    const createQuery = (element: string, elem: string) => {
        if (element == "keyword") {
            return "/search?searchterm=" + elem;
        } else {
            if (element == "theme") {
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
                {tag}
                :&nbsp;
            </span>
            {list.map((item: string, j: number) => (
                <a
                    href={createQuery(element, item)}
                    className={element == "keyword" ? "metadataKeyword" : "metadataTheme"}
                    key={j}
                >
                    {item}
                </a>
            ))}
        </Box>
    );
};
