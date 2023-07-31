import { Box, usePrevious } from "@open-pioneer/chakra-integration";
import { Group } from "@visx/group";
import { Graph } from "@visx/network";
import { DefaultNode, Link, LinkProvidedProps, NodeProvidedProps } from "@visx/network/lib/types";
import { Simulation } from "d3";
import {
    forceCenter,
    forceLink,
    forceManyBody,
    forceSimulation,
    SimulationLinkDatum
} from "d3-force";
import { useEffect, useReducer, useRef } from "react";

import { PrimaryColor } from "../../Theme";
import { ResourceType } from "../../views/Start/ResourceEntry/ResourceEntry";
import { ResourceIcon } from "../../views/Start/ResourceEntry/ResourceIcons";

interface NetworkGraphProps {
    width: number;
    height: number;
}

interface NetworkNode {
    id: string;
    label: string;
    type: ResourceType;
    x?: number;
    y?: number;
    fx?: number;
    fy?: number;
}

interface NetworkLink {
    source: NetworkNode;
    target: NetworkNode;
}

const nodes: NetworkNode[] = [
    {
        id: "1",
        label: "inputfield",
        type: ResourceType.Articles,
        fx: 450,
        fy: 50
    },
    {
        id: "3",
        label: "World Settlement Footprint (WSF)",
        type: ResourceType.Tools,
        fx: 200,
        fy: 200
    },
    {
        id: "2",
        label: "Monitor der Siedlungs- und Freiraumentwicklung",
        type: ResourceType.Repos,
        fx: 700,
        fy: 200
    },
    {
        id: "4",
        label: "World Settlement Footprint (WSF) 2019 - Sentinel-1/2 – Global",
        type: ResourceType.Datasets,
        fx: 500,
        fy: 200
    },
    {
        id: "5",
        label: "IÖR Monitor WMS",
        type: ResourceType.Services,
        fx: 900,
        fy: 350
    },
    {
        id: "6",
        label: "World Settlement Footprint (WSF) 2015 v2 - Landsat-8/Sentinel-1 – Global",
        type: ResourceType.Datasets,
        fx: 300,
        fy: 350
    },
    {
        id: "7",
        label: "EOC Catalogue",
        type: ResourceType.Services,
        fx: 500,
        fy: 350
    },
    {
        id: "8",
        label: "BKG-MIS",
        type: ResourceType.Services,
        fx: 400,
        fy: 450
    },
    {
        id: "9",
        label: "OGC Catalogue Service",
        type: ResourceType.Standards,
        fx: 600,
        fy: 450
    },
    {
        id: "10",
        label: "OGC Web Map Service",
        type: ResourceType.Standards,
        fx: 1000,
        fy: 400
    }
];

const links: NetworkLink[] = [
    { source: nodes[0]!, target: nodes[1]! },
    { source: nodes[0]!, target: nodes[2]! },
    { source: nodes[0]!, target: nodes[3]! },
    { source: nodes[2]!, target: nodes[4]! },
    { source: nodes[4]!, target: nodes[9]! },
    { source: nodes[3]!, target: nodes[5]! },
    { source: nodes[3]!, target: nodes[6]! },
    { source: nodes[6]!, target: nodes[7]! },
    { source: nodes[6]!, target: nodes[8]! },
    { source: nodes[7]!, target: nodes[8]! }
];

const LinkNode = (props: LinkProvidedProps<Link<DefaultNode>>) => {
    const { link } = props;
    const dx = link.target.x - link.source.x;
    const dy = link.target.y - link.source.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const gx = Math.cos(Math.atan2(dy, dx)) * (distance < 64 ? 18 : 36);
    const gy = Math.cos(Math.atan2(dx, dy)) * (distance < 64 ? 18 : 36);
    const sx = link.source.x + gx;
    const sy = link.source.y + gy;
    const tx = link.target.x - gx;
    const ty = link.target.y - gy;
    return (
        <path
            d={`M ${sx} ${sy} L ${tx} ${ty}`}
            strokeWidth={distance < 64 ? 1 : 2}
            stroke="#22C0D2"
            fill="none"
        />
    );
};

