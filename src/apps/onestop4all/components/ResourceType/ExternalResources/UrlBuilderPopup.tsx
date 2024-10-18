import {
    Box,
    Button,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Skeleton
} from "@open-pioneer/chakra-integration";
import { useState, useEffect } from "react";
import { CopyToClipboardButton } from "../ActionButton/CopyToClipboardButton";
import { Stack } from "@chakra-ui/react";

interface UrlBuilderPopupProps {
    isOpen: boolean;
    onClose: () => void;
    href: string;
    createTxtFile: (url: string) => void;
}

export const UrlBuilderPopup = ({ isOpen, onClose, href, createTxtFile }: UrlBuilderPopupProps) => {
    const [sliderValue, setSliderValue] = useState(10);
    const [inputValue, setInputValue] = useState("10");
    const [maxSliderValue, setMaxSliderValue] = useState(0);
    const [geoJsonHref, setGeoJsonHref] = useState<string>(href);
    const [updatedGeoJsonHref, setUpdatedGeoJsonHref] = useState<string | null>(null);
    const [copyUrlText, setCopyUrlText] = useState("Copy URL");
    const [isLoaded, setIsLoaded] = useState(false);
    const [metadata, setMetadata] = useState({} as any);

    useEffect(() => {
        if (isOpen && href) {
            fetchUrlBuilderData(href);
        }
    }, [isOpen, href]);

    useEffect(() => {
        if (!isOpen) {
            setSliderValue(10);
            setInputValue("10");
            setMaxSliderValue(100);
            setUpdatedGeoJsonHref(null);
            setCopyUrlText("Copy URL");
            setIsLoaded(false);
        }
    }, [isOpen]);

    const fetchUrlBuilderData = async (url: string) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setMetadata(data);
            if (data.links && Array.isArray(data.links)) {
                const geoJsonLink = data.links.find((link: any) =>
                    link.type === "application/geo+json" &&
                    link.rel === "items" &&
                    link.title === "items as GeoJSON"
                );
    
                if (geoJsonLink && geoJsonLink.href) {
                    const initialLimit = 10;
                    const newHref = `${geoJsonLink.href}&limit=${initialLimit}`;
                    setGeoJsonHref(newHref);
                    setUpdatedGeoJsonHref(newHref);
                    fetchGeoJsonData(newHref);
                }
            }
        } catch (error) {
            console.error("Error fetching URL Builder data:", error);
        }
    };

    const fetchGeoJsonData = async (geoJsonUrl: string) => {
        try {
            const response = await fetch(geoJsonUrl);
            const data = await response.json();
            const numberMatched = data.numberMatched ? data.numberMatched : 1000;
            setMaxSliderValue(numberMatched);
            const newSliderValue = Math.min(sliderValue, numberMatched);
            setSliderValue(newSliderValue);
            setInputValue(String(newSliderValue));
            setIsLoaded(true);
        } catch (error) {
            setIsLoaded(true);
            console.error("Error fetching GeoJSON data:", error);
        }
    };

    const handleSliderChange = (value: number) => {
        setSliderValue(value);
        setInputValue(String(value));
        updateGeoJsonHrefWithLimit(value);
        setCopyUrlText("Copy URL");
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        const numericValue = parseInt(value, 10);
        if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= maxSliderValue) {
            setSliderValue(numericValue);
            updateGeoJsonHrefWithLimit(numericValue);
        }
    };

    const handleInputBlur = () => {
        const value = parseInt(inputValue, 10);
        if (isNaN(value) || value < 1) {
            setInputValue(String(1));
            setSliderValue(1);
            updateGeoJsonHrefWithLimit(1);
        } else {
            const newValue = Math.min(value, maxSliderValue);
            setInputValue(String(newValue));
            setSliderValue(newValue);
            updateGeoJsonHrefWithLimit(newValue);
        }
    };

    const updateGeoJsonHrefWithLimit = (limit: number) => {
        if (geoJsonHref && geoJsonHref.includes("/items")) {
            const url = new URL(geoJsonHref);
            url.searchParams.set("limit", limit.toString());
            setUpdatedGeoJsonHref(url.toString());
        }
    };

    const handleCreateTxtFile = () => {
        if (updatedGeoJsonHref) {
            console.log("Final URL:", updatedGeoJsonHref);
            createTxtFile(updatedGeoJsonHref);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>URL Builder</ModalHeader>
                <ModalCloseButton />
                {isLoaded ? <ModalBody>
                    <Box>
                        <p><b>Title:</b> {metadata.title}</p> 
                        <p><b>Description:</b> {metadata.description}</p>
                        <p><b>CRS:</b> {metadata.crs[0].split("/").pop()}</p>
                    </Box>
                    <Box pt={3}>
                        The data is provided as an <b>OGC API Feature service</b>. Move the slider or type in the number of data points that you would like to have in the dataset.
                    </Box>

                    {/* Slider */}
                    <Box mb={4} pt={5}>
                        <Box mt={2} marginBottom={1}>Maximum Value: {maxSliderValue}</Box>
                        {maxSliderValue > 0 ? (
                            <Slider
                                aria-label="slider-ex-1"
                                value={sliderValue}
                                onChange={handleSliderChange}
                                min={1}
                                max={maxSliderValue}
                            >
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        ) : null}
                    </Box>

                    <Box mb={4}>
                        <Box marginBottom={2}>Number of datapoints:</Box>
                        <Input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange} // Immediate input change handling
                            onBlur={handleInputBlur} // Handle blur for final validation
                            max={maxSliderValue}
                            min={1} // Optional minimum value
                        />
                    </Box>

                    {/* Display the updated URL */}
                    {updatedGeoJsonHref && (
                        <Box mb={4} p={2} border="1px solid #ccc" borderRadius="md">
                            <strong>Generated URL:</strong>
                            <Box wordBreak="break-all">{updatedGeoJsonHref}</Box>
                        </Box>
                    )}

                    {/* Action Buttons */}
                    <Box display="flex" justifyContent="space-between" mt={4}>
                        <Button 
                            onClick={handleCreateTxtFile} 
                            isDisabled={!updatedGeoJsonHref} 
                            width="80%" // Set width to 48%
                            mr={2} // Margin to the right
                        >
                            Import to Galaxy
                        </Button>
                        <CopyToClipboardButton 
                            data={updatedGeoJsonHref ? updatedGeoJsonHref : geoJsonHref} 
                            label={copyUrlText} // Use the state for the button text
                        />
                    </Box>
                </ModalBody> 
                    :
                    <ModalBody>
                        <Stack pt={3}>
                            <Box>Loading...</Box>
                            <Skeleton height='30px' />
                            <Skeleton height='30px'/>
                            <Skeleton height='30px'/>
                        </Stack>
                    </ModalBody>
                }
                <ModalFooter>
                    <Button onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
