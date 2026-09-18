import { Box } from "@open-pioneer/chakra-integration";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useState } from "react";

import { DatasetUrlInput } from "../../components/ResourceType/ExternalResources/Components/InsertUrl";
import { TooltipActionButton } from "../../components/ResourceType/ActionButton/TooltipActionButton";
import { B2ShareLink } from "../../services/B2ShareUtils";

export const B2ShareResources = (props: { repoHtml?: string; metadataJson?: string; downloads: B2ShareLink[]; }) => {
    const { repoHtml, metadataJson, downloads } = props;

    const [urlToImport, setUrlToImport] = useState("");
    const [disableImportToGalaxy, setDisableImportToGalaxy] = useState(true);

    const handleDatasetUrlChange = (url: string, isValid: boolean) => {
        setUrlToImport(url);
        setDisableImportToGalaxy(!isValid);
    };

    return (
        <Box>
            <div className="abstractSectionHeader">B2Share resources</div>
            <Box pt={3}>
                <div className="seperator" />
            </Box>
            {repoHtml && (
                <Box pt={3}>
                    <TooltipActionButton
                        href={repoHtml}
                        label="Visit repository"
                        icon={<ExternalLinkIcon color="white" />}
                        variant="solid"
                        onClick={() => window.open(repoHtml, "_blank")}
                    />
                </Box>
            )}
            {metadataJson && (
                <Box pt={6}>
                    <TooltipActionButton
                        href={metadataJson}
                        label="Check metadata"
                        icon={<ExternalLinkIcon color="white" />}
                        variant="solid"
                        onClick={() => window.open(metadataJson, "_blank")}
                    />
                </Box>
            )}
            {downloads.map((download, index) => (
                <Box pt={6} key={index}>
                    <TooltipActionButton
                        href={download.href}
                        label={download.title || "Download"}
                        icon={<ExternalLinkIcon color="white" />}
                        variant="solid"
                        onClick={() => window.open(download.href, "_blank")}
                    />
                </Box>
            ))}
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
