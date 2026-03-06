import { Geometry, Polygon } from "ol/geom";
import GeoJSON from "ol/format/GeoJSON";
import catchments from "../../../services/sea_areas_catchments.json"; //before: "hydro90m_basins_combined_v2_webmercator_1perc.json";
import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import * as turf from "@turf/turf";
import { transform } from "ol/proj";
import { Coordinate } from "ol/coordinate";

import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { SearchService } from "../../../services";
import { Fill, Stroke, Style } from "ol/style";
import { PrimaryColor } from "../../../Theme";
import CircleStyle from "ol/style/Circle";

export const EPSG_CODE_3857 = "EPSG:3857";
export const EPSG_CODE_4326 = "EPSG:4326";

export function setupProjections() {

    // EPSG:3067 — UTM Finland
    proj4.defs(
        "EPSG:3067",
        "+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs"
    );

    // EPSG:3035 — LAEA Europe
    proj4.defs(
        "EPSG:3035",
        "+proj=laea +lat_0=52 +lon_0=10 +x_0=4321000 +y_0=3210000 +ellps=GRS80 +units=m +no_defs"
    );

    register(proj4);
}

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
                transform(coord, "EPSG:3857", EPSG_CODE_4326)
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
    
    const vectorLayerBBox = CatchmentBboxVectorLayer(vectorSourceBBox);
    
    return {layer: vectorLayerBBox, features:features};
}

export function createCatchmentLayer(coordinates: any, features: Feature<Geometry>[]) {

    const bboxFeatures = readFeatures(coordinates);

    const vectorSourceBBox = new VectorSource({
        features: bboxFeatures
    });

    const vectorLayerBBox = CatchmentBboxVectorLayer(vectorSourceBBox);

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
        featureProjection: EPSG_CODE_4326
    });

    return features;
}

export async function getCatchment(lonLat: number[], searchSrvc: SearchService) {
    
    const response = await searchSrvc.processCatchment(lonLat);

    if (!response?.outputs?.polygon?.href) {
        throw new Error("Invalid catchment response structure");
    }

    const polygonUrl = response.outputs.polygon.href;

    const polygonResponse = await fetch(polygonUrl);

    if (!polygonResponse.ok) {
        throw new Error(`Failed to fetch polygon: ${polygonResponse.status}`);
    }

    const polygonGeoJson = await polygonResponse.json();

    const geoJSONFormat = new GeoJSON();

    const features = geoJSONFormat.readFeatures(polygonGeoJson, {
        featureProjection: EPSG_CODE_3857,
    });

    return features;
};

export const triggerSearch = (
    ref: React.RefObject<VectorSource>
) => {
    if (!ref.current) return;

    const extent3857 = ref.current.getExtent();
    const [minX, minY, maxX, maxY] = extent3857;

    if (
        minX === undefined || minY === undefined ||
        maxX === undefined || maxY === undefined
    ) return;

    const [minLon, minLat] = transform([minX, minY], EPSG_CODE_3857, EPSG_CODE_4326);
    const [maxLon, maxLat] = transform([maxX, maxY], EPSG_CODE_3857, EPSG_CODE_4326);

    const spatialFilter = [minLon, minLat, maxLon, maxLat].join(",");
    console.log(spatialFilter);

    const url = `/search?spatialfilter=${encodeURIComponent(spatialFilter)}`;
    window.open(url, "_blank");
};

export function getBbox(extent: number[], epsg: string) {
    const coords = getPolygonCoords(extent);
    const geoJson = new GeoJSON();
    const features = geoJson.readFeatures(
        { type: "Polygon", coordinates: coords },
        { featureProjection: epsg }
    );
    const layer = CatchmentBboxVectorLayer(
        new VectorSource({
            features: features
        })
    );

    return layer;
}

function getPolygonCoords(extent: number[]) {
    return [[
        [extent[0], extent[1]],
        [extent[2], extent[1]],
        [extent[2], extent[3]],
        [extent[0], extent[3]],
        [extent[0], extent[1]]
    ]];
};

export function DrawnBboxVectorLayer (source: VectorSource) {
    return (
        new VectorLayer({
            source: source,
            style: new Style({
                stroke: new Stroke({
                    color: "black",
                    width: 2
                })
            })
        })
    );
};

export function PointFeatureVectorLayer (source: VectorSource) {
    return (
        new VectorLayer({
            source: source,
            style: new Style({
                image: new CircleStyle({
                    radius: 6,
                    fill: new Fill({ color: "rgba(0,0,0,0)" }),
                    stroke: new Stroke({ color: PrimaryColor, width: 1 })
                })
            })
        })
    );
};

export function CatchmentBboxVectorLayer (source: VectorSource) {
    return (
        new VectorLayer({
            source: source,
            style: new Style({
                stroke: new Stroke({
                    color: "rgba(0, 19, 255, 1)",
                    width: 2,
                    lineDash: [4],
                    lineCap: "square"
                })
            })
        })
    );
};
