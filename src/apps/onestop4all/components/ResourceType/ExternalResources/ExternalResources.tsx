import { Box } from "@open-pioneer/chakra-integration";
import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

import { ActionButton } from "../ActionButton/ActionButton";
import { UrlBuilderPopup } from "./UrlBuilderPopup";
import { ImportToGalaxyBtn } from "./ImportToGalaxyBtn";
import { DatasetUrlInput } from "./InsertUrl";
import { LinkObject } from "../../../services/interfaces";

const EXCLUDED_TITLES = new Set([
    "The landing page of this server as HTML",
    "This document as GeoJSON",
    "This document as RDF (JSON-LD)",
    "The landing page of this server as JSON",
    "This document as HTML"
]);

const DDAS = "https://vm4072.kaj.pouta.csc.fi/ddas/";
const COLLECTIONS = "https://vm4072.kaj.pouta.csc.fi/ddas/oapif/collections";
const MAX_VISIBLE_LINKS = 5;

export const ExternalResources = (props: { links: LinkObject[] }) => {
    const { links } = props;

    const [externalLinks, setExternalLinks] = useState<LinkObject[]>([]);
    const [urlToImport, setUrlToImport] = useState("");
    const [disableImportToGalaxy, setDisableImportToGalaxy] = useState(true);
    const [urlBuilder, openUrlBuilder] = useState(false);
    const [ogcApiFeatureService, setOgcApiFeatureService] = useState<string | null>(null);
    
    const hasOgcApiFeatures = externalLinks?.some(link => link.type === "OGC API - Features");
    const hasDownloadableData = externalLinks?.some(link => 
        ["application/zip", "ZIP", "TIFF", "SHAPE-ZIP", "JSON", "GPKG", "application/x-netcdf", "application/geopackage+sqlite3", "application/json", "dBase", "VRT", "CSV", "application/x-ipynb+json", "text/x-python"]
            .includes(link.type)
    );

    const [showAllLinks, setShowAllLinks] = useState(false);
    const visibleLinks = showAllLinks
        ? externalLinks
        : externalLinks.slice(0, MAX_VISIBLE_LINKS);
    const hasMoreLinks = externalLinks.length > MAX_VISIBLE_LINKS;

    useEffect(() => {
        setExternalLinks(
            links.filter((link) =>
                !EXCLUDED_TITLES.has(link.title ?? "") &&
                link.rel !== "collection" &&
                !(
                    link.href?.includes(DDAS) &&
                    link.type !== "OGC API - Features"
                )
            )
        );
    }, [links]);

    const handleDatasetUrlChange = (url: string, isValid: boolean) => {
        setUrlToImport(url);
        setDisableImportToGalaxy(!isValid);
    };

    const openBuilder = async (href: string) => {
        if (href.includes(COLLECTIONS)) {
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
            case "application/x-ipynb+json":
            case "text/x-python": 
            case "application/json":
                return (
                    <Box>
                        <ActionButton
                            label="Download"
                            icon={<DownloadIcon color="white" />}
                            variant="solid"
                            fun={() => window.open(link.href as string, "_blank")}
                        />
                        <Box pt={3}>
                            <ImportToGalaxyBtn url={link.href} disabled={urlToImport === link.href} />
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

    function showMoreLess() {
        if (showAllLinks) {
            setShowAllLinks(false);
            requestAnimationFrame(() => {
                window.scrollTo({
                    top: 100,
                    behavior: "smooth"
                });
            });
            return;
        }
        setShowAllLinks(true);
    };

    return (
        <Box>
            {visibleLinks.map((link: LinkObject, i: number) => (
                <Box key={i}>
                    {link.href && (
                        <Box>
                            <span className="sideButtonTag">Title: </span>
                            <span className="sideButtonValue">
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
                        i < visibleLinks.length-1 &&
                            <Box pt={3}>
                                <div className="seperator" />
                            </Box>
                    }
                </Box>
            ))}
            {hasMoreLinks && (
                <Box pt={3}>
                    <ActionButton
                        label={showAllLinks ? "Show less" : "Show more"}
                        variant="outline"
                        fun={() => showMoreLess()}
                    />
                </Box>
            )}
            {!hasOgcApiFeatures && !hasDownloadableData && (
                <Box pt={3}>
                    <Box pt={3}>
                        <div className="seperator" />
                    </Box>
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
            )}
            {ogcApiFeatureService && <UrlBuilderPopup
                isOpen={urlBuilder}
                onClose={() => openUrlBuilder(false)}
                ogc_features_url={ogcApiFeatureService}
            />}
        </Box>
    );
};
