import { Box, Input } from "@open-pioneer/chakra-integration";
import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useEffect, useState, ChangeEvent } from "react";
import { useService } from "open-pioneer:react-hooks";

import { LinkObject } from "../../../views/Dataset/Dataset";
import { ActionButton } from "../ActionButton/ActionButton";
import { isUrl } from "../Metadata/PersonalInfo";
import { SearchService } from "../../../services";
import { UrlBuilderPopup } from "./UrlBuilderPopup";

const EXCLUDED_TITLES = new Set([
    "The landing page of this server as HTML",
    "This document as GeoJSON",
    "This document as RDF (JSON-LD)",
    "The landing page of this server as JSON",
    "This document as HTML"
]);

export const ExternalResources = (props: { links: LinkObject[] }) => {
    const { links } = props;
    const searchSrvc = useService("onestop4all.SearchService") as SearchService;

    const [externalLinks, setExternalLinks] = useState<LinkObject[]>([]);
    const [urlToImport, setUrlToImport] = useState("");
    const [disableImportToGalaxy, setDisableImportToGalaxy] = useState(true);
    const [urlBuilder, openUrlBuilder] = useState(false);
    const [ogcApiFeatureService, setOgcApiFeatureService] = useState<string | null>(null);
    const [isSendingToGalaxy, setIsSendingToGalaxy] = useState(false);
    const hasOgcApiFeatures = externalLinks?.some(link => link.type === "OGC API - Features");
    const hasDownloadableData = externalLinks?.some(link => 
        ["application/zip", "ZIP", "TIFF", "SHAPE-ZIP", "JSON", "GPKG", "application/x-netcdf", "application/geopackage+sqlite3", "application/json", "dBase", "VRT", "CSV"]
            .includes(link.type)
    );
    const [sendingHref, setSendingHref] = useState<string | null>(null);

    useEffect(() => {
        setExternalLinks(
            links.filter((link) =>
                !EXCLUDED_TITLES.has(link.title ?? "") &&
                link.rel !== "collection" &&
                !(
                    link.href?.includes("https://vm4072.kaj.pouta.csc.fi/ddas/") &&
                    link.type !== "OGC API - Features"
                )
            )
        );
    }, [links]);

    const reset = () => {
        setDisableImportToGalaxy(true);
        setUrlToImport("");
        setIsSendingToGalaxy(false);
        setSendingHref(null);
    };

    const createTxtFile = async (url: string) => {
        if (!isUrl(url)) {
            throw new Error("Invalid URL");
        }

        setSendingHref(url);
        setIsSendingToGalaxy(true);

        try {
            const response = await searchSrvc.createTxtFile(url);
            const href = response?.textfile?.href;
            if (!href) {
                throw new Error("No textfile href returned");
            }
            window.open(`https://aqua.usegalaxy.eu/tool_runner?tool_id=aquainfra_importer&URL=${href}`, "_blank");
            reset();
        } catch (error) {
            console.error(error);
            reset();
        }
    };

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setUrlToImport(url);
        setDisableImportToGalaxy(!isUrl(url));
    };

    const openBuilder = async (href: string) => {
        if (href.includes("https://vm4072.kaj.pouta.csc.fi/ddas/oapif/collections")) {
            setOgcApiFeatureService(href);
            openUrlBuilder(true);
        }
    };

    const createButton = (link: LinkObject) => {
        switch(link.type) {
            case "OGC API - Features":
                return (
                    <ActionButton
                        label="OGC API Features"
                        icon={<DownloadIcon color="white" />}
                        variant="solid"
                        fun={() => openBuilder(link.href)} 
                    />
                );
            case "application/zip":
            case "ZIP":
            case "TIFF":
            case "SHAPE-ZIP":
            case "JSON":
            case "GPKG":
            case "application/x-netcdf":
            case "dBase":
            case "application/geopackage+sqlite3":
            case "VRT":
            case "CSV":
            case "application/json":
                return (
                    <Box>
                        <ActionButton
                            label="Download  data"
                            icon={<DownloadIcon color="white" />}
                            variant="solid"
                            fun={() => window.open(link.href as string, "_blank")}
                        />
                        <Box pt={3}>
                            <ActionButton
                                label={sendingHref === link.href ? "Importing..." : "Import to Galaxy"}
                                icon={<DownloadIcon color="white" />}
                                variant="solid"
                                fun={() => {
                                    createTxtFile(link.href);
                                }}
                                disabled={sendingHref === link.href}
                            />
                        </Box>
                    </Box>
                );
            default: 
                return (
                    <Box>
                        <ActionButton
                            label="Visit"
                            icon={<ExternalLinkIcon color="white" />}
                            variant="solid"
                            fun={() => window.open(link.href as string, "_blank")}
                        />
                    </Box>
                );
        }
    };

    return (
        <Box>
            {externalLinks.map((link: LinkObject, i: number) => (
                <Box key={i}>
                    {link.href && (
                        <Box>
                            <span className="metadataTag">Title: </span>
                            <span className="metadataValue">
                                {link.title ?? link.description ?? "No information available"}
                            </span>
                        </Box>
                    )}
                    {
                        link.href !== "" ? (
                            <Box>
                                {createButton(link)}
                            </Box>
                        ) : null
                    }
                    {
                        i < externalLinks.length-1 &&
                            <Box pt={3}>
                                <div className="seperator" />
                            </Box>
                    }
                </Box>
            ))}
            {!hasOgcApiFeatures && !hasDownloadableData && (
                <Box pt={3}>
                    <Box pt={3}>
                        <div className="seperator" />
                    </Box>
                    <Box pt={3}>
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
                            fun={() => createTxtFile(urlToImport)}
                        />
                    </Box>
                </Box>
            )}
            {ogcApiFeatureService && <UrlBuilderPopup
                isOpen={urlBuilder}
                onClose={() => openUrlBuilder(false)}
                createTxtFile={createTxtFile}
                ogc_features_url={ogcApiFeatureService}
                disabled={isSendingToGalaxy}
            />}
        </Box>
    );
};
