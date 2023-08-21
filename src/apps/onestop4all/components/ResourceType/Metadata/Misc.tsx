import { Box } from "@open-pioneer/chakra-integration";

export const Misc = (props: { tag: string; val: Array<string> }) => {
    const { tag, val } = props;

    //To do: Create reusable function, used at several locations
    function isUrl(url: string) {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(url);
    }

    function isEmail(address: string) {
        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return emailRegex.test(address);
    }

    const MetadataUrl = (props: { item: string; type: string }) => {
        const { item, type } = props;
        return (
            <a
                href={type == "mail" ? "mailto: " : "" + item}
                className="metadataLink"
                rel="noreferrer"
                target="_blank"
            >
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
                        {isUrl(elem) ? (
                            <span>
                                <MetadataUrl item={elem} type="url" />
                                {i < val.length - 1 ? "; " : ""}
                            </span>
                        ) : isEmail(elem) ? (
                            <span>
                                <MetadataUrl item={elem} type="mail" />
                                {i < val.length - 1 ? "; " : ""}
                            </span>
                        ) : (
                            elem + (i < val.length - 1 ? ";" : "")
                        )}
                        &nbsp;
                    </span>
                ))
            ) : (
                <span className="metadataValue">
                    {!isUrl(val) ? (
                        val
                    ) : isEmail(val) ? (
                        <MetadataUrl item={val} type="mail" />
                    ) : (
                        <MetadataUrl item={val} type="url" />
                    )}
                </span>
            )}
        </Box>
    );
};
