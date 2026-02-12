import { DownloadIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { ActionButton } from "../ActionButton/ActionButton";
import { useService } from "open-pioneer:react-hooks";
import { SearchService } from "../../../services";
import { isUrl } from "../Metadata/PersonalInfo";

interface ImportToGalaxyBtnProps {
    url: string;
    disabled: boolean;
    setImported?: (imported: boolean) => void;
}

const GALAXY_IMPORT_URL = "https://aqua.usegalaxy.eu/tool_runner?tool_id=aquainfra_importer&URL=";

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
        <ActionButton
            label={isSendingToGalaxy ? "Importing..." : "Import to Galaxy"}
            disabled={disabled || isSendingToGalaxy}
            icon={<DownloadIcon color="white" />}
            variant="solid"
            fun={() => setTimeout(() => {
                createTxtFile(url);
                setImported?.(true);
            }, 500)}
        />
    );
};
