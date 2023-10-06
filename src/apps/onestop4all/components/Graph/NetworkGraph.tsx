import { Group } from "@visx/group";
import { Graph } from "@visx/network";
import { LinkProvidedProps } from "@visx/network/lib/types";

import { ResourceType } from "../../views/Start/ResourceEntry/ResourceEntry";
import { Node } from "./Node";

export interface NetworkGraphProps {
    width: number;
    height: number;
}

export interface CustomNode {
    id: string;
    label: string;
    type: ResourceType;
    abstract: string;
    x: number;
    y: number;
    fx?: number;
    fy?: number;
}

interface CustomLink {
    source: CustomNode;
    target: CustomNode;
}

const nodes: CustomNode[] = [
    {
        id: "1",
        label: "inputfield",
        type: ResourceType.Articles,
        abstract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        x: 450,
        y: 50
    },
    {
        id: "3",
        label: "World Settlement Footprint (WSF)",
        type: ResourceType.Tools,
        abstract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        x: 200,
        y: 200
    },
    {
        id: "2",
        label: "Monitor der Siedlungs- und Freiraumentwicklung",
        type: ResourceType.Repos,
        abstract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        x: 700,
        y: 200
    },
    {
        id: "4",
        label: "World Settlement Footprint (WSF) 2019 - Sentinel-1/2 – Global",
        abstract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        type: ResourceType.LHB_Articles,
        x: 500,
        y: 200
    },
    {
        id: "5",
        label: "IÖR Monitor WMS",
        abstract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        type: ResourceType.Learning_Resource,
        x: 900,
        y: 350
    },
    {
        id: "6",
        label: "World Settlement Footprint (WSF) 2015 v2 - Landsat-8/Sentinel-1 – Global",
        abstract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        type: ResourceType.Repos,
        x: 300,
        y: 350
    },
    {
        id: "7",
        label: "EOC Catalogue",
        abstract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        type: ResourceType.Standards,
        x: 500,
        y: 350
    },
    {
        id: "8",
        label: "BKG-MIS",
        abstract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        type: ResourceType.Tools,
        x: 400,
        y: 450
    },
    {
        id: "9",
        label: "OGC Catalogue Service",
        abstract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        type: ResourceType.Standards,
        x: 600,
        y: 450
    },
    {
        id: "10",
        label: "OGC Web Map Service",
        abstract:
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
        type: ResourceType.Standards,
        x: 1000,
        y: 400
    }
];

const links: CustomLink[] = [
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
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

const Link = (props: LinkProvidedProps<CustomLink>) => {
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

export const NetworkGraph = ({ width, height }: NetworkGraphProps) => {
    // const [, forceUpdate] = useReducer((x) => x + 1, 0);
    // const forceRef = useRef<Simulation<CustomNode, undefined>>();
    // const previousWidth = usePrevious(width);
    // const previousHeight = usePrevious(height);

    // useEffect(() => {
    //     forceRef.current = forceSimulation(nodes)
    //         .force(
    //             "link",
    //             forceLink<CustomNode, SimulationLinkDatum<CustomNode>>()
    //                 .id((d) => d.id)
    //                 .links(links)
    //         )
    //         .force("charge", forceManyBody().strength(-500))
    //         .force("center", forceCenter(width / 2, height / 2));

    //     // This is going to cause _many_ re-renders as data becomes more complex.
    //     // Be very careful with logic that goes into this component.
    //     // We could potentially wait until the "end" even is emitted
    //     // and then update the graph if we don't want to do this.
    //     // https://github.com/d3/d3-force#simulation_on
    //     forceRef.current.on("tick", () => forceUpdate());
    //     // TODO: Update the dependencies once nodes/edges are passed in via props.
    // }, []); //eslint-disable-line react-hooks/exhaustive-deps

    // useEffect(() => {
    //     if (forceRef.current && (previousWidth !== width || previousHeight !== height)) {
    //         // console.log("center zoom");
    //         // TODO: Recenter the diagram when width/height changes.
    //         // Will most likely have to look into storing the `zoom`
    //         // in a ref so we can call `zoom.center()`.
    //     }
    // }, [width, height, previousWidth, previousHeight]);

    // if (!width || !height || !forceRef.current) return null;

    return width < 10 ? null : (
        <>
            <svg width={width} height={height}>
                <filter id="blurMe">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                </filter>
                <Group>
                    <Graph<CustomLink, CustomNode>
                        graph={{ nodes, links }}
                        nodeComponent={Node}
                        linkComponent={Link}
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
