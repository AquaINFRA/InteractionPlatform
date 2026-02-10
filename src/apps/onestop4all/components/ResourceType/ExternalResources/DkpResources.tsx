import { Box } from "@open-pioneer/chakra-integration";
import { ActionButton } from "../ActionButton/ActionButton";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const DkpResources = ({ dkps }: { dkps: any[] }) => {
    if (!dkps?.length) return null;

    return (
        <Box pt={5}>
            <div className="abstractSectionHeader">Data-to-Knowledge Package</div>
            {dkps.map((dkp, i) => {
                const graph = dkp["@graph"]?.[1];
                if (!graph) return null;

                return (
                    <Box key={i} pt={3}>
                        {graph.name && (
                            <div>
                                <span className="sideButtonTag">Title: </span>
                                <span className="sideButtonValue">{graph.name}</span>
                            </div>
                        )}
                        <Box pt={3}>
                            <ActionButton
                                label="Visit"
                                icon={<ExternalLinkIcon color="white" />}
                                variant="solid"
                                fun={() => window.open(graph.url?.["@id"], "_blank")}
                            />
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};
