import { DownloadIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useService } from "open-pioneer:react-hooks";

import { TooltipActionButton } from "../../../ActionButton/TooltipActionButton";
import { isUrl } from "../../../Metadata/PersonalInfo";
import { SearchService } from "../../../../../services";

interface ImportToGalaxyBtnProps {
    url: string;
    disabled: boolean;
    setImported?: (imported: boolean) => void;
}

const GALAXY_IMPORT_URL = "https://usegalaxy.eu/tool_runner?tool_id=aquainfra_importer&URL=";

export const ImportToGalaxyBtn = (props: ImportToGalaxyBtnProps) => {
    const { url, disabled, setImported } = props;
    const searchSrvc = useService("onestop4all.SearchService") as SearchService;

    const [isSendingToGalaxy, setIsSendingToGalaxy] = useState(false);

    const createTxtFile = async (url: string) => {
        if (!isUrl(url)) {
            throw new Error("Invalid URL");
        }

        setIsSendingToGalaxy(true);

        try {
            const response = await searchSrvc.createTxtFile(url);
            const href = response?.textfile?.href;
            if (!href) {
                throw new Error("No textfile href returned");
            }
            window.open(`${GALAXY_IMPORT_URL}${href}`);
            reset();
        } catch (error) {
            console.error(error);
            reset();
        }
    };

    const reset = () => {
        setIsSendingToGalaxy(false);
    };

    return (
        <TooltipActionButton
            href={GALAXY_IMPORT_URL}
            label={isSendingToGalaxy ? "Importing..." : "Import to Galaxy"}
            icon={<DownloadIcon color="white" />}
            onClick={() => setTimeout(() => {
                createTxtFile(url);
                setImported?.(true);
            }, 500)}
            disabled={disabled}
        />
    );
};
