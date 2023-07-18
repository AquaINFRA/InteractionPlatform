import { Button, Icon } from "@open-pioneer/chakra-integration";
import { PrimaryColor } from "../../../Theme";

export const ActionButton = (props: { label: string; icon: any; variant: string; fun: any }) => {
    const { label, icon, variant, fun } = props;
    return (
        <Button
            className="actionButton"
            onClick={() => fun()}
            variant={variant}
            border="3px solid #05668D"
        >
            <Icon boxSize={6} color={PrimaryColor}>
                {icon}
            </Icon>
            <div className={variant=="solid" ? "actionButtonLabelSolid" : "actionButtonLabelOutline"}>{label}</div>
        </Button>
    );
};
