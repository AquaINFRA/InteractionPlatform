import React from "react";
import {
    Box,
    Button,
    IconButton,
    Radio,
    RadioGroup,
    Stack
} from "@open-pioneer/chakra-integration";
import { CloseIcon } from "@chakra-ui/icons";
import { MapContainer } from "@open-pioneer/experimental-ol-map";
import { useEffect } from "react";
import { useService } from "open-pioneer:react-hooks";
import { useState } from "react";
interface PopupOverlayProps {
    showPopup: boolean;
    onClose: () => void;
}

const PopupOverlay: React.FC<PopupOverlayProps> = ({ showPopup, onClose }) => {
    const mapId = "popup";
    const olMapRegistry = useService("ol-map.MapRegistry");
    const [renderState, setRenderState] = useState(false);

    // fixes bug where the map is not displayed if the popup is opened for the second time
    function changeRenderState() {
        if (renderState == true) setRenderState(false);
        else setRenderState(true);
    }
    useEffect(() => {
        if (showPopup) {
            changeRenderState();
        }
    }, [showPopup]);
    //re-renders the map everytime the popup is opened
    useEffect(() => {
        const fetchMap = async () => {
            try {
                const map = await olMapRegistry.getMap(mapId);
                map.render();
            } catch (error) {
                console.error("Fehler beim Abrufen der Karte:", error);
            }
        };
        fetchMap();
    }, [renderState]);

    if (!showPopup) return null;
    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100%"
            backgroundColor="rgba(0, 0, 0, 0.6)"
            zIndex="9999"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            {/* Hier kann der Inhalt des Pop-up-Overlays platziert werden */}
            <Box
                width="60%"
                height="60%"
                backgroundColor="white"
                padding="20px"
                position="relative"
            >
                <Box height="80%" width="100%">
                    <MapContainer mapId="popup" />
                </Box>
                {/* X zum Schließen oben rechts */}
                <IconButton
                    position="absolute"
                    top="10px"
                    right="10px"
                    aria-label="Close"
                    onClick={onClose}
                    icon={<CloseIcon />}
                />
                {/* Radio-Buttons */}
                <RadioGroup defaultValue="default" marginTop="20px">
                    <Stack spacing={5} direction="row">
                        <Radio value="option1">Option 1</Radio>
                        <Radio value="option2">Option 2</Radio>
                        <Radio value="default">Default</Radio>
                    </Stack>
                </RadioGroup>
                <Button onClick={onClose}>Close Popup</Button>
            </Box>
        </Box>
    );
};

export default PopupOverlay;
