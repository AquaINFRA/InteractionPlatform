import { Box } from "@open-pioneer/chakra-integration";
import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

import { ActionButton } from "../ActionButton/ActionButton";
import { OgcApiFeaturesBuilder } from "./OgcApiFeaturesBuilder";
import { ImportToGalaxyBtn } from "./ImportToGalaxyBtn";
import { DatasetUrlInput } from "./InsertUrl";
import { LinkObject } from "../../../services/interfaces";
import { scrollUp } from "../../../services/SearchUtils";
import { TooltipActionButton } from "./TooltipActionButton";
import { OgcApiCoveragesBuilder } from "./OgcApiCoveragesBuilder";

const EXCLUDED_TITLES = new Set([
    "The landing page of this server as HTML",
    "This document as GeoJSON",
    "This document as RDF (JSON-LD)",
    "The landing page of this server as JSON",
    "This document as HTML"
]);

const DDAS = "https://vm4072.kaj.pouta.csc.fi/ddas/";
const OAPIF_COLLECTIONS = "https://vm4072.kaj.pouta.csc.fi/ddas/oapif/collections";
const OAPIC_COLLECTIONS = "https://vm4072.kaj.pouta.csc.fi/ddas/oapic/collections";
const MAX_VISIBLE_LINKS = 5;

export const ExternalResources = (props: { links: LinkObject[] }) => {
    const { links } = props;

    const [externalLinks, setExternalLinks] = useState<LinkObject[]>([]);
    const [urlToImport, setUrlToImport] = useState("");
    const [disableImportToGalaxy, setDisableImportToGalaxy] = useState(true);
    
    const [featuresBuilder, openFeaturesBuilder] = useState(false);
    const [coveragesBuilder, openCoveragesBuilder] = useState(false);
    
    const [featuresService, setFeaturesService] = useState<string | null>(null);
    const [coveragesService, setCoveragesService] = useState<string | null>(null);
    
    const hasFeaturesService = externalLinks?.some(link => link.type === "OGC API - Features");
    const hasCoveragesService = externalLinks?.some(link => link.type === "OGC API - Coverages");
    const hasDownloadableData = externalLinks?.some(link => 
        ["application/zip", "ZIP", "TIFF", "SHAPE-ZIP", "JSON", "GPKG", "application/x-netcdf", "application/geopackage+sqlite3", "application/json", "dBase", "VRT", "CSV", "application/x-ipynb+json", "text/x-python", "json"]
            .includes(link.type)
    );

    const [showAllLinks, setShowAllLinks] = useState(false);
    const visibleLinks = showAllLinks
        ? externalLinks
        : externalLinks.slice(0, MAX_VISIBLE_LINKS);
    const hasMoreLinks = externalLinks.length > MAX_VISIBLE_LINKS;

    const [imported, setImported] = useState(false);

    useEffect(() => {
        setExternalLinks(
            links.filter((link) =>
                !EXCLUDED_TITLES.has(link.title ?? "") &&
                link.rel !== "collection" &&
                !(
                    link.href?.includes(DDAS) &&
                    link.type !== "OGC API - Features" &&
                    link.type !== "OGC API - Coverages"
                )
            )
        );
    }, [links]);

    const handleDatasetUrlChange = (url: string, isValid: boolean) => {
        setUrlToImport(url);
        setDisableImportToGalaxy(!isValid);
    };

    const openFeaturesServiceBuilder = async (href: string) => {
        if (href.includes(OAPIF_COLLECTIONS)) {
            setFeaturesService(href);
            openFeaturesBuilder(true);
        }
    };

    const openCoveragesServiceBuilder = async (href: string) => {
        if (href.includes(OAPIC_COLLECTIONS)) {
            setCoveragesService(href);
            openCoveragesBuilder(true);
        }
    };

    const createButton = (link: LinkObject) => {
        switch(link.type) {
            case "OGC API - Features":
                return (
                    <TooltipActionButton
                        href={link.href}
                        label="Open"
                        icon={<ExternalLinkIcon color="white" />}
                        onClick={() => openFeaturesServiceBuilder(link.href)}
                    />
                );
            case "OGC API - Coverages":
                return (
                    <TooltipActionButton
                        href={link.href}
                        label="Open"
                        icon={<ExternalLinkIcon color="white" />}
                        onClick={() => openCoveragesServiceBuilder(link.href)}
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
            case "json":
            case "application/json":
                return (
                    <>
                        <TooltipActionButton
                            href={link.href}
                            label="Download"
                            icon={<DownloadIcon color="white" />}
                            onClick={() => window.open(link.href as string, "_blank")}
                        />

                        <Box pt={3}>
                            <ImportToGalaxyBtn
                                url={link.href}
                                disabled={urlToImport === link.href}
                            />
                        </Box>
                    </>
                );
            default: 
                return (
                    <TooltipActionButton
                        href={link.href}
                        label="Open"
                        icon={<ExternalLinkIcon color="white" />}
                        onClick={() => window.open(link.href as string, "_blank")}
                    />
                );
        }
    };

    function showMoreLess() {
        if (showAllLinks) {
            setShowAllLinks(false);
            requestAnimationFrame(() => {
                scrollUp(100);
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
                        <>
                            <Box>
                                <span className="sideButtonTag">Title: </span>
                                <span className="sideButtonValue">
                                    {link.title ?? link.description ?? "No title available"}
                                </span>
                            </Box>
                            {link.protocol &&
                                <Box>
                                    <span className="sideButtonTag">Protocol: </span>
                                    <span className="sideButtonValue">
                                        {link.protocol}
                                    </span>
                                </Box>
                            }
                            {link.type &&
                                <Box>
                                    <span className="sideButtonTag">Type: </span>
                                    <span className="sideButtonValue">
                                        {link.type}
                                    </span>
                                </Box>
                            }
                        </>
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
            {!hasFeaturesService && !hasCoveragesService && !hasDownloadableData && (
                <Box pt={3}>
                    <Box pt={3}>
                        <div className="seperator" />
                    </Box>
                    <Box pt={3}>
                        <DatasetUrlInput
                            value={urlToImport}
                            onChange={handleDatasetUrlChange}
                            imported={imported}
                        />
                        <ImportToGalaxyBtn 
                            url={urlToImport} 
                            disabled={disableImportToGalaxy}
                            setImported={setImported}
                        />
                    </Box>
                </Box>
            )}
            {featuresService && <OgcApiFeaturesBuilder
                isOpen={featuresBuilder}
                onClose={() => openFeaturesBuilder(false)}
                ogc_features_url={featuresService}
            />}
            {coveragesService && <OgcApiCoveragesBuilder
                isOpen={coveragesBuilder}
                onClose={() => openCoveragesBuilder(false)}
                ogc_features_url={coveragesService}
            />}
        </Box>
    );
};
