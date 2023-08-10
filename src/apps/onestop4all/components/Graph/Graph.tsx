import * as d3 from "d3";
import { useEffect, useRef } from "react";

import { PrimaryColor } from "../../Theme";
import { ResourceIcon } from "../../views/Start/ResourceEntry/ResourceIcons";

interface GraphProps {
    data?: number[];
}

// check: https://observablehq.com/@xianwu/force-directed-graph-network-graph-with-arrowheads-and-lab
// https://observablehq.com/@d3/force-directed-graph/2?intent=fork

interface Node {
    id: string;
    label: string;
    level: number;
    fx?: number;
    fy?: number;
}

interface Link {
    source: string;
    target: string;
}

const data: {
    nodes: Node[];
    links: Link[];
} = {
    nodes: [
        {
            id: "1",
            label: "inputfield",
            level: 1,
            fx: 450,
            fy: 50
        },
        {
            id: "3",
            label: "Monitor der Siedlungs- und Freiraumentwicklung",
            level: 2,
            fx: 450,
            fy: 100
        },
        {
            id: "2",
            label: "World Settlement Footprint (WSF)",
            level: 2
        },
        {
            id: "4",
            label: "World Settlement Footprint (WSF) 2019 - Sentinel-1/2 – Global",
            level: 2
        },
        {
            id: "5",
            label: "IÖR Monitor WMS",
            level: 3
        },
        {
            id: "6",
            label: "World Settlement Footprint (WSF) 2015 v2 - Landsat-8/Sentinel-1 – Global",
            level: 4
        },
        {
            id: "7",
            label: "EOC Catalogue",
            level: 4
        },
        {
            id: "8",
            label: "BKG-MIS",
            level: 5
        },
        {
            id: "9",
            label: "OGC Catalogue Service",
            level: 5
        },
        {
            id: "10",
            label: "OGC Web Map Service",
            level: 4
        }
    ],
    links: [
        { source: "1", target: "2" },
        { source: "1", target: "3" },
        { source: "1", target: "4" },
        { source: "3", target: "5" },
        { source: "5", target: "10" },
        { source: "4", target: "6" },
        { source: "4", target: "7" },
        { source: "7", target: "8" },
        { source: "7", target: "9" },
        { source: "8", target: "9" }
    ]
};

type GraphNode = Node & d3.SimulationNodeDatum;

type GraphLink = Link & d3.SimulationLinkDatum<GraphNode>;

