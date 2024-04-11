import { Link } from "react-router-dom";

import { Box, Flex } from "@open-pioneer/chakra-integration";
import { LinkObject } from "../../../views/Dataset/Dataset";
import { ActionButton } from "../ActionButton/ActionButton";
import { DownloadIcon, ExternalLinkIcon } from "@chakra-ui/icons";

export const ExternalResources = (props: { links: LinkObject[] }) => {
    const { links } = props;
    console.log(links);
    return (
        <Box>
            <div className="abstractSectionHeader">External Resources</div>
            {links.map((link: LinkObject, i: number) => (
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
                        {link.type === "application/zip" ? (
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
                        ): null}
                    </Flex>
                </Box>
            ))}
        </Box>
    );
};
