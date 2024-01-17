import React from "react";
import { Box } from "@open-pioneer/chakra-integration";
import { MapContainer, MapPadding } from "@open-pioneer/experimental-ol-map";
import { useService } from "open-pioneer:react-hooks";
import { useState, useEffect } from "react";
import { useAsync } from "react-use";

import { MAP_ID } from "./services";
import { Fill, Stroke, Style, Icon } from "ol/style";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Feature } from "ol";
import { ResourceGeometry } from "../../../views/Dataset/Dataset";
import { Geometry } from "ol/geom";

export function Map(props: { geometry: ResourceGeometry }) {
    const [viewPadding, setViewPadding] = useState<MapPadding>();
    const { geometry } = props;
    const height = "45vh";

    const geoJSONFormat = new GeoJSON();
    const features = geoJSONFormat.readFeatures(geometry, {
        featureProjection: "EPSG:3857"
    });

    const vectorSource = new VectorSource({
        features: features
    });

    const vectorLayer = new VectorLayer({
        source: vectorSource
    });

    const olMapRegistry = useService("ol-map.MapRegistry");
    const mapState = useAsync(async () => await olMapRegistry.getMap(MAP_ID));

    useEffect(() => {
        if (mapState.value) {
            const map = mapState.value;
            map.getLayers().forEach((layer) => {
                if (layer instanceof VectorLayer) {
                    map.removeLayer(layer);
                }
            });
            map.addLayer(vectorLayer);
            map.getView().fit(vectorSource.getExtent(), { maxZoom: 4 });
        }
    }, [mapState.value, vectorLayer]);

    // const createWktGeometry = (geometry: string) => {
    //     const wkt = new WKT();
    //     const wktGeometry = wkt.readFeature(geometry);
    //     wktGeometry.getGeometry()?.transform("EPSG:4326", "EPSG:3857");
    //     wktGeometry.setStyle(getStyle(wktGeometry));

    //     return wktGeometry;
    // };

    const getStyle = (wkt: Feature<Geometry>) => {
        const wktGeometryType = wkt.getGeometry()?.getType();
        const polygonStyle = new Style({
            fill: new Fill({
                color: "rgba(34, 192, 210, 0.2)"
            }),
            stroke: new Stroke({
                color: "#05668D",
                width: 1
            })
        });

        const pointStyle = new Style({
            image: new Icon({
                src: "/marker.svg"
            })
        });

        switch (wktGeometryType) {
            case "Polygon":
                return polygonStyle;
            case "Point":
                return pointStyle;
            default:
                return null;
        }
    };

    return (
        <Box w="100%" h={height} overflow="hidden" position="relative" flex="1">
            <MapContainer mapId={MAP_ID} viewPadding={viewPadding} />
        </Box>
    );
}
