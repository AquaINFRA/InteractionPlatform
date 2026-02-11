import { useState } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";

export function useCatchmentMap(
    _map: any,
    selectedOption: string,
    searchSrvc: any,
    searchState: any
) {
    const [bboxActive, setBboxActive] = useState(false);
    const [tooltipContent, setTooltipContent] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [markerLonLat, setMarkerLonLat] = useState<number[]>();
    const [bBox, setBBox] = useState<Feature<any>[]>();
    const [bBoxVectorLayer, setBBoxVectorLayer] = useState(new VectorLayer());
    const [catchmentSource, setCatchmentSource] = useState(new VectorSource());
    const [catchmentBBoxSource, setCatchmentBBoxSource] = useState(new VectorSource());

    return {
        bboxActive,
        tooltipContent,
        showErrorMessage,
        loading,
        markerLonLat,
        bBox,
        bBoxVectorLayer,
        catchmentSource,
        catchmentBBoxSource,

        setBboxActive,
        setTooltipContent,
        setShowErrorMessage,
        setLoading,
        setMarkerLonLat,
        setBBox,
        setBBoxVectorLayer,
        setCatchmentSource,
        setCatchmentBBoxSource,
    };
}
