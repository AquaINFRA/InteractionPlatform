import { Box } from "@open-pioneer/chakra-integration";

export const Api = (props: { api: Array<object> }) => {
    const apis = props.api;

    const apisTemp = [
        { type: "REST", url: "https://www.wdc-climate.de/docs/GUI_Doku.pdf" },
        { type: "OAI-PMH", url: "http://c3grid1.dkrz.de:8080/oai/oaisearch.do" }
    ];
    return (
        <Box>
            <p className="api_identifierHeader">API (dummy data)</p>
            {apisTemp.map((api, i) => (
                <Box key={i} pt="10px">
                    <p>
                        <span className="api_identifierKey">Type: </span>
                        <span className="api_identifierVal">{api.type}</span>
                    </p>
                    <p>
                        <span className="api_identifierKey">URL: </span>
                        <a href={api.url}>
                            <span className="api_identifierVal">{api.url}</span>
                        </a>
                    </p>
                </Box>
            ))}
        </Box>
    );
};
