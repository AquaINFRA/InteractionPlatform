import { Box } from "@open-pioneer/chakra-integration";
import { Keywords } from "./Keywords";
import { Authors } from "./Authors";
import { Source } from "./Source";
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
                    e.val && e.tag && e.element ? (
                        e.element == "keyword" ? (
                            <Keywords key={i} list={e.val} tag={e.tag} element={e.element} />
                        ) : e.element == "author" || e.tag == "Resource providers" ? (
                            <Authors key={i} authors={e.val} tag={e.tag} />
                        ) : e.element == "theme" ? (
                            <Keywords key={i} list={e.val} tag={e.tag} element={e.element} />
                        ) : e.element == "source" ? (
                            <Source key={i} source={e.val} />
                        ) : (
                            <Misc key={i} tag={e.tag} val={e.val} />
                        )
                    ) : null
                )}
        </Box>
    );
};
