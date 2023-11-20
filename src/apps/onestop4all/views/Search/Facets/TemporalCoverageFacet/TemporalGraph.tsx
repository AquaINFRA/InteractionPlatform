import { LinearGradient } from "@visx/gradient";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { scaleBand, scaleLinear } from "@visx/scale";
import { Bar, Circle } from "@visx/shape";
import { useMemo } from "react";

import { TemporalFacet } from "../../../../services/SearchService";
import { ActiveControlColor, PrimaryColor } from "../../../../Theme";

const verticalMargin = 10;

const getYear = (d: TemporalFacet) => d.dateStr;
const getValue = (d: TemporalFacet) => d.count;

export type BarsProps = {
    width: number;
    height: number;
    facets: TemporalFacet[];
    selected: (selectedEntry: TemporalFacet) => void;
};

export default function TemporalGraph({ width, height, facets, selected }: BarsProps) {
    const xMax = width;
    const yMax = height - verticalMargin;

    const xScale = useMemo(
        () =>
            scaleBand<string>({
                range: [0, xMax],
                round: true,
                domain: facets.map(getYear),
                padding: 0.4
            }),
        [xMax, facets]
    );
    const yScale = useMemo(
        () =>
            scaleLinear<number>({
                range: [yMax, 0],
                round: true,
                domain: [0, Math.max(...facets.map(getValue)) || 1]
            }),
        [yMax, facets]
    );

    return width < 10 ? null : (
        <svg width={width} height={height}>
            <LinearGradient
                id="bar-gradient"
                from={PrimaryColor}
                to={ActiveControlColor}
                toOpacity={0.6}
            />
            <Group top={verticalMargin / 2}>
                <GridRows
                    scale={yScale}
                    width={xMax}
                    height={yMax}
                    stroke={ActiveControlColor}
                    numTicks={4}
                    opacity={0.5}
                />
                {facets.map((d) => {
                    const year = getYear(d);
                    // const barWidth = xScale.bandwidth();
                    const barWidth = 3;
                    const barHeight = yMax - (yScale(getValue(d)) ?? 0);
                    const barX = xScale(year);
                    const barY = yMax - barHeight;
                    return (
                        <Group
                            key={`bar-${year}`}
                            onClick={() => {
                                selected(d);
                            }}
                        >
                            <Bar
                                x={barX}
                                y={barY}
                                width={barWidth}
                                height={barHeight}
                                fill="url(#bar-gradient)"
                            />
                            {barX && getValue(d) !== 0 && (
                                <Circle cx={barX + 1.5} cy={barY} r={5} fill={PrimaryColor} />
                            )}
                        </Group>
                    );
                })}
            </Group>
        </svg>
    );
}
