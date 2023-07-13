import { Flex, Box } from "@open-pioneer/chakra-integration";

export const MetadataContent = (props: {
    metadataElements: object;
    start: number;
    end: number;
}) => {
    const { start, end } = props;
    const metadataElements = Object.values(props.metadataElements);

    function isUrl(url: string) {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(url);
    }

    return (
        <Box>
            {metadataElements.slice(start, end).map((e, i) =>
                e.tag != "Keywords" ? (
                    <Box key={i}>
                        <div className="seperator"></div>
                        <div>
                            {!isUrl(e.val) ? (
                                <Flex>
                                    <span className="metadataTag">{e.tag}:&nbsp;</span>
                                    <span className="metadataValue">{e.val}</span>
                                </Flex>
                            ) : (
                                <Flex>
                                    <span className="metadataTag">{e.tag}:&nbsp;</span>{" "}
                                    <span className="metadataValue">
                                        <a href={e.val} className="metadataLink">
                                            {e.val}
                                        </a>
                                    </span>
                                </Flex>
                            )}
                        </div>
                    </Box>
                ) : (
                    <Box key={i} className="metadataKeywords">
                        <div className="seperator"></div>
                        <span className="metadataTag">{e.tag}:&nbsp;</span>
                        {e.val.map((elem: string, j: number) => (
                            <a href={"/search?keyword=" + elem} className="metadataKeyword" key={j}>
                                {elem}
                            </a>
                        ))}
                    </Box>
                )
            )}
        </Box>
    );
};
