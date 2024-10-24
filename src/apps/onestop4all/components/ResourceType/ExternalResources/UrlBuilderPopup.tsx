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
import { BBoxMap } from "./BBoxMap";

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
    const [maxValIsLoaded, setMaxValIsLoaded] = useState(true);
    const [metadata, setMetadata] = useState({} as any);
    const [bbox, setBbox] = useState<number[]>([]);

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

    const updateBbox = (newBbox: number[]) => {
        setBbox(newBbox);
        updateGeoJsonHrefWithBbox(newBbox);
        setMaxValIsLoaded(false);
    };

    const fetchUrlBuilderData = async (url: string) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
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
            const numberMatched = data.numberMatched ? data.numberMatched : 111111;
            setMaxSliderValue(numberMatched);
            const newSliderValue = Math.min(sliderValue, numberMatched);
            setSliderValue(newSliderValue);
            setInputValue(String(newSliderValue));
            setIsLoaded(true);
            setMaxValIsLoaded(true);
        } catch (error) {
            setIsLoaded(true);
            setMaxValIsLoaded(true);
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
    };

    const handleInputBlur = () => {
        const value = parseInt(inputValue, 10);
        if (isNaN(value) || value < 1) {
            setInputValue(String(10));
            setSliderValue(10);
            updateGeoJsonHrefWithLimit(10);
        } else {
            const newValue = Math.min(value, maxSliderValue);
            setInputValue(String(newValue));
            setSliderValue(newValue);
            updateGeoJsonHrefWithLimit(newValue);
        }
    };

    const updateGeoJsonHrefWithLimit = (limit: number) => {
        if (geoJsonHref && geoJsonHref.includes("/items")) {
            const url = updatedGeoJsonHref ? new URL(updatedGeoJsonHref) : new URL(geoJsonHref);
            url.searchParams.set("limit", limit.toString());
            setUpdatedGeoJsonHref(url.toString());
        }
    };

    const updateGeoJsonHrefWithBbox = (bbox: number[]) => {
        if (geoJsonHref) {
            const url = updatedGeoJsonHref ? new URL(updatedGeoJsonHref) : new URL(geoJsonHref);
            if (bbox && bbox.length === 4) {
                url.searchParams.set("bbox", bbox.join(","));
            } else {
                url.searchParams.delete("bbox");
            }
            setUpdatedGeoJsonHref(url.toString());
            fetchGeoJsonData(url.toString());
        }
    };

    const handleCreateTxtFile = () => {
        if (updatedGeoJsonHref) {
            handleInputBlur();
            setTimeout(()=>createTxtFile(updatedGeoJsonHref), 500);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside">
            <ModalOverlay />
            <ModalContent width={"40%"} maxW={"700px"} minW={"500px"} maxHeight="90vh" overflow="auto" padding="4">
                <ModalHeader>OGC API Features subsetting</ModalHeader>
                <ModalCloseButton />
                {isLoaded ? <ModalBody>
                    <Box>
                        <p><b>Title:</b> {metadata.title}</p> 
                        <p><b>Description:</b> {metadata.description}</p>
                    </Box>

                    <Box padding={"22px 0px 0px"}>
                        <BBoxMap mapId="ogc" onBboxChange={updateBbox} />
                    </Box>

                    {maxValIsLoaded ? <>
                        <Box mb={4}>
                            <Box mt={2} marginBottom={1}>Maximum number of data points: {maxSliderValue} {maxSliderValue===111111 ? <span>(<b>Note: </b>The maximum value is most likely not correct.)</span> : ""}</Box>
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
                            <Box marginBottom={2}>Selected number of datapoints:</Box>
                            <Input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                onBlur={handleInputBlur}
                                max={maxSliderValue}
                                min={1}
                                autoFocus
                            />
                        </Box>
                    </>
                        :
                        <Box marginBottom={"15"}>
                            <Stack>
                                <Box>Loading...</Box>
                                <Skeleton height='30px' />
                                <Skeleton height='30px'/>
                                <Skeleton height='30px'/>
                            </Stack>
                        </Box>
                    }

                    {updatedGeoJsonHref && (
                        <Box mb={4} p={2} border="1px solid #ccc" borderRadius="md">
                            <strong>Generated URL: </strong>
                            <Button size="xs" w={"fit-content"} paddingLeft={"10px"} paddingRight={"10px"}>Regenerate</Button>
                            <Box wordBreak="break-all">{updatedGeoJsonHref}</Box>
                        </Box>
                    )}

                    <Box display="flex" justifyContent="space-between" mt={4}>
                        <Button 
                            onClick={handleCreateTxtFile} 
                            isDisabled={!updatedGeoJsonHref} 
                            width="80%"
                            mr={2}
                        >
                            Import to Galaxy
                        </Button>
                        <CopyToClipboardButton 
                            data={updatedGeoJsonHref ? updatedGeoJsonHref : geoJsonHref} 
                            label={copyUrlText}
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
