import { useState } from "react";
import { useIntl } from "open-pioneer:react-hooks";
import { Box, Button, Flex } from "@open-pioneer/chakra-integration";
import { useNavigate } from "react-router-dom";

export const CaseStudies = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const richTextIntl = {
        bold: (chunks: string[]) =>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            chunks.map((chunk, i) => (<b key={`bold_${i}`}>{chunks[0]}</b>) as any)
    };
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsText = [
        intl.formatMessage(
            {
                id: "start.caseStudy.oneText"
            },
            richTextIntl
        ),
        intl.formatMessage(
            {
                id: "start.caseStudy.twoText"
            },
            richTextIntl
        ),
        intl.formatMessage(
            {
                id: "start.caseStudy.threeText"
            },
            richTextIntl
        ),
        intl.formatMessage(
            {
                id: "start.caseStudy.fourText"
            },
            richTextIntl
        )
    ];

    const itemsTitle = [
        intl.formatMessage(
            {
                id: "start.caseStudy.oneTitle"
            },
            richTextIntl
        ),
        intl.formatMessage(
            {
                id: "start.caseStudy.twoTitle"
            },
            richTextIntl
        ),
        intl.formatMessage(
            {
                id: "start.caseStudy.threeTitle"
            },
            richTextIntl
        ),
        intl.formatMessage(
            {
                id: "start.caseStudy.fourTitle"
            },
            richTextIntl
        )
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + itemsText.length) % itemsText.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % itemsText.length);
    };

    const handleClick = (index: number) => {
        navigate(`/caseStudy/` + index);
    };

    return (
        <Box className="how-to">
            <Box className="text-centered-box">
                <Box className="text-centered-box-header">Learn more about our fantastic use cases</Box>
                <Box className="text-centered-box-text">
                    The case studies showcase the benefit of doing research in an open and FAIR way.
                </Box>
            </Box>
            <Box marginTop={"1%"} padding={"0px 200px"} w={"100%"}>
                <Flex>
                    <Box
                        hideBelow="custombreak"
                        onClick={() => {
                            handlePrev();
                        }}
                        _hover={{ cursor: "pointer" }}
                        marginTop={"4%"}
                    >
                        <svg
                            width="76"
                            height="76"
                            viewBox="0 0 76 76"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M32 7.5L1 38L32 68.5" stroke="#05668D" />
                        </svg>
                    </Box>
                    <div className="carousel">
                        <div className="carousel-text" key={currentIndex}>
                            {itemsTitle[currentIndex]}
                            <br />
                            {itemsText[currentIndex]}
                        </div>
                        <Button
                            onClick={() => {
                                handleClick(currentIndex);
                            }}
                            marginTop={"1%"}
                        >
                            More
                        </Button>
                    </div>
                    <Box
                        flex="0 0 75px"
                        hideBelow="custombreak"
                        onClick={() => {
                            handleNext();
                        }}
                        _hover={{ cursor: "pointer" }}
                        marginTop={"4%"}
                    >
                        <svg
                            width="76"
                            height="76"
                            viewBox="0 0 76 76"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M44 7.5L75 38L44 68.5" stroke="#05668D" />
                        </svg>
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};
