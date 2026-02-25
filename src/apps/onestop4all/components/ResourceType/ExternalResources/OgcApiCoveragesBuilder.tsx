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
    Tooltip,
    Icon
} from "@open-pioneer/chakra-integration";
import { useState, useEffect, useRef } from "react";
import { CopyToClipboardButton } from "../ActionButton/CopyToClipboardButton";
import { BBoxMap } from "./BBoxMapCoverages";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { ImportToGalaxyBtn } from "./ImportToGalaxyBtn";
import { Geometry } from "ol/geom";
import { USED_EPSG_CODE } from "../../../views/Search/Facets/SpatialCoverageFacet/SpatialCoverageFacet";

interface OgcApiFeaturesBuilderProps {
    isOpen: boolean;
    onClose: () => void;
    ogc_features_url: string;
}

export const OgcApiCoveragesBuilder = ({ isOpen, onClose, ogc_features_url }: OgcApiFeaturesBuilderProps) => {
    
    const [baseUrl, setBaseUrl] = useState<string>(ogc_features_url);
    const [requestUrl, setRequestUrl] = useState<string | null>(null);
    const sharedUrl = useRef<URL | null>(null);
    
    const [copyUrlText, setCopyUrlText] = useState("Copy URL");
    const [metadata, setMetadata] = useState({} as any);
    const [ogcFeaturesExtent, setOgcFeaturesExtent] = useState<number[]>([]);
    const [crs, setCrs] = useState("");

    useEffect(() => {
        if (isOpen && ogc_features_url) {
            fetchMetadata(ogc_features_url);
        }
    }, [isOpen, ogc_features_url]);

    useEffect(() => {
        if (!isOpen) {
            setRequestUrl(null);
            setCopyUrlText("Copy URL");
        }
    }, [isOpen]);

    const reset = () => {
        setRequestUrl(baseUrl);
        clearSharedUrl();
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
                    link.type === "image/tiff"
                );

                if (geoJsonLink && geoJsonLink.href) {
                    const newHref = geoJsonLink.href;

                    const [baseUrl, queryString] = newHref.split("?");

                    setBaseUrl(baseUrl);
                    setRequestUrl(baseUrl);
                    setCrs(metadata.crs[0].split("/").pop());
                }
            }
        } catch (error) {
            console.error("Error fetching URL Builder data:", error);
        }
    };

    const getOrCreateUrl = (): URL => {
        if (!sharedUrl.current) {
            sharedUrl.current = requestUrl
                ? new URL(requestUrl)
                : new URL(baseUrl);
        }
        return sharedUrl.current;
    };
    
    const requestUrlWithBbox = (bbox: Geometry) => {
        const extent = bbox.getExtent();
        if (baseUrl) {
            const url = getOrCreateUrl();
            if (extent[0] !== Infinity) {
                const dest_crs = "EPSG:" + crs;
                const transformed = bbox.clone().transform(USED_EPSG_CODE, dest_crs);
                const transformedExtent = transformed.getExtent();
                const minX = transformedExtent[0];
                const maxX = transformedExtent[2];
                const minY = transformedExtent[1];
                const maxY = transformedExtent[3];
                const coords = "x(" + minX + ":" + maxX + "),y(" + minY + ":" + maxY + ")";
                url.searchParams.set("subset", coords);
                url.searchParams.set("f", "GTiff");
                setRequestUrl(url.toString());
            } else {
                console.log("delete");
                url.searchParams.delete("subset");
                url.searchParams.delete("f");
                setRequestUrl(url.toString());
            }
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
        <Modal isOpen={isOpen} onClose={closeBuilder} scrollBehavior="outside">
            <ModalOverlay />
            <ModalContent width={"40%"} maxW={"700px"} minW={"500px"} maxHeight="90vh" overflow="auto" padding="1">
                <ModalHeader>
                    OGC API Coverages Subsetting
                    <Tooltip
                        label="In this modal, you can build a URL based on an OGC API Coverages services. You can set a bounding box and then copy the resulting URL or import it to Galaxy."
                        placement="right"
                        hasArrow
                    >
                        <span>
                            <Icon
                                as={QuestionOutlineIcon}
                                boxSize={7}
                                cursor="pointer"
                                color="gray.500"
                                marginLeft={2}
                            />
                        </span>
                    </Tooltip>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <p><b>Title:</b> {metadata.title}</p>
                        <p><b>Description:</b> {metadata.description}</p>
                        <p>
                            <b>Coordinate Reference System (CRS):</b>{" "}
                            <a 
                                href={metadata.crs} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                style={{ color: "#05668d", textDecoration: "underline" }}
                            >
                                {metadata.crs}
                            </a>
                        </p>
                    </Box>

                    <Box padding={"12px 0px 20px"}>
                        <BBoxMap 
                            mapId="ogc" 
                            onBboxChange={requestUrlWithBbox} 
                            ogcFeaturesExtent={ogcFeaturesExtent} 
                            crs={metadata && metadata.crs && metadata.crs[0].split("/").pop()} 
                        />
                    </Box>

                    <Box mb={4} p={2} border="1px solid #ccc" borderRadius="md">
                        <strong>Generated URL: </strong>
                        <Button size="xs" w={"fit-content"} paddingLeft={"10px"} paddingRight={"10px"} marginRight={"10px"}>Regenerate</Button>
                        <Button size="xs" w={"fit-content"} paddingLeft={"10px"} paddingRight={"10px"} onClick={()=>{reset();}}>Reset</Button>
                        <Box wordBreak="break-all">{requestUrl}</Box>
                    </Box>

                    <Box display="flex" gap={3}>
                        {
                            requestUrl && (
                                <>
                                    <ImportToGalaxyBtn 
                                        url={requestUrl} 
                                        disabled={!requestUrl} 
                                    />
                                    <CopyToClipboardButton
                                        data={requestUrl ? requestUrl : baseUrl}
                                        label={copyUrlText}
                                    />
                                </>
                            )
                        }
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={closeBuilder}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
