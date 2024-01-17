import { Link } from "react-router-dom";

import { Box } from "@open-pioneer/chakra-integration";
import { LinkObject } from "../../../views/Dataset/Dataset";
import { ActionButton } from "../ActionButton/ActionButton";
import { ExternalLinkIcon } from "@chakra-ui/icons";

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
                    <Link to={link.href as string} target="_blank">
                        <ActionButton
                            label="Visit"
                            icon={<ExternalLinkIcon color="white" />}
                            variant="solid"
                            fun={() => void 0}
                        />
                    </Link>
                </Box>
            ))}
        </Box>
    );
};