export const Graph = (props: GraphProps) => {
    /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
    const d3Container = useRef(null);

    const margin = { top: 0, right: 0, bottom: 0, left: 0 };

    /* The useEffect Hook is for running side effects outside of React,
          for instance inserting elements into the DOM using D3 */
    useEffect(() => {
        if (props.data && d3Container.current) {
            console.log("render svg");
            const svg = d3.select(d3Container.current);

            svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

            const width = 928;
            const height = 600;

            // const color = d3.scaleOrdinal(d3.schemeCategory10);

            // The force simulation mutates links and nodes, so create a copy
            // so that re-evaluating this cell produces the same result.
            const links = data.links.map((d) => ({ ...d }));
            const nodes: GraphNode[] = data.nodes.map((d) => ({ ...d }));

            // Create a simulation with several forces.
            const simulation = d3
                .forceSimulation(nodes)
                .force(
                    "link",
                    d3.forceLink<GraphNode, GraphLink>(links).id((d) => d.id)
                )
                // .force(
                //     "x",
                //     d3.forceX<GraphNode>().x((d) => 0)
                // )
                // .force("y", d3.forceY<GraphNode>().y((d) => d.level * 100))
                // .force("charge", d3.forceManyBody().strength(-200))
                .force("center", d3.forceCenter(width / 2, height / 2))
                .force(
                    "collision",
                    d3.forceCollide<GraphNode>().radius((d) => 70)
                )
                .on("tick", () => {
                    link.attr("x1", (d: any) => d.source.x)
                        .attr("y1", (d: any) => d.source.y)
                        .attr("x2", (d: any) => d.target.x)
                        .attr("y2", (d: any) => d.target.y);

                    // node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
                    node.attr("transform", (d) => `translate(${d.x},${d.y})`);
                });

            // Add a line for each link, and a circle for each node.
            const link = svg
                .append("g")
                .attr("stroke", "#22C0D2")
                .attr("stroke-opacity", 0.6)
                .selectAll()
                .data<GraphLink>(links)
                .join("line")
                .attr("stroke-width", 1);

            // const node = svg
            //     .append("g")
            //     .attr("stroke", "#fff")
            //     .attr("stroke-width", 1.5)
            //     .selectAll()
            //     .data(nodes)
            //     .join("circle")
            //     .attr("r", 20)
            //     .attr("fill", (d) => PrimaryColor);

            const node = svg
                .selectAll(".nodes")
                .data(nodes)
                .enter()
                .append("g")
                .attr("class", "nodes");

            node.append("circle")
                .attr("r", 20)
                .style("stroke", "grey")
                .style("stroke-opacity", 0.3)
                .style("stroke-width", 1)
                .style("fill", PrimaryColor);

            // node.append("text")
            //     .attr("dy", 4)
            //     .attr("dx", -15)
            //     .text((d) => d.label);

            node.append("foreignObject")
                .attr("y", -15)
                .attr("x", 25)
                .attr("width", 100)
                .attr("height", 100)
                .append("xhtml:div")
                .style("font", "12px OpenSans")
                .html((d) => d.label);

            node
                .append("foreignObject")
                .attr("y", -15)
                .attr("x", 25)
                .attr("width", 100)
                .attr("height", 100).html(`<svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M3 7C2.73478 7 2.48043 7.10536 2.29289 7.29289C2.10536 7.48043 2 7.73478 2 8V14C2 14.2652 2.10536 14.5196 2.29289 14.7071C2.48043 14.8946 2.73478 15 3 15H45C45.2652 15 45.5196 14.8946 45.7071 14.7071C45.8946 14.5196 46 14.2652 46 14V8C46 7.73478 45.8946 7.48043 45.7071 7.29289C45.5196 7.10536 45.2652 7 45 7H3ZM0.87868 5.87868C1.44129 5.31607 2.20435 5 3 5H45C45.7956 5 46.5587 5.31607 47.1213 5.87868C47.6839 6.44129 48 7.20435 48 8V14C48 14.7956 47.6839 15.5587 47.1213 16.1213C46.5587 16.6839 45.7957 17 45 17H3C2.20435 17 1.44129 16.6839 0.87868 16.1213C0.316071 15.5587 0 14.7956 0 14V8C0 7.20435 0.316071 6.44129 0.87868 5.87868Z"
                    fill="white"
                />
                <path
                    d="M3 19C3.55228 19 4 19.4477 4 20V40C4 40.2652 4.10536 40.5196 4.29289 40.7071C4.48043 40.8946 4.73478 41 5 41H43C43.2652 41 43.5196 40.8946 43.7071 40.7071C43.8946 40.5196 44 40.2652 44 40V20C44 19.4477 44.4477 19 45 19C45.5523 19 46 19.4477 46 20V40C46 40.7956 45.6839 41.5587 45.1213 42.1213C44.5587 42.6839 43.7956 43 43 43H5C4.20435 43 3.44129 42.6839 2.87868 42.1213C2.31607 41.5587 2 40.7956 2 40V20C2 19.4477 2.44772 19 3 19Z"
                    fill="white"
                />
                <path
                    d="M20 23C19.4696 23 18.9609 23.2107 18.5858 23.5858C18.2107 23.9609 18 24.4696 18 25C18 25.5304 18.2107 26.0391 18.5858 26.4142C18.9609 26.7893 19.4696 27 20 27H28C28.5304 27 29.0391 26.7893 29.4142 26.4142C29.7893 26.0391 30 25.5304 30 25C30 24.4696 29.7893 23.9609 29.4142 23.5858C29.0391 23.2107 28.5304 23 28 23H20ZM17.1716 22.1716C17.9217 21.4214 18.9391 21 20 21H28C29.0609 21 30.0783 21.4214 30.8284 22.1716C31.5786 22.9217 32 23.9391 32 25C32 26.0609 31.5786 27.0783 30.8284 27.8284C30.0783 28.5786 29.0609 29 28 29H20C18.9391 29 17.9217 28.5786 17.1716 27.8284C16.4214 27.0783 16 26.0609 16 25C16 23.9391 16.4214 22.9217 17.1716 22.1716Z"
                    fill="white"
                />
            </svg>`);

            // const elem = svg.selectAll("g").data(nodes);

            /*Create and place the "blocks" containing the circle and the text */
            // const elemEnter = elem
            //     .enter()
            //     .append("g")
            //     .attr("transform", function (d) {
            //         return "translate(" + d.x + ",80)";
            //     });

            // /*Create the circle for each block */
            // elemEnter
            //     .append("circle")
            //     .attr("r", function (d) {
            //         return 20;
            //     })
            //     .attr("stroke", "black")
            //     .attr("fill", "white");

            // /* Create the text for each block */
            // elemEnter
            //     .append("text")
            //     .attr("dx", function (d) {
            //         return -20;
            //     })
            //     .text(function (d) {
            //         return d.label;
            //     });

            // node.append("text").text((d) => d.id).attr("dx", 6).attr("dy", 3);

            // node.call(
            //     d3
            //         .drag()
            //         .on("start", (event: any) => {
            //             if (!event.active) simulation.alphaTarget(0.3).restart();
            //             event.subject.fx = event.subject.x;
            //             event.subject.fy = event.subject.y;
            //         })
            //         .on("drag", (event: any) => {
            //             event.subject.fx = event.x;
            //             event.subject.fy = event.y;
            //         })
            //         .on("end", (event: any) => {
            //             if (!event.active) simulation.alphaTarget(0);
            //             event.subject.fx = null;
            //             event.subject.fy = null;
            //         })
            // );

            // Add a drag behavior.
            // node.call(
            //     d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
            // );

            // Set the position attributes of links and nodes each time the simulation ticks.
            // function ticked() {
            //     link.attr("x1", (d) => d.source.x)
            //         .attr("y1", (d) => d.source.y)
            //         .attr("x2", (d) => d.target.x)
            //         .attr("y2", (d) => d.target.y);

            //     node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
            // }

            // Reheat the simulation when drag starts, and fix the subject position.
            // function dragstarted(event) {
            //     if (!event.active) simulation.alphaTarget(0.3).restart();
            //     event.subject.fx = event.subject.x;
            //     event.subject.fy = event.subject.y;
            // }

            // Update the subject (dragged node) position during drag.
            // function dragged(event) {
            //     event.subject.fx = event.x;
            //     event.subject.fy = event.y;
            // }

            // Restore the target alpha so the simulation cools after dragging ends.
            // Unfix the subject position now that it’s no longer being dragged.
            // function dragended(event) {
            //     if (!event.active) simulation.alphaTarget(0);
            //     event.subject.fx = null;
            //     event.subject.fy = null;
            // }

            // When this cell is re-run, stop the previous simulation. (This doesn’t
            // really matter since the target alpha is zero and the simulation will
            // stop naturally, but it’s a good practice.)
            // invalidation.then(() => simulation.stop());

            return () => {
                svg.selectChildren().remove();
                // svg.empty();
                console.log("clean svg");
            };
        }
    }, []);

    return <svg className="d3-component" width={928} height={600} ref={d3Container} />;
};
