import { Polygon, Geometry } from "ol/geom";
import GeoJSON from "ol/format/GeoJSON";
import { transformExtent } from "ol/proj";
import { intersects } from "ol/extent";
import dataNew from "../../../../services/hydro90m_basins_combined_v2_webmercator_1perc.json";
import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { bBoxStyle } from "./Styles";

/**
 * Checks if any feature in the dataset intersects with the given bounding box.
 * @param bboxCoords - The bounding box coordinates in [lon, lat] format (EPSG:4326).
 * @returns Array of intersecting features.
 */
export function intersectsBBox(bboxCoords: number[][]) {
    const bboxPolygon = new Polygon([bboxCoords]);
    const bboxExtent = bboxPolygon.getExtent();
    const geoJsonFormat = new GeoJSON();
    const features = geoJsonFormat.readFeatures(dataNew, {
        featureProjection: "EPSG:4326" // Ensure features are in EPSG:4326
    });

    return features.filter((feature) => {
        const featureGeometry = feature.getGeometry();
        if (!featureGeometry) return false;

        const featureExtent = featureGeometry.getExtent();
        const transformedFeatureExtent = transformExtent(featureExtent, "EPSG:3857", "EPSG:4326");

        return intersects(bboxExtent, transformedFeatureExtent);
    });
}

export function computeBBox(features: Feature<Geometry>[]) {
    let extentArrays = [] as number[];
    features.forEach((area: any) => {
        extentArrays = extentArrays.concat(area.getGeometry().getExtent());
    });

    const xCoordinates = extentArrays.filter((_: any, index: any) => index % 2 === 0); // Even indices
    const yCoordinates = extentArrays.filter((_: any, index: any) => index % 2 !== 0); // Odd indices
    const minX = Math.min(...xCoordinates);
    const maxX = Math.max(...xCoordinates);
    const minY = Math.min(...yCoordinates);
    const maxY = Math.max(...yCoordinates);
    const bbox = [
        [minX, minY],
        [minX, maxY],
        [maxX, maxY],
        [maxX, minY],
        [minX, minY]
    ];
    return bbox;
}

export function createBboxLayer(coordinates: number[][]) {
    
    const features = readFeatures(coordinates);
    
    const vectorSourceBBox = new VectorSource({
        features: features
    });
    
    const vectorLayerBBox = new VectorLayer({
        source: vectorSourceBBox,
        style: bBoxStyle
    });
    
    return {layer: vectorLayerBBox, features:features};
}

export function createCatchmentLayer(coordinates: any, features: Feature<Geometry>[]) {

    const bboxFeatures = readFeatures(coordinates);

    const vectorSourceBBox = new VectorSource({
        features: bboxFeatures
    });

    const vectorLayerBBox = new VectorLayer({
        source: vectorSourceBBox,
        style: bBoxStyle
    });

    const catchmentSource = new VectorSource({
        features: features
    });

    const catchmentLayer = new VectorLayer({
        source: catchmentSource
    });

    return {
        catchmentSource: catchmentSource,
        vectorSourceBBox: vectorSourceBBox,
        catchmentLayer: catchmentLayer,
        vectorLayerBBox: vectorLayerBBox,
        bboxFeatures:bboxFeatures
    };
}

function readFeatures (coordinates: any) {
    
    const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
            type: "Polygon",
            coordinates: [coordinates] // Wrap coordinates in an array to represent a polygon
        }
    };

    const geoJSONFormat = new GeoJSON();

    const features = geoJSONFormat.readFeatures(geojson, {
        featureProjection: "EPSG:4326"
    });

    return features;
}