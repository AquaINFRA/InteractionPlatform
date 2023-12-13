import { Box } from "@open-pioneer/chakra-integration";

export interface Identifiers {
    isni: string;
    crossref: string;
    wikidata: string;
}

export const Identifier = (props: { identifiers: object }) => {
    const identifiers = Object.values(props.identifiers);

    return (
        <Box>
            <div className="api_identifierHeader">Other Identifiers</div>
            {identifiers.map((identifier, i) => (
                <Box key={i} pt="10px">
                    {identifier.isni ? (
                        <div className="identifier">
                            <span className="api_identifierKey">ISNI: </span>
                            <span className="api_identifierVal">
                                <a
                                    href={"https://isni.org/isni/" + identifier.isni}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    {identifier.isni}
                                </a>
                            </span>
                        </div>
                    ) : null}
                    {identifier.crossref ? (
                        <div className="identifier">
                            <span className="api_identifierKey">Crossref Funder ID: </span>
                            <span className="api_identifierVal">
                                <a
                                    href={"https://api.crossref.org/funders/" + identifier.crossref}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    {identifier.crossref}
                                </a>
                            </span>
                        </div>
                    ) : null}
                    {identifier.wikidata ? (
                        <div className="identifier">
                            <span className="api_identifierKey">Wikidata: </span>
                            <span className="api_identifierVal">
                                <a
                                    href={"https://www.wikidata.org/wiki/" + identifier.wikidata}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    {identifier.wikidata}
                                </a>
                            </span>
                        </div>
                    ) : null}
                </Box>
            ))}
        </Box>
    );
};
