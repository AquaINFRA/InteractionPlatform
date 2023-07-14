import { Box, CheckboxProps, chakra, useCheckbox } from "@open-pioneer/chakra-integration";

import { PrimaryColor } from "../../../../Theme";

export interface FacetCheckboxProps {
    label: string;
    count: number;
}

export const FacetCheckbox = (props: CheckboxProps & FacetCheckboxProps) => {
    const { state, getInputProps, getLabelProps, htmlProps } = useCheckbox(props);
    const { label, count } = props;

    const countStyles = {
        color: PrimaryColor,
        opacity: 0.5,
        fontFamily: "Open Sans",
        fontSize: "14px",
        fontWeight: 400
    };

    return (
        <chakra.label
            display="flex"
            flexDirection="row"
            alignItems="center"
            gridColumnGap={2}
            rounded="lg"
            cursor="pointer"
            {...htmlProps}
        >
            <input {...getInputProps()} hidden />
            <Box width="19px">
                {state.isChecked ? (
                    <svg
                        width="19"
                        height="16"
                        viewBox="0 0 19 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M1 3H13V15H1V3Z" fill="white" stroke="#05668D" strokeWidth="2" />
                        <path
                            d="M7.53101 10.1597L15.0028 0.999993L18.6212 3.95161L11.1494 13.1113L7.53101 10.1597Z"
                            fill="white"
                        />
                        <path
                            d="M4 6.35441L9.36214 11.7166L17.8621 1.21655"
                            stroke="#05668D"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                ) : (
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0.5 0.5H13.5V13.5H0.5V0.5Z" fill="white" stroke="#05668D" />
                    </svg>
                )}
            </Box>
            <Box
                color={PrimaryColor}
                fontFamily="Open Sans"
                fontSize="14px"
                fontWeight={state.isChecked ? "700" : "400"}
                {...getLabelProps()}
            >
                {label}
            </Box>
            <Box __css={countStyles}>({count})</Box>
        </chakra.label>
    );
};
