import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Skeleton,
    Select,
    Input,
    Stack
} from "@open-pioneer/chakra-integration";
import { useState, useEffect, useRef } from "react";
import { CopyToClipboardButton } from "../ActionButton/CopyToClipboardButton";
import { BBoxMap } from "./BBoxMap";
import DataPointsSelector from "./DataPointSelector";

interface UrlBuilderPopupProps {
    isOpen: boolean;
    onClose: () => void;
    href: string;
    createTxtFile: (url: string) => void;
}

export const UrlBuilderPopup = ({ isOpen, onClose, href, createTxtFile }: UrlBuilderPopupProps) => {
    const [sliderValue, setSliderValue] = useState(10);
    const [inputValue, setInputValue] = useState("10");
    //const [maxSliderValue, setMaxSliderValue] = useState(0);
    const [geoJsonHref, setGeoJsonHref] = useState<string>(href);
    const [updatedGeoJsonHref, setUpdatedGeoJsonHref] = useState<string | null>(null);
    const [queryablesArray, setQueryablesArray] = useState<{ title: string; type: string }[]>([]);
    const [selectedQueryable, setSelectedQueryable] = useState<string | null>(null);
    const [queryableValue, setQueryableValue] = useState<string>("");
    const [copyUrlText, setCopyUrlText] = useState("Copy URL");
    const [isLoaded, setIsLoaded] = useState(false);
    const [maxValIsLoaded, setMaxValIsLoaded] = useState(true);
    const [metadata, setMetadata] = useState({} as any);
    const [bbox, setBbox] = useState<number[]>([]);
    const [ogcFeaturesExtent, setOgcFeaturesExtent] = useState<number[]>([]);

    useEffect(() => {
        if (isOpen && href) {
            fetchUrlBuilderData(href);
        }
    }, [isOpen, href]);

    useEffect(() => {
        if (!isOpen) {
            setSliderValue(10);
            setQueryableValue("");
            setInputValue("10");
            //setMaxSliderValue(100);
            setUpdatedGeoJsonHref(null);
            setCopyUrlText("Copy URL");
            setIsLoaded(false);
        }
    }, [isOpen]);

    const reset = () => {
        const url = getOrCreateUrl();
        const params = [...url.searchParams.keys()];
        params.slice(2).forEach((key) => url.searchParams.delete(key));
        setUpdatedGeoJsonHref(geoJsonHref);
        //setSliderValue(10);
        setQueryableValue("");
        setSelectedQueryable(null);
        setInputValue("10");
        clearSharedUrl();
    };

    const fetchUrlBuilderData = async (url: string) => {
        try {
            const response = await fetch(url);
            const queryables = await fetch(url.split("?")[0] + "/queryables?f=json");
            const data = await response.json();
            setMetadata(data);

            const queryablesData = await queryables.json();
            const queryablesArray: { title: string; type: string }[] = [];
            if (queryablesData.properties && typeof queryablesData.properties === "object") {
                for (const key in queryablesData.properties) {
                    if (queryablesData.properties[key].title && queryablesData.properties[key].type) {
                        queryablesArray.push({
                            title: queryablesData.properties[key].title,
                            type: queryablesData.properties[key].type,
                        });
                    }
                }
            }
            setQueryablesArray(queryablesArray);

            if (data.extent.spatial.bbox) {
                setOgcFeaturesExtent(data.extent.spatial.bbox[0]);
            }
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
                    //fetchGeoJsonData(newHref);
                }
            }
        } catch (error) {
            console.error("Error fetching URL Builder data:", error);
        }
    };

    /*const fetchGeoJsonData = async (geoJsonUrl: string) => {
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
    };*/

    const handleQueryableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedQueryable(e.target.value);
    };

    const handleQueryableValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryableValue(e.target.value);
    };

    const updateBbox = (newBbox: number[]) => {
        setBbox(newBbox);
        updateGeoJsonHrefWithBbox(newBbox);
        setMaxValIsLoaded(false);
    };

    /*const handleSliderChange = (value: number) => {
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
    };*/

    const sharedUrl = useRef<URL | null>(null);

    const getOrCreateUrl = (): URL => {
        if (!sharedUrl.current) {
            sharedUrl.current = updatedGeoJsonHref
                ? new URL(updatedGeoJsonHref)
                : new URL(geoJsonHref);
        }
        return sharedUrl.current;
    };
    
    const updateGeoJsonHrefWithQueryable = () => {
        if (selectedQueryable && queryableValue) {
            const url = getOrCreateUrl();
            url.searchParams.set(selectedQueryable, queryableValue);
            setUpdatedGeoJsonHref(url.toString());
        }
    };
    
    /*const updateGeoJsonHrefWithLimit = (limit: number) => {
        if (geoJsonHref && geoJsonHref.includes("/items")) {
            const url = getOrCreateUrl();
            url.searchParams.set("limit", limit.toString());
            setUpdatedGeoJsonHref(url.toString());
        }
    };*/
    
    const updateGeoJsonHrefWithBbox = (bbox: number[]) => {
        if (geoJsonHref) {
            const url = getOrCreateUrl();
            if (bbox && bbox.length === 4) {
                url.searchParams.set("bbox", bbox.join(","));
            } else {
                url.searchParams.delete("bbox");
            }
            console.log(url);
            setUpdatedGeoJsonHref(url.toString());
            //fetchGeoJsonData(url.toString());
        }
    };
    
    const clearSharedUrl = () => {
        sharedUrl.current = null;
    };  

    const handleCreateTxtFile = () => {
        if (updatedGeoJsonHref) {
            updateGeoJsonHrefWithQueryable();
            setTimeout(() => createTxtFile(updatedGeoJsonHref), 500);
        }
    };

    const closeBuilder = () => {
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={closeBuilder} scrollBehavior="outside">
            <ModalOverlay />
            <ModalContent width={"40%"} maxW={"700px"} minW={"500px"} maxHeight="90vh" overflow="auto" padding="4">
                <ModalHeader>OGC API Features Subsetting</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <p><b>Title:</b> {metadata.title}</p>
                        <p><b>Description:</b> {metadata.description}</p>
                    </Box>

                    <Box padding={"22px 0px 0px"}>
                        <BBoxMap mapId="ogc" onBboxChange={updateBbox} ogcFeaturesExtent={ogcFeaturesExtent} />
                    </Box>

                    {/*maxValIsLoaded ? <DataPointsSelector
                        maxSliderValue={maxSliderValue}
                        sliderValue={sliderValue}
                        inputValue={inputValue}
                        onSliderChange={handleSliderChange}
                        onInputChange={handleInputChange}
                        onInputBlur={handleInputBlur}
                    />
                        :
                        <Box marginBottom={"15"}>
                            <Stack>
                                <Box>Loading...</Box>
                                <Skeleton height='30px' />
                                <Skeleton height='30px'/>
                                <Skeleton height='30px'/>
                            </Stack>
                        </Box>
                    */}

                    <Box mt={4}>
                        <Select
                            placeholder="Select Queryable"
                            value={selectedQueryable || ""}
                            onChange={handleQueryableChange}
                        >
                            {queryablesArray.map((queryable, index) => (
                                <option key={index} value={queryable.title}>
                                    {queryable.title} ({queryable.type})
                                </option>
                            ))}
                        </Select>
                        <Input
                            mt={2}
                            placeholder="Enter value for queryable"
                            value={queryableValue}
                            onChange={handleQueryableValueChange}
                        />
                        <Button
                            mt={2}
                            onClick={updateGeoJsonHrefWithQueryable}
                            isDisabled={!selectedQueryable || !queryableValue}
                            marginBottom={2}
                        >
                            Apply Queryable
                        </Button>
                    </Box>

                    <Box mb={4} p={2} border="1px solid #ccc" borderRadius="md">
                        <strong>Generated URL: </strong>
                        <Button size="xs" w={"fit-content"} paddingLeft={"10px"} paddingRight={"10px"} marginRight={"10px"}>Regenerate</Button>
                        <Button size="xs" w={"fit-content"} paddingLeft={"10px"} paddingRight={"10px"} onClick={()=>{reset();}}>Reset</Button>
                        <Box wordBreak="break-all">{updatedGeoJsonHref}</Box>
                    </Box>

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
                <ModalFooter>
                    <Button onClick={closeBuilder}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
