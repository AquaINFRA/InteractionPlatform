/* eslint-disable */
import { Box, Flex, SimpleGrid } from "@open-pioneer/chakra-integration";
import { useIntl } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { useService } from "open-pioneer:react-hooks";

import yaml from "js-yaml";

import { LhbStructure } from "../../../components/ResourceType/TOC/TOC";
import { ParticipateEntry } from "./ParticipateEntry";

export const ParticipateEntries = () => {
    const intl = useIntl();
    //const language = "eng";

    const searchSrvc = useService("onestop4all.SearchService");
    const [participateEntries, setEntries] = useState(new Array<string>());

    const getParticipateEntriesList = (sections: object[]) => {
        let foundList = new Array<string>();
        sections.forEach((elem) => {
            if (Object.keys(elem)[0] === "Participate") {
                foundList = Object.values(elem)[0];
            }
        });
        console.log(foundList);
        return foundList;
    };

    useEffect(() => {
        searchSrvc.getLhbStructure().then((result) => {
            const parsedYaml = yaml.load(result) as LhbStructure;
            let participateEntriesList = getParticipateEntriesList(parsedYaml.nav);
            /*participateEntriesList =
                language === "eng"
                    ? participateEntriesList.filter((str) => str.includes("_ENG.md"))
                    : language === "de"
                    ? participateEntriesList.filter((str) => str.includes("_DEU.md"))
                    : participateEntriesList;*/
            setEntries(participateEntriesList);
        });
    }, []);

    if (participateEntries.length > 2) {
        return (
            <Box className="get-involved">
                <Box className="text-centered-box">
                    <Box className="text-centered-box-header">
                        {intl.formatMessage({ id: "start.get-involved.title" })}
                    </Box>
                    <Box className="text-centered-box-text">
                        {intl.formatMessage({ id: "start.get-involved.description" })}
                    </Box>
                </Box>

                <Flex
                    className="entries"
                    justifyContent="space-between"
                    pt="32px"
                    overflow="hidden"
                >
                    {participateEntries.map((participateEntry, index) => (
                        <Box key={index}>
                            <ParticipateEntry
                                participateEntryTitle={participateEntry}
                                key={index}
                            ></ParticipateEntry>
                        </Box>
                    ))}
                </Flex>
            </Box>
        );
    } else {
        return null;
    }
};
