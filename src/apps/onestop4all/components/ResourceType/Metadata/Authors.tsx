import { Box, Flex, Image } from "@open-pioneer/chakra-integration";

export const Authors = (props: { authors: Array<object> }) => {
    const authors = props.authors;

    return (
        <Box>
            <div className="seperator"></div>
            <Flex>
                <span className="metadataTag">
                    {authors.length == 1 ? "Author:" : "Authors:"}&nbsp;
                </span>
                {authors.map((elem: any, j: number) => (
                    <Flex className="metadataValue" key={j}>
                        {elem.orcid ? (
                            <>
                                <a
                                    href={"https://orcid.org/" + elem.orcid}
                                    rel="noreferrer"
                                    target="_blank"
                                >
                                    <Image className="orcid" alt="Bg icon" src="/orcid.png" />
                                </a>
                                &nbsp;
                            </>
                        ) : null}
                        {elem.name}
                        {j < authors.length - 1 ? ";" : ""}&nbsp;
                    </Flex>
                ))}
            </Flex>
        </Box>
    );
};
