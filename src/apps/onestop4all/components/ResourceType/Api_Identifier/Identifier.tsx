import { Box } from "@open-pioneer/chakra-integration";

export const Identifier = (props: { identifier: Array<object> }) => {
    const identifier = props.identifier;

    const identifierTemp = [
        { key: "ISNI", val: "0000000403741955" },
        { key: "Crossref Funder ID", val: "100018730" },
        { key: "Wikidata", val: "Q1205784" }
    ];
    return (
        <Box>
            <p className="api_identifierHeader">Other Identifier (dummy data)</p>
            {identifierTemp.map((identifier, i) => (
                <Box key={i} pt="10px">
                    <p>
                        <span className="api_identifierKey">{identifier.key}: </span>
                        <span className="api_identifierVal">{identifier.val}</span>
                    </p>
                </Box>
            ))}
        </Box>
    );
};
