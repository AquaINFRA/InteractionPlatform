import { Box, Tooltip } from "@open-pioneer/chakra-integration";
import { ActionButton } from "../ActionButton/ActionButton";

type TooltipActionButtonProps = {
    href: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
};

export const TooltipActionButton = ({ href, label, icon, onClick }: TooltipActionButtonProps) => (
    <Tooltip label={href} hasArrow placement="bottom" openDelay={100}>
        <Box display="inline-block" w="100%">
            <ActionButton
                label={label}
                icon={icon}
                variant="solid"
                fun={onClick}
            />
        </Box>
    </Tooltip>
);
