import { Box } from "@open-pioneer/chakra-integration";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { TooltipActionButton } from "../../ActionButton/TooltipActionButton";

export const DkpResources = ({ dkps }: { dkps: any[] }) => {
    if (!dkps?.length) return null;

    return (
        <Box>
            <div className="abstractSectionHeader">Data-to-Knowledge Package</div>
            {dkps.map((dkp, i) => {
                const graph = dkp["@graph"]?.[1];
                if (!graph) return null;

                return (
                    <Box key={i}>
                        {graph.name && (
                            <div>
                                <span className="sideButtonTag">Title: </span>
                                <span className="sideButtonValue">{graph.name}</span>
                            </div>
                        )}
                        <Box pt={3}>
                            <TooltipActionButton
                                href={graph.url?.["@id"]}
                                label="Visit"
                                icon={<ExternalLinkIcon color="white" />}
                                variant="solid"
                                onClick={() => window.open(graph.url?.["@id"], "_blank")}
                            />
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};
