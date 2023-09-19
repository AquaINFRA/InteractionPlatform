import { Box, Flex } from "@open-pioneer/chakra-integration";

export const Source = (props: { source: Array<string> }) => {
    const sourceTitle = props.source[0];
    const sourceHomepage = props.source[1];

    return (
        <Box className="metadataKeywords">
            <div className="seperator"></div>
            <Flex>
                <span className="metadataTag">Source:&nbsp;</span>
                <Flex className="metadataValue">
                    <a
                        href={sourceHomepage}
                        className="metadataLink"
                        rel="noreferrer"
                        target="_blank"
                    >
                        {sourceTitle}
                    </a>
                </Flex>
            </Flex>
        </Box>
    );
};
