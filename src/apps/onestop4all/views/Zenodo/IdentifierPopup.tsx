import { Box } from "@open-pioneer/chakra-integration";
import React from "react";

interface IdentifierPopupProps {
    identifier: {
        res_type: string;
        identifier: string[];
    } | undefined;
    onClose: () => void;
    renderPopupTitle: (type?: string) => React.ReactNode;
}

export const IdentifierPopup: React.FC<IdentifierPopupProps> = ({ identifier, onClose, renderPopupTitle }) => {
    if (!identifier) return null;

    const renderLabel = (id: string) => {
        if (id.includes("github.com")) return <img src="/github_btn.png" alt="GitHub" style={{ height: "45px" }} />;
        if (id.includes("usegalaxy")) return <img src="/galaxy_btn.png" alt="Galaxy" style={{ height: "35px" }} />;
        if (id.includes("aquainfra.dev")) return <img src="/aqua_btn.png" alt="Aqua" style={{ height: "25px" }} />;
        if (id.includes("zenodo")) return <img src="/zenodo_btn.png" alt="Zenodo" style={{ height: "60px" }} />;
        if (id.includes("aquainfra.ogc")) return <img src="/pygeoapi_btn.png" alt="PyGeoAPI" style={{ height: "45px" }} />;
        if (id.includes("binder")) return <img src="/binder.svg" alt="Binder" style={{ height: "45px" }} />;
        if (id.includes("replay.notebooks"))
            return (
                <div style={{ display: "flex", alignItems: "center", gap: "0px" }}>
                    <img src="/replay2.svg" alt="Replay2" style={{ height: "35px" }} />
                    <img src="/replay.svg" alt="Replay" style={{ height: "45px" }} />
                </div>
            );

        return id.length > 20 ? id.substring(0, 30) + "..." : id;
    };

    return (
        <Box position="fixed" top="0" left="0" right="0" bottom="0" bg="rgba(0, 0, 0, 0.5)" zIndex="10">
            <Box
                bg="white"
                p="20px"
                borderRadius="8px"
                maxWidth="430px"
                margin="auto"
                marginTop="20%"
            >
                {renderPopupTitle(identifier.res_type)}

                {identifier.identifier.map((id, index) => (
                    <Box key={index} mb="10px" display="flex" justifyContent="center">
                        <Box
                            as="button"
                            onClick={() => window.open(id, "_blank")}
                            style={{
                                width: "70%",
                                padding: "10px",
                                backgroundColor: "#5CE65C",
                                color: "black",
                                textAlign: "center",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                maxHeight: "45px",
                                transition: "background-color 0.3s, transform 0.2s",
                            }}
                            onMouseOver={(e: any) => {
                                e.currentTarget.style.backgroundColor = "#BFF4BE";
                                e.currentTarget.style.transform = "scale(1.05)";
                            }}
                            onMouseOut={(e: any) => {
                                e.currentTarget.style.backgroundColor = "#5CE65C";
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >
                            {renderLabel(id)}
                        </Box>
                    </Box>
                ))}

                <Box mt="10px" display="flex" justifyContent="center">
                    <Box
                        as="button"
                        onClick={onClose}
                        style={{
                            width: "70%",
                            padding: "10px",
                            backgroundColor: "#ff6347",
                            color: "white",
                            borderRadius: "5px",
                            textAlign: "center",
                        }}
                    >
                        Close
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
