import { Box } from "@open-pioneer/chakra-integration";
import { Keywords } from "./Keywords";
import { Authors } from "./Authors";
import { Misc } from "./Misc";

export const MetadataContent = (props: {
    metadataElements: object;
    start: number;
    end: number;
}) => {
    const { start, end } = props;
    const metadataElements = Object.values(props.metadataElements);

    return (
        <Box>
            {metadataElements
                .slice(start, end)
                .map((e, i) =>
                    e.tag == "Keywords" ? (
                        <Keywords key={i} keywords={e.val} />
                    ) : e.tag == "Authors" ? (
                        <Authors key={i} authors={e.val} />
                    ) : (
                        <Misc key={i} tag={e.tag} val={e.val} />
                    )
                )}
        </Box>
    );
};
