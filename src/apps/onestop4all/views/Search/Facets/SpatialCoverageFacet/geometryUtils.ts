import { Geometry, Polygon } from "ol/geom";
import GeoJSON from "ol/format/GeoJSON";
//import dataNew from "../../../../services/hydro90m_basins_combined_v2_webmercator_1perc.json";
import dataNew from "../../../../services/sea_areas_catchments.json";
import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { bBoxStyle } from "./Styles";
import * as turf from "@turf/turf";
import { transform } from "ol/proj";
import { Coordinate } from "ol/coordinate";

/**
 * Checks if any feature in the dataset intersects with the given bounding box.
 * @param bboxCoords - The bounding box coordinates in [lon, lat] format (EPSG:4326).
 * @returns Array of intersecting features.
 */
export function intersectsBBox(bboxCoords: number[][]) {
    const geoJsonFormat = new GeoJSON();
    const bboxPolygon = turf.polygon([bboxCoords]);
    const features = geoJsonFormat.readFeatures(dataNew, {
        featureProjection: "EPSG:4326", // Ensure features are in EPSG:4326
    });

    return features.filter((feature) => {
        const featureGeometry = feature.getGeometry() as Polygon;
        const featureCoords = featureGeometry.getCoordinates() as Coordinate[][];
        if (!featureGeometry || !featureCoords || !featureCoords[0]) return;
        if (featureGeometry.getType() === "MultiPolygon") {
            return featureCoords.some((poly: any) => {
                const transformedCoords = poly[0].map((coord: Coordinate) =>
                    transform(coord, "EPSG:3857", "EPSG:4326")
                );
                const polygon = turf.polygon([transformedCoords]);
                return turf.intersect(turf.featureCollection([bboxPolygon, polygon]));
            });
        } else {
            const poly = featureCoords[0];
            const transformedCoords = poly.map((coord: Coordinate) =>
                transform(coord, "EPSG:3857", "EPSG:4326")
            );
            const polygon = turf.polygon([transformedCoords]);    
            return turf.intersect(turf.featureCollection([bboxPolygon, polygon]));
        }
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