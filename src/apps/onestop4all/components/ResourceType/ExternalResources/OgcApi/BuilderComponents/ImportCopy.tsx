import { Box } from "@chakra-ui/react";
import { ImportToGalaxyBtn } from "../BuilderButtons/ImportToGalaxyBtn";
import { CopyToClipboardButton } from "../BuilderButtons/CopyToClipboardBtn";

export const ImportCopy = (props: {url: string, text: string}) => {
    const {url, text} = props;
    return (
        <Box display="flex" gap={3}>
            {
                url && (
                    <>
                        <ImportToGalaxyBtn
                            url={url} 
                            disabled={!url} 
                        />
                        <CopyToClipboardButton
                            data={url}
                            label={text}
                        />
                    </>
                )
            }
        </Box>
    );
};
