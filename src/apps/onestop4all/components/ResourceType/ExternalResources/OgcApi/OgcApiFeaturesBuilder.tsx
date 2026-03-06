import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Skeleton,
    Stack
} from "@open-pioneer/chakra-integration";
import { useState, useEffect, useRef } from "react";
import { BBoxMap } from "./BuilderComponents/BBoxMap";
import { DataPointsSelector } from "./BuilderComponents/DataPointSelector";
import { QueryableSelector } from "./BuilderComponents/QueryableSelector";
import { ImportCopy } from "./BuilderComponents/ImportCopy";
import { Note } from "./BuilderComponents/Note";
import { MetaInfo } from "./BuilderComponents/MetaInfo";
import { Geometry } from "ol/geom";
import { GenerateUrl } from "./BuilderComponents/GenerateUrl";

interface OgcApiFeaturesBuilderProps {
    isOpen: boolean;
    onClose: () => void;
    ogc_features_url: string;
}

export const OgcApiFeaturesBuilder = ({ isOpen, onClose, ogc_features_url }: OgcApiFeaturesBuilderProps) => {
    const [sliderValue, setSliderValue] = useState(10);
    const [maxSliderValue, setMaxSliderValue] = useState(0);
    
    const [baseUrl, setBaseUrl] = useState<string>(ogc_features_url);
    const [requestUrl, setRequestUrl] = useState<string | null>(null);
    const sharedUrl = useRef<URL | null>(null);
    
    const [queryablesArray, setQueryablesArray] = useState<{ title: string; type: string }[]>([]);
    const [selectedQueryable, setSelectedQueryable] = useState<string | null>(null);
    const [queryableValue, setQueryableValue] = useState<string>("");
    const [maxValIsLoaded, setMaxValIsLoaded] = useState(true);
    
    const [copyUrlText, setCopyUrlText] = useState("Copy URL");
    const [metadata, setMetadata] = useState({} as any);
    const [ogcFeaturesExtent, setOgcFeaturesExtent] = useState<number[]>([]);
    const [resetBboxFlag, setResetBboxFlag] = useState(false);

    useEffect(() => {
        if (isOpen && ogc_features_url) {
            fetchMetadata(ogc_features_url);
            fetchQueryables(ogc_features_url);
        }
    }, [isOpen, ogc_features_url]);

    useEffect(() => {
        if (!isOpen) {
            setSliderValue(10);
            setQueryableValue("");
            setMaxSliderValue(100);
            setRequestUrl(null);
            setCopyUrlText("Copy URL");
        }
    }, [isOpen]);

    const reset = () => {
        setRequestUrl(baseUrl);
        generateSliderMaxValue(baseUrl);
        setSliderValue(10);
        setQueryableValue("");
        setSelectedQueryable(null);
        clearSharedUrl();
        setResetBboxFlag(true);
    };

    const fetchMetadata = async (url: string) => {
        try {
            const response = await fetch(url);
            const metadata = await response.json();
            setMetadata(metadata);

            if (metadata.extent.spatial.bbox) {
                setOgcFeaturesExtent(metadata.extent.spatial.bbox[0]);
            }
            if (metadata.links && Array.isArray(metadata.links)) {
                const geoJsonLink = metadata.links.find((link: any) =>
                    link.type === "application/geo+json" &&
                    link.rel === "items" &&
                    link.title === "items as GeoJSON"
                );

                if (geoJsonLink && geoJsonLink.href) {
                    const initialLimit = 10;
                    const newHref = `${geoJsonLink.href}&limit=${initialLimit}`;
                    setBaseUrl(newHref);
                    setRequestUrl(newHref);
                    generateSliderMaxValue(newHref);
                }
            }
        } catch (error) {
            console.error("Error fetching URL Builder data:", error);
        }
    };

    const fetchQueryables = async (url: string) => {
        try {
            const queryables = await fetch(url.split("?")[0] + "/queryables?f=json");
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
        } catch (error) {
            console.error("Error fetching URL Builder data:", error);
        }
    };

    const generateSliderMaxValue = async (url: string) => {
        try {
            const response = await fetch(url);
            const responseData = await response.json();
            const numberMatched = responseData.numberMatched ? responseData.numberMatched : 111111;
            setMaxSliderValue(numberMatched);

            const defaultLimit = 10;
            const newSliderValue = Math.min(defaultLimit, numberMatched);

            setSliderValue(newSliderValue);
            setMaxValIsLoaded(true);
        } catch (error) {
            setMaxValIsLoaded(true);
            console.error("Error fetching GeoJSON data:", error);
        }
    };

    const handleSliderChange = (value: number) => {
        setSliderValue(value);
    };

    const handleSliderEnd = (value: number) => {
        setSliderValue(value);
        requestUrlWithLimit(value);
        setCopyUrlText("Copy URL");
    };

    const handleInputBlur = () => {
        const value = parseInt(String(sliderValue), 10);
        if (isNaN(value) || value < 1) {
            setSliderValue(10);
            requestUrlWithLimit(10);
        } else {
            const newValue = Math.min(value, maxSliderValue);
            setSliderValue(newValue);
            requestUrlWithLimit(newValue);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSliderValue(Number(value));
    };

    const updateBbox = (newBbox: Geometry) => {
        requestUrlWithBbox(newBbox);
        requestUrlWithLimit(10);
        setMaxValIsLoaded(false);
        setResetBboxFlag(false);
    };

    const getOrCreateUrl = (): URL => {
        if (!sharedUrl.current) {
            sharedUrl.current = requestUrl
                ? new URL(requestUrl)
                : new URL(baseUrl);
        }
        return sharedUrl.current;
    };
    
    const requestUrlWithQueryables = () => {
        if (selectedQueryable && queryableValue) {
            const url = getOrCreateUrl();
            url.searchParams.set(selectedQueryable, queryableValue);
            setRequestUrl(url.toString());
            generateSliderMaxValue(url.toString());
        }
    };
    
    const requestUrlWithLimit = (limit: number) => {
        if (baseUrl && baseUrl.includes("/items")) {
            const url = getOrCreateUrl();
            url.searchParams.set("limit", limit.toString());
            setRequestUrl(url.toString());
        }
    };
    
    const requestUrlWithBbox = (feature: Geometry) => {
        if (baseUrl) {
            const url = getOrCreateUrl();
            const extent = feature.getExtent();

            if (extent[0] !== Infinity) {
                url.searchParams.set("bbox", extent.join(","));
            } else {
                url.searchParams.delete("bbox");

                // reset slider + limit when bbox deleted
                const defaultLimit = 10;
                url.searchParams.set("limit", defaultLimit.toString());
                setSliderValue(defaultLimit);
            }

            setRequestUrl(url.toString());
            generateSliderMaxValue(url.toString());
        }
    };
    
    const clearSharedUrl = () => {
        sharedUrl.current = null;
    };

    const closeBuilder = () => {
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={closeBuilder} scrollBehavior="outside" key={isOpen ? "open" : "closed"}>
            <ModalOverlay />
            <ModalContent maxW="50vw" maxHeight="90vh" overflow="auto" padding="1">
                <ModalHeader>
                    OGC API Features Subsetting
                    <Note 
                        label="In this modal, you can build a URL based on an OGC API Features services. You can limit the number of data points, set a bounding box, or query single attributes. You can then copy the resulting URL or import it to Galaxy."
                    />
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody overflowY="auto">
                    <MetaInfo 
                        title={metadata.title}
                        description={metadata.description}
                        crs={metadata.crs}
                    />

                    <Box padding={"12px 0px 5px"}>
                        <BBoxMap 
                            mapId="ogc" 
                            onBboxChange={updateBbox} 
                            ogcFeaturesExtent={ogcFeaturesExtent}
                            features={requestUrl}
                            delBbox={resetBboxFlag}
                            isOpen={isOpen}
                        />
                    </Box>

                    {maxValIsLoaded ? (
                        <DataPointsSelector
                            maxSliderValue={maxSliderValue}
                            sliderValue={sliderValue}
                            inputValue={String(sliderValue)}
                            onSliderChange={handleSliderChange}
                            onSliderChangeEnd={handleSliderEnd}
                            onInputChange={handleInputChange}
                            onInputBlur={handleInputBlur}
                        />
                    ) : (
                        <Box marginBottom={"15"}>
                            <Stack>
                                <Box>Loading...</Box>
                                <Skeleton height='15px' />
                            </Stack>
                        </Box>
                    )}
                    
                    {queryablesArray.length > 0 &&
                        <Box padding={"0px 0px 20px"}>
                            <QueryableSelector
                                queryablesArray={queryablesArray}
                                onApply={requestUrlWithQueryables}
                                selectedQueryable={selectedQueryable}
                                setSelectedQueryable={setSelectedQueryable}
                                queryableValue={queryableValue}
                                setQueryableValue={setQueryableValue}
                            />
                        </Box>
                    }

                    <Box mb={4} p={1} border="1px solid #ccc" borderRadius="md">
                        <GenerateUrl 
                            fun={()=>{reset();}}
                            url={requestUrl ?? undefined}
                        />
                    </Box>

                    <ImportCopy 
                        url={requestUrl ? requestUrl : baseUrl}
                        text={copyUrlText}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
