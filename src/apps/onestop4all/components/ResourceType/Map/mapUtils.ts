import proj4 from "proj4";
import { register } from "ol/proj/proj4";

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