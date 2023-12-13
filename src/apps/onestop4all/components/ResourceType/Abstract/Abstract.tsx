import { Box } from "@open-pioneer/chakra-integration";

export const Abstract = (props: { abstractText: string }) => {
    const { abstractText } = props;
    return (
        <Box>
            <div className="abstractSectionHeader">Abstract</div>
            <div className="abstractText">{abstractText}</div>
        </Box>
    );
};
