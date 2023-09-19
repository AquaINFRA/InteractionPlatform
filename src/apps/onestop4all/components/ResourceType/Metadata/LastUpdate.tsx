import { Box } from "@open-pioneer/chakra-integration";

export const LastUpdate = (props: { date: string }) => {
    const date = new Date(props.date).toLocaleDateString();

    return (
        <Box>
            <span className="lastUpdateKey"> Last update: </span>
            <span className="lastUpdateValue">{date}</span>
        </Box>
    );
};
