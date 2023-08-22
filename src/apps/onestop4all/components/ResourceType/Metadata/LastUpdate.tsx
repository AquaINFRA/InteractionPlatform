import { Box } from "@open-pioneer/chakra-integration";

export const LastUpdate = (props: { date: string }) => {
    const date = props.date;

    return (
        <Box>
            <span className="lastUpdateKey">Update: </span>
            <span className="lastUpdateValue">{date}</span>
        </Box>
    );
};
