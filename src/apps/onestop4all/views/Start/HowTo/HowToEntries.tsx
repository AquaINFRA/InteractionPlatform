/* eslint-disable */
import { Box, Flex, SimpleGrid } from "@open-pioneer/chakra-integration";
import { useIntl } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { useService } from "open-pioneer:react-hooks";

import yaml from "js-yaml";

import { LhbStructure } from "../../../components/ResourceType/TOC/TOC";
import { HowToEntry } from "./HowToEntry";

export const HowToEntries = () => {
    const intl = useIntl();
    const searchSrvc = useService("onestop4all.SearchService");
    const language = "eng";

    const [howToEntries, setEntries] = useState(new Array<string>());

    const getHowToEntriesList = (sections: object[]) => {
        let foundList = new Array<string>();
        sections.forEach((elem) => {
            if (Object.keys(elem)[0] === "TBEP") {
                foundList = Object.values(elem)[0];
            }
        });
        return foundList;
    };

    useEffect(() => {
        searchSrvc.getLhbStructure().then((result) => {
            const parsedYaml = yaml.load(result) as LhbStructure;
            let howToEntriesList = getHowToEntriesList(parsedYaml.nav);
            howToEntriesList =
                language === "eng"
                    ? howToEntriesList.filter((str) => str.includes("_ENG.md"))
                    : language === "de"
                    ? howToEntriesList.filter((str) => str.includes("_DEU.md"))
                    : howToEntriesList;
            console.log(howToEntriesList);
            setEntries(howToEntriesList);
        });
    }, []);

    return (
        <Box className="how-to">
            <Box className="text-centered-box">
                <Box className="text-centered-box-header">
                    {intl.formatMessage({ id: "start.how-to.title" })}
                </Box>
                <Box className="text-centered-box-text">
                    {intl.formatMessage({ id: "start.how-to.description" })}
                </Box>
            </Box>
            <SimpleGrid columns={3} spacing={10} paddingTop={"1%"}>
                {howToEntries.map((howToEntry, index) => (
                    <Flex key={index}>
                        <HowToEntry howToEntryTitle={howToEntry} key={index} />
                    </Flex>
                ))}
            </SimpleGrid>
        </Box>
    );
};
