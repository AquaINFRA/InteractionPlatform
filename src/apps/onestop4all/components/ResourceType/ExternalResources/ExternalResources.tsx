import { Box, Flex, Input } from "@open-pioneer/chakra-integration";
import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useEffect, useState, ChangeEvent } from "react";
import { useService } from "open-pioneer:react-hooks";

import { LinkObject } from "../../../views/Dataset/Dataset";
import { ActionButton } from "../ActionButton/ActionButton";
import { isUrl } from "../Metadata/PersonalInfo";
import { SearchService } from "../../../services";
import { TextFileResponse } from "../../../services/SearchService";
import { UrlBuilderPopup } from "./UrlBuilderPopup";

export const ExternalResources = (props: { links: LinkObject[] }) => {
    const { links } = props;
    const searchSrvc = useService("onestop4all.SearchService") as SearchService;

    const [externalLinks, setExternalLinks] = useState<LinkObject[]>();
    const [urlToImport, setUrlToImport] = useState("");
    const [disableImportToGalaxy, setDisableImportToGalaxy] = useState(true);
    const [urlBuilder, openUrlBuilder] = useState(false);
    const [ogcApiFeatureService, setOgcApiFeatureService] = useState<string | null>(null);
    const [isSendingToGalaxy, setIsSendingToGalaxy] = useState(false);

    useEffect(() => {
        const newLinks = new Array<LinkObject>();
        links.forEach((link) => {
            if (
                (
                    link.title === "Original resource" ||
                    link.title === "Original metadata" ||
                    link.title?.toLowerCase().includes("data download")
                ) && link.href?.trim() !== ""
            ) {
                newLinks.push(link);
            }
        });
        setExternalLinks(newLinks);
    }, [links]);

    const createTxtFile = async (url: string) => {
        if (isUrl(url)) {
            try {
                searchSrvc.createTxtFile(url)
                    .then((response: void | TextFileResponse) => {
                        if (response && response.textfile && response.textfile.href) {
                            window.open(`https://aqua.usegalaxy.eu/tool_runner?tool_id=aquainfra_importer&URL=${response.textfile.href}`, "_blank");
                        }
                    })
                    .catch ((err) => {
                        console.log(err);
                    });
            } catch (error) {
                console.error(error);
                setDisableImportToGalaxy(true);
                return null;
            }
        } else {
            setDisableImportToGalaxy(true);
            return null;
        }
    };

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setUrlToImport(url);
        isUrl(event.target.value) ? setDisableImportToGalaxy(false) : setDisableImportToGalaxy(true);
    };

    const openBuilder = async (href: string) => {
        if (href.includes("https://vm4072.kaj.pouta.csc.fi/ddas/oapif/collections")) {
            setOgcApiFeatureService(href);
            openUrlBuilder(true);
        }
    };

    const sendToGalaxy = async (href: string) => {
        setIsSendingToGalaxy(true);
        try {
            const txt = await createTxtFile(href);
            if (txt) {
                window.open(`https://aqua.usegalaxy.eu/tool_runner?tool_id=aquainfra_importer&URL=${txt}`, "_blank");
            }
        } catch (error) {
            console.error("Error sending to Galaxy:", error);
        } finally {
            setIsSendingToGalaxy(false);
        }
    };

    return (
        <Box pt={5}>
            <div className="abstractSectionHeader">Access Data</div>
            {externalLinks ? externalLinks.map((link: LinkObject, i: number) => (
                <Box key={i} pt={3}>
                    <div className="seperator" />
                    {link.title ? (
                        <div>
                            <span className="metadataTag">Title: </span>
                            <span className="metadataValue">{link.title}</span>
                        </div>
                    ) : null}
                    <Flex flexDirection="column"> 
                        <Box pt={3}>
                            <ActionButton
                                label="Visit"
                                icon={<ExternalLinkIcon color="white" />}
                                variant="solid"
                                fun={() => window.open(link.href as string, "_blank")} // Opens the visit link in a new tab
                            />
                        </Box>
                        { link.type && (link.type === "application/zip" || 
                            link.type === "ZIP" ||
                            link.type === "SHAPE-ZIP" ||
                            link.type === "JSON" || 
                            link.type === "OGC API - Features" ||
                            link.type.startsWith("image/") ||
                            link.type === "application/x-netcdf" ||
                            (link.type === "application/json" && link.href.endsWith(".json")) ||
                            (link.type === "application/octet-stream" && (link.href.includes("/rest/") || link.href.includes("api.") && link.href.includes("getData")))) ? (
                                <Box pt={3}>
                                    <ActionButton
                                        label="Import to Galaxy"
                                        icon={<DownloadIcon color="white" />}
                                        variant="solid"
                                        fun={() => openBuilder(link.href)} 
                                    />
                                </Box>
                            ) : null}
                    </Flex>
                </Box>
            )) : null}
            <Box pt={3}>
                <div className="seperator" />
                <Box>
                    <div>
                        <span className="metadataValue">Insert URL to a dataset</span>
                    </div>
                    <Box pt={3}>
                        <Input 
                            value={urlToImport}
                            onChange={handleChange}
                            placeholder="Insert here"
                        />
                    </Box>
                    <ActionButton
                        label={isSendingToGalaxy ? "Importing..." : "Import to Galaxy"}
                        disabled={disableImportToGalaxy || isSendingToGalaxy}
                        icon={<DownloadIcon color="white" />}
                        variant="solid"
                        fun={() => sendToGalaxy(urlToImport)}
                    />
                </Box>
            </Box>
            {ogcApiFeatureService && <UrlBuilderPopup
                isOpen={urlBuilder}
                onClose={() => openUrlBuilder(false)}
                createTxtFile={createTxtFile}
                ogc_features_url={ogcApiFeatureService}
            />}
        </Box>
    );
};
