import { useState, useMemo } from "react";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Icon, Style } from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import dataNew from "../../../../services/sea_areas_catchments.json";
import { hoverStyle, style, selectStyle } from "./Styles";

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

    const markerSource = useMemo(() => new VectorSource(), []);

    const markerVector = useMemo(() => {
        return new VectorLayer({
            source: markerSource,
            style: new Style({
                image: new Icon({
                    src: "/marker.svg",
                    anchor: [0.5, 1],
                }),
            }),
        });
    }, [markerSource]);

    const vectorLayer = useMemo(() => {
        const geoJSONFormat = new GeoJSON();
        const features = geoJSONFormat.readFeatures(dataNew, {
            featureProjection: "EPSG:3857",
        });

        const source = new VectorSource({ features });

        return new VectorLayer({
            source,
            style: () => {
                style.getFill().setColor("rgba(0,0,0,0)");
                return style;
            },
        });
    }, []);

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

        markerVector,
        vectorLayer
    };
}
