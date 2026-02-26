import { Box, Tooltip } from "@open-pioneer/chakra-integration";
import { ActionButton } from "./ActionButton";

type TooltipActionButtonProps = {
    href: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    variant?: string;
};

export const TooltipActionButton = ({ href, label, icon, onClick, disabled, variant }: TooltipActionButtonProps) => (
    <Tooltip label={href} hasArrow placement="bottom" openDelay={100}>
        <Box display="inline-block" w="100%">
            <ActionButton
                label={label}
                icon={icon}
                variant={variant ?? "solid"}
                fun={onClick}
                disabled={disabled}
            />
        </Box>
    </Tooltip>
);
