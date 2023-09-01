import { Box, Flex } from "@open-pioneer/chakra-integration";
import { PersonalInfo } from "./PersonalInfo";

export interface Author {
    name: string;
    orcidId: string;
    affiliation: string;
    email: string;
    numAuthors?: number;
    rank?: number;
}

const AuthorEntry = (props: Author) => {
    const { name, orcidId, rank, numAuthors, email, affiliation } = props;
    return (
        <Flex className="metadataValue">
            <PersonalInfo name={name} orcid={orcidId} email={email} affiliation={affiliation} />
            {rank != undefined && numAuthors != undefined
                ? rank < numAuthors - 1
                    ? ";"
                    : ""
                : null}
            &nbsp;
        </Flex>
    );
};

export const Authors = (props: { authors: Author }) => {
    const authors = props.authors;

    return (
        <Box>
            <div className="seperator"></div>
            <Flex>
                <span className="metadataTag">
                    {Array.isArray(authors) ? "Authors:" : "Author:"}&nbsp;
                </span>
                {Array.isArray(authors) ? (
                    authors.map((elem: Author, j: number) => (
                        <>
                            <AuthorEntry
                                key={j}
                                name={elem.name}
                                orcidId={elem.orcidId}
                                affiliation={elem.affiliation}
                                email={elem.email}
                                numAuthors={authors.length}
                                rank={j}
                            />
                        </>
                    ))
                ) : (
                    <>
                        <AuthorEntry
                            name={authors.name}
                            orcidId={authors.orcidId}
                            affiliation={authors.affiliation}
                            email={authors.email}
                        />
                    </>
                )}
            </Flex>
        </Box>
    );
};
