import { Box } from "@open-pioneer/chakra-integration";

interface Item {
    value?: string;
    type?: string;
}

export const RelatedKeywords = (props: {
    list: Array<Item>;
    tag: string;
    element: string;
    type?: string;
}) => {
    const { list, tag, element, type } = props;

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

    function getClassName(item: Item) {
        console.log(item);
        if (item.type != null) {
            console.log("TYPE: " + item.type);
            switch (item.type) {
                case "originalMatch":
                    return "metadataKeyword";
                case "narrower":
                    return "metadataKeywordNarrower";
                case "broader":
                    return "metadataKeywordBroader";
                case "related":
                    return "metadataKeywordRelated";
            }
        } else return element == "keyword" ? "metadataKeyword" : "metadataTheme";
    }
    // shorten the list
    const shortList: Array<Item> = [];
    let originalIndex = 0;
    let narrowerIndex = 0;
    let broaderIndex = 0;
    let relatedIndex = 0;
    list.map((item: Item) => {
        if (item.type == "originalMatch") {
            originalIndex++;
            if (originalIndex < 6) shortList.push(item);
        }
        if (item.type == "narrower") {
            narrowerIndex++;
            if (narrowerIndex < 6) shortList.push(item);
        }
        if (item.type == "broader") {
            broaderIndex++;
            if (broaderIndex < 6) shortList.push(item);
        }
        if (item.type == "related") {
            relatedIndex++;
            if (relatedIndex < 6) shortList.push(item);
        }
    });

    return (
        <Box className="metadataSection">
            <div className="seperator"></div>
            <span className="metadataTag">
                {tag}
                :&nbsp;
            </span>
            {shortList.map((item: Item, j: number) => (
                <a href={createQuery(element, item.value!)} className={getClassName(item)} key={j}>
                    {item.value}
                </a>
            ))}
        </Box>
    );
};
