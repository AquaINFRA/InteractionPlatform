import { Box } from "@chakra-ui/react";

export const MetaInfo = (props: {title: string; protocol: string; type: string; description: string;}) => {
    const {title, description, protocol, type} = props;

    return (
        <>
            <Box>
                <span className="sideButtonTag">Title: </span>
                <span className="sideButtonValue">
                    {title ?? description ?? "No title available"}
                </span>
            </Box>
            {protocol &&
                <Box>
                    <span className="sideButtonTag">Protocol: </span>
                    <span className="sideButtonValue">
                        {protocol}
                    </span>
                </Box>
            }
            {type &&
                <Box>
                    <span className="sideButtonTag">Type: </span>
                    <span className="sideButtonValue">
                        {type}
                    </span>
                </Box>
            }
        </>
    );
};