const NetworkNode = (props: NodeProvidedProps<NetworkNode>) => {
    const labelRectHeight = 100;
    const labelRectWidth = 120;
    const { node } = props;
    return (
        <Group>
            <circle r={24} fill={PrimaryColor} />
            <ResourceIcon type={node.type} size={28} offsetX={-14} offsetY={-14} />
            <foreignObject x="25" y="-25" width={labelRectWidth} height={labelRectHeight}>
                <Box color={PrimaryColor} overflow={"hidden"} fontSize="14px">
                    {node.label}
                </Box>
            </foreignObject>
        </Group>
    );
};

export const NetworkGraph = ({ width, height }: NetworkGraphProps) => {
    // const forceStrength = 100;
    // forceSimulation(data.nodes)
    //     .force(
    //         "link",
    //         forceLink(data.links).id((d: any) => d.id)
    //     )
    //     .force("charge", forceManyBody().strength(-forceStrength))
    //     .force("center", forceCenter(width / 2, height / 2))
    //     .force(
    //         "collision",
    //         forceCollide<GraphNode>().radius((d) => 70)
    //     )
    //     // .stop()
    //     .tick(1);

    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const forceRef = useRef<Simulation<NetworkNode, undefined>>();
    const previousWidth = usePrevious(width);
    const previousHeight = usePrevious(height);

    useEffect(() => {
        forceRef.current = forceSimulation(nodes)
            .force(
                "link",
                forceLink<NetworkNode, SimulationLinkDatum<NetworkNode>>()
                    .id((d) => d.id)
                    .links(links)
            )
            .force("charge", forceManyBody().strength(-500))
            .force("center", forceCenter(width / 2, height / 2));

        // This is going to cause _many_ re-renders as data becomes more complex.
        // Be very careful with logic that goes into this component.
        // We could potentially wait until the "end" even is emitted
        // and then update the graph if we don't want to do this.
        // https://github.com/d3/d3-force#simulation_on
        forceRef.current.on("tick", () => forceUpdate());
        // TODO: Update the dependencies once nodes/edges are passed in via props.
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (forceRef.current && (previousWidth !== width || previousHeight !== height)) {
            // console.log("center zoom");
            // TODO: Recenter the diagram when width/height changes.
            // Will most likely have to look into storing the `zoom`
            // in a ref so we can call `zoom.center()`.
        }
    }, [width, height, previousWidth, previousHeight]);

    if (!width || !height || !forceRef.current) return null;

    return (
        <>
            <svg width={width} height={height}>
                {/* <rect width={width} height={height} fill="#000000" /> */}
                <Group>
                    <Graph
                        graph={{ nodes, links: links as Link<DefaultNode>[] }}
                        nodeComponent={NetworkNode}
                        linkComponent={LinkNode}
                    />
                </Group>
            </svg>
            {/* <Zoom
                width={width}
                height={height}
                scaleXMin={1 / 2}
                scaleXMax={6}
                scaleYMin={1 / 2}
                scaleYMax={6}
                initialTransformMatrix={{
                    scaleX: 1,
                    scaleY: 1,
                    translateX: 0,
                    translateY: 0,
                    skewX: 0,
                    skewY: 0
                }}
            >
                {(zoom) => (
                    <svg
                        width={width}
                        height={height}
                        style={{ cursor: zoom.isDragging ? "grabbing" : "grab" }}
                    >
                        <rect width={width} height={height} fill="#000000" />
                        <rect
                            width={width}
                            height={height}
                            rx={14}
                            fill="transparent"
                            onTouchStart={zoom.dragStart}
                            onTouchMove={zoom.dragMove}
                            onTouchEnd={zoom.dragEnd}
                            onMouseDown={zoom.dragStart}
                            onMouseMove={zoom.dragMove}
                            onMouseUp={zoom.dragEnd}
                            onMouseLeave={() => {
                                if (zoom.isDragging) {
                                    console.log("mouse leave");
                                    zoom.dragEnd();
                                }
                            }}
                        />
                        <Group transform={zoom.toString()}>
                            <Graph
                                graph={{ nodes, links }}
                                nodeComponent={NetworkNode}
                                linkComponent={LinkNode}
                            />
                        </Group>
                    </svg>
                )}
            </Zoom> */}
        </>
    );
};

export default NetworkGraph;
