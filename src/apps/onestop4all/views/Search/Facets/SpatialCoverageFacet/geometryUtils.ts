import { Geometry, Polygon } from "ol/geom";
import GeoJSON from "ol/format/GeoJSON";
import catchments from "../../../../services/sea_areas_catchments.json"; //before: "hydro90m_basins_combined_v2_webmercator_1perc.json";
import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { bBoxStyle } from "./Styles";
import * as turf from "@turf/turf";
import { transform } from "ol/proj";
import { Coordinate } from "ol/coordinate";
import { USED_EPSG_CODE } from "./SpatialCoverageFacet";

export function intersectsBBox(bboxCoords: number[][]) {
    const geoJson = new GeoJSON();

    const bbox = turf.polygon([bboxCoords]);
    
    const catchmentsAreas = geoJson.readFeatures(catchments, {
        featureProjection: "EPSG:3857"
    });

    return catchmentsAreas.filter((catchmentsArea) => {
        const geometry = catchmentsArea.getGeometry() as Polygon;
        const coords = geometry.getCoordinates() as Coordinate[][];
        
        if (!geometry || !coords) return false;

        return coords.some((poly: any) => {
            const transformedCoords = poly[0].map((coord: Coordinate) =>
                transform(coord, "EPSG:3857", USED_EPSG_CODE)
            );
            const polygon = turf.polygon([transformedCoords]);
            return turf.intersect(turf.featureCollection([bbox, polygon]));
        });
    });
}

export function computeBBox(features: Feature<Geometry>[]) {
    let extentArrays = [] as number[];
    features.forEach((area: any) => {
        extentArrays = extentArrays.concat(area.getGeometry().getExtent());
    });

    const xCoordinates = extentArrays.filter((_: any, index: any) => index % 2 === 0);
    const yCoordinates = extentArrays.filter((_: any, index: any) => index % 2 !== 0);
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
            coordinates: [coordinates]
        }
    };

    const geoJSONFormat = new GeoJSON();

    const features = geoJSONFormat.readFeatures(geojson, {
        featureProjection: USED_EPSG_CODE
    });

    return features;
}