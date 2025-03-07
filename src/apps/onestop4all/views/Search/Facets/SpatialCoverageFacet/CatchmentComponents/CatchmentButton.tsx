import { Button } from "@open-pioneer/chakra-integration";
import { PrimaryColor } from "../../../../../Theme";
import { lineBlue, lineGrey } from "../Styles";

interface CatchmentButtonProps {
    onClick: () => void;
    active: boolean;
    text: string;
    loading?: boolean;
}

export function CatchmentButton({ onClick, active, text, loading }: CatchmentButtonProps) {
    return (
        <Button
            bg={active ? PrimaryColor : lineGrey}
            _hover={active ? { bg: lineBlue } : lineGrey}
            onClick={active ? onClick : undefined}
            className="catchment-button"
            isLoading={loading}
            loadingText="Computing..."
            isDisabled={!active}
        >
            {text}
        </Button>
    );
}
