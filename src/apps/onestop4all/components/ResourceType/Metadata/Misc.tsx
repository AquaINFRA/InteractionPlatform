import { Box } from "@open-pioneer/chakra-integration";

export const Misc = (props: { tag: string; val: Array<string> }) => {
    const { tag, val } = props;

    function isUrl(url: string) {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(url);
    }

    const MetadataUrl = (props: { item: string }) => {
        const item = props.item;
        return (
            <a href={item} className="metadataLink" rel="noreferrer" target="_blank">
                {item}
            </a>
        );
    };

    return (
        <Box className="metadataKeywords">
            <div className="seperator"></div>
            <span className="metadataTag">{tag}:&nbsp;</span>
            {typeof val == "object" ? (
                val.map((elem: string, i: number) => (
                    <span className="metadataValue" key={i}>
                        {!isUrl(elem) ? (
                            elem + (i < val.length - 1 ? ";" : "")
                        ) : (
                            <span>
                                <MetadataUrl item={elem} />
                                {i < val.length - 1 ? "; " : ""}
                            </span>
                        )}
                        &nbsp;
                    </span>
                ))
            ) : (
                <span className="metadataValue">
                    {!isUrl(val) ? val : <MetadataUrl item={val} />}
                </span>
            )}
        </Box>
    );
};
