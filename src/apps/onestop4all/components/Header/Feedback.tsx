import { Box } from "@open-pioneer/chakra-integration";
//import { useIntl, useService } from "open-pioneer:react-hooks";

export const Feedback = (props: { fontSize: string }) => {
    //const intl = useIntl();
    //const searchSrvc = useService("onestop4all.SearchService");
    //const opts = searchSrvc.getFeedbackUrl();

    return (
        <Box w="100%">
            <div style={{ textAlign: "center", fontSize: props.fontSize }}>
                This platform is a beta version. Do you have feedback? Tell us&nbsp;
                <a
                    href="https://docs.google.com/document/d/1GPDQSZjHOXkzKJW1q3k4GshlPcFaK4t5OpvWzXnUdpg/edit?usp=sharing"
                    className="link"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span style={{ textDecoration: "underline" }}>here</span>!
                </a>
            </div>
        </Box>
    );
};
