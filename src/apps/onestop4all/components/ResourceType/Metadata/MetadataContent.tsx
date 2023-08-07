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
                        <Keywords key={i} keywords={e.val} tag="keyword" />
                    ) : e.tag == "Authors" || e.tag == "Resource providers" ? (
                        <Authors key={i} authors={e.val} />
                    ) : e.tag == "Theme" ? (
                        <Keywords key={i} keywords={e.val} tag="theme" />
                    ) : (
                        <Misc key={i} tag={e.tag} val={e.val} />
                    )
                )}
        </Box>
    );
};
