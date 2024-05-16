import { Link } from "react-router-dom";

import { Box, Flex } from "@open-pioneer/chakra-integration";
import { LinkObject } from "../../../views/Dataset/Dataset";
import { ActionButton } from "../ActionButton/ActionButton";
import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

interface ExternalLink {
    href: string;
    title: string;
    type: string;
    description: string;
    protocol: string;
}

export const ExternalResources = (props: { links: LinkObject[] }) => {
    const { links } = props;
    console.log(links);
    const [externalLinks, setExternalLinks] = useState<ExternalLink[]>();

    useEffect(() => {
        const newLinks = new Array<ExternalLink>();
        links.forEach((link) => {
            link.title !== "The landing page of this server as HTML" && 
            link.title !== "This document as GeoJSON" && 
            link.title !== "This document as RDF (JSON-LD)" &&
            link.title !== "The landing page of this server as JSON" &&
            link.title !== "This document as HTML" ?
                newLinks.push(link) :
                null;
        });
        setExternalLinks(newLinks);
    }, []);

    return (
        <Box>
            <div className="abstractSectionHeader">External Resources</div>
            {externalLinks ? externalLinks.map((link: ExternalLink, i: number) => (
                <Box key={i} pt={3}>
                    <div className="seperator" />
                    {link.title !== "" && link.title !== null ? (
                        <div>
                            <span className="metadataTag">Title: </span>
                            <span className="metadataValue">{link.title}</span>
                        </div>
                    ) : null}
                    {link.description && link.description !== "" && link.description !== null ? (
                        <div>
                            <span className="metadataTag">Description: </span>
                            <span className="metadataValue">{link.description}</span>
                        </div>
                    ) : null}
                    {link.protocol ? (
                        <div>
                            <span className="metadataTag">Protocol: </span>
                            <span className="metadataValue">{link.protocol}</span>
                        </div>
                    ) : null}
                    {link.type ? (
                        <div>
                            <span className="metadataTag">Type: </span>
                            <span className="metadataValue">{link.type}</span>
                        </div>
                    ) : null}
                    <Flex flexDirection="column"> 
                        <Link to={link.href as string} target="_blank">
                            <ActionButton
                                label="Visit"
                                icon={<ExternalLinkIcon color="white" />}
                                variant="solid"
                                fun={() => void 0}
                            />
                        </Link>
                        {link.type === "application/zip" || link.type === "ZIP" || link.type === "OGC API - Features" ? (
                            <Link
                                to={
                                    ("https://aqua.usegalaxy.eu/tool_runner?tool_id=aquainfra_importer&URL=" +
                                        link.href) as string
                                }
                                //className="actionButtonLink"
                                target="_blank"
                            >
                                <ActionButton
                                    label="Import to Galaxy"
                                    icon={<DownloadIcon color="white" />}
                                    variant="solid"
                                    fun={() => void 0}
                                />
                            </Link>
                        ) : null}
                    </Flex>
                </Box>
            )) : null}
        </Box>
    );
};
