import { Box } from "@open-pioneer/chakra-integration";

export const Api = (props: { apis: Array<string>; urls: Array<string> }) => {
    const { apis, urls } = props;

    return (
        <Box>
            <div className="api_identifierHeader">API</div>
            {apis.map((api, i) => (
                <Box key={i} pt="12px">
                    <div>
                        <span className="api_key">Type: </span>
                        <span className="api_val">{api}</span>
                    </div>
                    <div>
                        <span className="api_key">URL: </span>
                        <a href={urls[i]} target="_blank" rel="noreferrer">
                            <span className="api_url">{urls[i]}</span>
                        </a>
                    </div>
                </Box>
            ))}
        </Box>
    );
};
