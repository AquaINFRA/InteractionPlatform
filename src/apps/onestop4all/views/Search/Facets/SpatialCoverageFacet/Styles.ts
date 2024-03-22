import { Fill, Stroke, Style } from "ol/style.js";

export const lineBlue = "rgba(0, 176, 255, 0.8)";

export const hoverStyle = new Style({
    fill: new Fill({
        color: "rgba(0, 0, 255, 0.2)"
    }),
    stroke: new Stroke({
        color: lineBlue,
        width: 2
    })
});

export const style = new Style({
    fill: new Fill({
        color: "#eeeeee"
    }),
    stroke: new Stroke({
        color: lineBlue,
        width: 1
    })
});
