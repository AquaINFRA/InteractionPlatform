import { Box } from "@chakra-ui/react";
import { RegenerateButton } from "../BuilderButtons/RegenerateBtn";
import { ResetButton } from "../BuilderButtons/ResetBtn";

export const GenerateUrl = (props: {fun: () => void; url?: string;}) => {
    const {fun, url} = props;
    return (
        <>
            <strong>Generated URL: </strong>
            <RegenerateButton />
            <ResetButton fun={()=>{fun();}} />
            <Box wordBreak="break-all" pt={2}>{url}</Box>
        </>
    );
};
