import { useState } from "react";
import { useIntl } from "open-pioneer:react-hooks";
import { Box } from "@open-pioneer/chakra-integration";

export const CaseStudies = () => {
    const intl = useIntl();
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

    return (
        <div>
            <Box className="text-centered-box-header" marginBottom={"4%"}>
                Learn more about our use cases
            </Box>
            <div className="carousel-container">
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    height="75px" // Set a fixed height for the carousel container
                >
                    <Box
                        flex="0 0 75px"
                        hideBelow="custombreak"
                        onClick={() => {
                            handlePrev();
                        }}
                        _hover={{ cursor: "pointer" }}
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
                    </div>
                    <Box
                        flex="0 0 75px"
                        hideBelow="custombreak"
                        onClick={() => {
                            handleNext();
                        }}
                        _hover={{ cursor: "pointer" }}
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
                </Box>
            </div>
        </div>
    );
};
