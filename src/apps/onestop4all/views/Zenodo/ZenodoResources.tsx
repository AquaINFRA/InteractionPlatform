import { Box } from "@open-pioneer/chakra-integration";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useState } from "react";

import { DatasetUrlInput } from "../../components/ResourceType/ExternalResources/Components/InsertUrl";
import { TooltipActionButton } from "../../components/ResourceType/ActionButton/TooltipActionButton";

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
            <Box pt={3}>
                <div className="seperator" />
            </Box>
            <Box pt={3}>
                <TooltipActionButton 
                    href={repo}
                    label="Visit repository"
                    icon={<ExternalLinkIcon color="white" />}
                    variant="solid"
                    onClick={() => window.open(repo as string, "_blank")}
                />
            </Box>
            <Box pt={6}>
                <TooltipActionButton 
                    href={repo}
                    label="Check metadata"
                    icon={<ExternalLinkIcon color="white" />}
                    variant="solid"
                    onClick={() => window.open(metadata as string, "_blank")}
                />
            </Box>
            <Box pt={3}>
                <div className="seperator" />
                <Box pt={3}>
                    <DatasetUrlInput
                        value={urlToImport}
                        onChange={handleDatasetUrlChange}
                        disabled={disableImportToGalaxy}
                    />
                </Box>
            </Box>
        </Box>
    );
};
