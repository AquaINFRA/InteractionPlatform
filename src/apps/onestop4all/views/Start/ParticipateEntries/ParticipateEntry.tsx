import { useIntl } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { useService } from "open-pioneer:react-hooks";
import { useNavigate } from "react-router-dom";
import yaml from "js-yaml";
import { Box } from "@open-pioneer/chakra-integration";

export interface ParticipateEntriesProps {
    imageUrl: string;
    name: string;
}

export const ParticipateEntry = (props: { participateEntryTitle: string }) => {
    const intl = useIntl();
    const searchSrvc = useService("onestop4all.SearchService");
    const navigate = useNavigate();

    const participateEntryTitle = props.participateEntryTitle;
    const [participateEntryYaml, setEntryYaml] = useState<ParticipateEntriesProps>();
    const [participateEntryMarkdown, setEntryMarkdown] = useState<string>();

    const extractYaml = (md: string) => {
        const yamlRegex = /^---\n([\s\S]*?)\n---\n/;
        const yamlContent = md.match(yamlRegex);
        if (yamlContent) {
            const yamlCon = yaml.loadAll(yamlContent[0]);
            setEntryYaml(yamlCon[0] as ParticipateEntriesProps);
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
        searchSrvc.getHowToEntry(participateEntryTitle).then((result) => {
            if (result) {
                extractYaml(result);
                extractMarkdown(result);
            }
        });
    }, [participateEntryTitle]);

    const handleClick = () => {
        navigate(`/participateentry/` + encodeURIComponent(participateEntryMarkdown as string));
        window.scroll(0, 0);
    };

    return (
        <Box _hover={{ cursor: "pointer" }}>
            {participateEntryYaml && participateEntryMarkdown ? (
                <div
                    className="participate-entry"
                    onClick={() => {
                        handleClick();
                    }}
                >
                    <div className="overlap">
                        <div className="circle-group">
                            <div className="circle circle-1 icon-base" />
                            <div className="circle circle-2 div" />
                            <div className="circle circle-3 icon-base-2" />
                        </div>
                        <img
                            className="image"
                            src={
                                "https://git.rwth-aachen.de/nfdi4earth/livinghandbook/livinghandbook/-/raw/main/docs/img/" +
                                participateEntryTitle.replace(".md", "") +
                                ".png"
                            }
                        />
                    </div>
                    <div className="label">{participateEntryYaml.name}</div>
                </div>
            ) : null}
        </Box>
    );
};
