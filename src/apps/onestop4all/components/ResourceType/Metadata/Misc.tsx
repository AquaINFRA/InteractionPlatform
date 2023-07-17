import { Box, Flex } from "@open-pioneer/chakra-integration";

export const Misc = (props: { tag: string; val: string }) => {
    const { tag, val } = props;

    function isUrl(url: string) {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(url);
    }

    return (
        <Box>
            <div className="seperator"></div>
            <div>
                <Flex>
                    <span className="metadataTag">{tag}:&nbsp;</span>
                    <span className="metadataValue">
                        {!isUrl(val) ? (
                            val
                        ) : (
                            <a href={val} className="metadataLink">
                                {val}
                            </a>
                        )}
                    </span>
                </Flex>
            </div>
        </Box>
    );
};
