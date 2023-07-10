import { Box } from "@open-pioneer/chakra-integration";

export const Abstract = (props: { abstractText: string }) => {
    const { abstractText } = props;
    return (
        <Box>
            <p className="resTypeHeader">Abstract</p>
            <p className="abstractText">{abstractText}</p>
        </Box>
    );
};
