import { Box } from "@open-pioneer/chakra-integration";
import { isUrl, isEmail, MetadataUrl } from "./PersonalInfo";

export const Misc = (props: { tag: string; val: Array<string> }) => {
    const { tag, val } = props;

    return (
        <Box className="metadataSection">
            <div className="seperator"></div>
            {tag ? <span className="metadataTag">{tag}:&nbsp;</span> : null}
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
