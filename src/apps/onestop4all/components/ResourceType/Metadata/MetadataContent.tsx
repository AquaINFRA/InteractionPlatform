import { Flex, Box } from "@open-pioneer/chakra-integration";
import { Keywords } from "./Keywords";
import { Authors } from "./Authors";

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
                e.tag == "Keywords" ? (
                    <Keywords key={i} keywords={e.val} />
                ) : e.tag == "Authors" ? (
                    <Authors key={i} authors={e.val} />
                ) : (
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
                )
            )}
        </Box>
    );
};
