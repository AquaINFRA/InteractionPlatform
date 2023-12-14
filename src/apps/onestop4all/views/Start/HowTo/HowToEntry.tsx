import { Box } from "@chakra-ui/react";
import { useIntl } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { useService } from "open-pioneer:react-hooks";
import { useNavigate } from "react-router-dom";
import yaml from "js-yaml";

export interface HowToEntryYaml {
    name: string;
    description: string;
}

export const HowToEntry = (props: { howToEntryTitle: string }) => {
    const intl = useIntl();
    const [hovered, setHovered] = useState(false);
    const searchSrvc = useService("onestop4all.SearchService");
    const navigate = useNavigate();

    const howToEntryTitle = props.howToEntryTitle;
    const [howToEntryYaml, setEntryYaml] = useState<HowToEntryYaml>();
    const [howToEntryMarkdown, setEntryMarkdown] = useState<string>();

    const extractYaml = (md: string) => {
        const yamlRegex = /^---\n([\s\S]*?)\n---\n/;
        const yamlContent = md.match(yamlRegex);
        if (yamlContent) {
            const yamlCon = yaml.loadAll(yamlContent[0]);
            setEntryYaml(yamlCon[0] as HowToEntryYaml);
        }
    };

    const extractMarkdown = (md: string) => {
        const yamlRegex = /^---\n([\s\S]*?)\n---\n/;
        const mdWithoutYaml = md.replace(yamlRegex, "");
        if (mdWithoutYaml) {
            setEntryMarkdown(mdWithoutYaml);
        }
    };

    useEffect(() => {
        searchSrvc.getHowToEntry(howToEntryTitle).then((result) => {
            if (result) {
                extractYaml(result);
                extractMarkdown(result);
            }
        });
    }, [howToEntryTitle]);

    const handleClick = () => {
        navigate(`/howtoentry/` + encodeURIComponent(howToEntryMarkdown as string));
        window.scroll(0, 0);
    };

    return (
        <div style={{ width: "100%" }}>
            {howToEntryYaml && howToEntryMarkdown ? (
                <Box
                    className={`how-to-entry ${hovered ? "hover" : "default"}`}
                    onMouseLeave={() => setHovered(false)}
                    onMouseEnter={() => setHovered(true)}
                    onClick={() => {
                        handleClick();
                    }}
                >
                    <Box className="frame">
                        <Box className="heading">{howToEntryYaml.name}</Box>
                        <Box className="abstract">{howToEntryYaml.description}</Box>
                    </Box>
                </Box>
            ) : null}
        </div>
    );
};
