import { Box } from "@open-pioneer/chakra-integration";
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
        <>
            <PersonalInfo name={name} orcid={orcidId} email={email} affiliation={affiliation} />
            {rank != undefined && numAuthors != undefined
                ? rank < numAuthors - 1
                    ? ";"
                    : ""
                : null}
            &nbsp;
        </>
    );
};

export const Authors = (props: { authors: Author; tag: string }) => {
    const authors = props.authors;
    const tag = props.tag;

    return (
        <Box className="metadataSection">
            <div className="seperator"></div>
            <span className="metadataTag">{tag}:&nbsp;</span>
            {Array.isArray(authors) ? (
                authors.map((elem: Author, j: number) => (
                    <div className="metadataValue" key={j}>
                        <AuthorEntry
                            key={j}
                            name={elem.name}
                            orcidId={elem.orcidId}
                            affiliation={elem.affiliation}
                            email={elem.email}
                            numAuthors={authors.length}
                            rank={j}
                        />
                    </div>
                ))
            ) : (
                <div className="metadataValue">
                    <AuthorEntry
                        name={authors.name}
                        orcidId={authors.orcidId}
                        affiliation={authors.affiliation}
                        email={authors.email}
                    />
                </div>
            )}
        </Box>
    );
};
