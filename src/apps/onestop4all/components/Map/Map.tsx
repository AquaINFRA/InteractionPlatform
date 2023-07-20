import { Box } from "@open-pioneer/chakra-integration";
import { MapContainer, MapPadding } from "@open-pioneer/experimental-ol-map";
import { useService } from "open-pioneer:react-hooks";
import { useState } from "react";
import { useAsync } from "react-use";

import { MAP_ID } from "./services";
import { Fill, Stroke, Style, Icon } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import WKT from "ol/format/WKT";

export function Map(props: { geometry: string }) {
    const [viewPadding, setViewPadding] = useState<MapPadding>();
    const { geometry } = props;

    const wkt = new WKT();
    const wktGeometry = wkt.readFeature(geometry);
    wktGeometry.getGeometry()?.transform("EPSG:4326", "EPSG:3857");
    const wktGeometryType = wktGeometry.getGeometry()?.getType();

    const polygonStyle = new Style({
        fill: new Fill({
            color: "rgba(34, 192, 210, 0.2)"
        }),
        stroke: new Stroke({
            color: "#05668D",
            width: 1
        })
    });

    /*const pointStyle = new Style({
        image: new Icon({
            src: ""
        })
    });*/

    switch (wktGeometryType) {
        case "Polygon":
            wktGeometry.setStyle(polygonStyle);
            break;
        case "Point":
            //wktGeometry.setStyle(pointStyle);
            break;
        default:
        //
    }

    const vectorSource = new VectorSource();
    vectorSource.addFeature(wktGeometry);
    const vectorLayer = new VectorLayer({
        source: vectorSource
    });

    const olMapRegistry = useService("ol-map.MapRegistry");
    const mapState = useAsync(async () => await olMapRegistry.getMap(MAP_ID));

    if (mapState.value) {
        const map = mapState.value;
        map.getView().fit(vectorSource.getExtent(), { maxZoom: 13 });
        map.addLayer(vectorLayer);
    }

    //ADD map.zoomToExtent

    return (
        <Box w="100%" h="70vh" overflow="hidden" position="relative" flex="1">
            <MapContainer mapId={MAP_ID} viewPadding={viewPadding} />
        </Box>
    );
}
