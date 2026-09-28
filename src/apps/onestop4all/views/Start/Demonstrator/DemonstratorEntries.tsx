import { Box, SimpleGrid } from "@open-pioneer/chakra-integration";
import { useService } from "open-pioneer:react-hooks";

import { DemonstratorEntry } from "./DemonstratorEntry";
import { SearchService } from "../../../services";
import { useEffect, useState } from "react";
import { DkpRecord, getDkpRecords } from "../../../services/DkpUtils";

export const DemonstratorEntries = () => {
    const searchSrvc = useService("onestop4all.SearchService") as SearchService;
    const [demonstrators, setDemonstrators] = useState<DkpRecord[]>([]);

    useEffect(() => {
        getDkpRecords(searchSrvc).then(setDemonstrators);
    }, [searchSrvc]);

    return (
        <Box className="how-to">
            <Box className="text-centered-box" marginBottom={{ base: "5%", custombreak: "0%" }}>
                <Box className="text-centered-box-header">
                    Browse through our ready-to-use demonstrators
                </Box>
            </Box>
            <SimpleGrid
                columns={[1, 2, 3]}
                spacing={5}
                marginTop={"1%"}
            >
                {demonstrators.map((demonstrator) => (
                    <DemonstratorEntry
                        key={`${demonstrator.provider}:${demonstrator.id}`}
                        title={demonstrator.title || "Untitled"}
                        provider={demonstrator.provider}
                        id={demonstrator.id}
                    />
                ))}
            </SimpleGrid>
        </Box>
    );
};
