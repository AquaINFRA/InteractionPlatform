import { Box } from "@open-pioneer/chakra-integration";
import parse from "html-react-parser";
import { LinkItUrl } from "react-linkify-it";

export const Abstract = ({ abstractText }: { abstractText: string }) => {
    return (
        <Box>
            <div className="abstractSectionHeader">Abstract</div>
            <Box className="abstractText">
                {parse(abstractText, {
                    replace: (domNode: any) => {
                        if (domNode.type === "text") {
                            return <LinkItUrl>{domNode.data}</LinkItUrl>;
                        }
                    }
                })}
            </Box>
        </Box>
    );
};
