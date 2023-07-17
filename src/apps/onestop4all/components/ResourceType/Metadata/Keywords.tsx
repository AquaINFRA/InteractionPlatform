import { Box } from "@open-pioneer/chakra-integration";

export const Keywords = (props: { keywords: Array<string> }) => {
    const keywords = props.keywords;

    return (
        <Box className="metadataKeywords">
            <div className="seperator"></div>
            <span className="metadataTag">Keywords:&nbsp;</span>
            {keywords.map((elem: string, j: number) => (
                <a href={"/search?keyword=" + elem} className="metadataKeyword" key={j}>
                    {elem}
                </a>
            ))}
        </Box>
    );
};
