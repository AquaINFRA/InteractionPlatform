// SPDX-FileCopyrightText: con terra GmbH and contributors
// SPDX-License-Identifier: Apache-2.0
import { Box } from "@open-pioneer/chakra-integration";
import { MapContainer, MapPadding } from "@open-pioneer/experimental-ol-map";
import { useService } from "open-pioneer:react-hooks";
import { useState } from "react";
import { useAsync } from "react-use";

import { MAP_ID } from "./services";

import { Feature } from "ol";
import { Polygon } from "ol/geom";
import { Fill, Stroke, Style } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

export function Map(props: { bbox: object }) {
    const [viewPadding, setViewPadding] = useState<MapPadding>();
    const bbox = Object.values(props.bbox);

    const polygonGeometry = new Polygon(bbox);
    polygonGeometry.transform("EPSG:4326", "EPSG:3857");
    const polygonFeature = new Feature(polygonGeometry);
    const polygonStyle = new Style({
        fill: new Fill({
            color: "rgba(34, 192, 210, 0.2)"
        }),
        stroke: new Stroke({
            color: "#05668D",
            width: 1
        })
    });

    polygonFeature.setStyle(polygonStyle);
    const vectorSource = new VectorSource();
    vectorSource.addFeature(polygonFeature);
    const vectorLayer = new VectorLayer({
        source: vectorSource
    });

    const olMapRegistry = useService("ol-map.MapRegistry");
    const mapState = useAsync(async () => await olMapRegistry.getMap(MAP_ID));

    if (mapState.value) {
        const map = mapState.value;
        map.getView().fit(vectorSource.getExtent());
        map.addLayer(vectorLayer);
    }

    return (
        <Box w="100%" h="70vh" overflow="hidden" position="relative" flex="1">
            <MapContainer mapId={MAP_ID} viewPadding={viewPadding} />
        </Box>
    );
}
