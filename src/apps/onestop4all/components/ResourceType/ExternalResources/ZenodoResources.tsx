import { Box, Flex } from "@open-pioneer/chakra-integration";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useState } from "react";

import { ActionButton } from "../ActionButton/ActionButton";
import { ImportToGalaxyBtn } from "./ImportToGalaxyBtn";
import { DatasetUrlInput } from "./InsertUrl";

export const ZenodoResources = (props: { metadata: string, repo: string; download: string; }) => {
    const { metadata, repo } = props;

    const [urlToImport, setUrlToImport] = useState("");
    const [disableImportToGalaxy, setDisableImportToGalaxy] = useState(true);

    const handleDatasetUrlChange = (url: string, isValid: boolean) => {
        setUrlToImport(url);
        setDisableImportToGalaxy(!isValid);
    };

    return (
        <Box>
            <div className="abstractSectionHeader">Zenodo resources</div>
            <Box>
                <Box pt={3}>
                    <div className="seperator" />
                    <Flex flexDirection="column"> 
                        <Box pt={3}>
                            <ActionButton
                                label="Visit repository"
                                icon={<ExternalLinkIcon color="white" />}
                                variant="solid"
                                fun={() => window.open(repo as string, "_blank")}
                            />
                        </Box>
                    </Flex>
                </Box>
                <Box pt={3}>
                    <Flex flexDirection="column"> 
                        <Box pt={3}>
                            <ActionButton
                                label="Check metadata"
                                icon={<ExternalLinkIcon color="white" />}
                                variant="solid"
                                fun={() => window.open(metadata as string, "_blank")}
                            />
                        </Box>
                    </Flex>
                </Box>
            </Box>
            <Box pt={3}>
                <div className="seperator" />
                <Box pt={3}>
                    <DatasetUrlInput
                        value={urlToImport}
                        onChange={handleDatasetUrlChange}
                    />
                    <ImportToGalaxyBtn 
                        url={urlToImport} 
                        disabled={disableImportToGalaxy} 
                    />
                </Box>
            </Box>
        </Box>
    );
};
