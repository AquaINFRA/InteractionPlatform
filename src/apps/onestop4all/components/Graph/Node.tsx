import { Group } from "@visx/group";
import { NodeProvidedProps } from "@visx/network/lib/types";
import { Text, useText } from "@visx/text";
import { select } from "d3";
import { CSSProperties, MouseEvent, ReactNode, useState } from "react";
import useMeasure from "react-use-measure";

import { PrimaryColor } from "../../Theme";
import { ResourceIcon } from "../../views/Start/ResourceEntry/ResourceIcons";
import { CustomNode } from "./NetworkGraph";

export const Node = ({ node }: NodeProvidedProps<CustomNode>) => {
    const [titleRef, titleBounds] = useMeasure();
    const [resourceTypeRef, resourceTypeBounds] = useMeasure();

    const [highlight, setHighlighted] = useState(false);

    const fontColor = PrimaryColor;
    const resourceTypeFontSize = 12;

    const titleFontSize = 12;
    const titleFontWeight = 700;

    const abstractFontSize = 12;

    const maxWidth = 150;
    const circleRadius = 24;
    const paddingBetween = 8;
    const paddingOutside = 10;

    const resourceTypeStyle: CSSProperties = {
        fontSize: resourceTypeFontSize,
        fontFamily: "Open Sans"
    };

    const titleStyle: CSSProperties = {
        fontSize: titleFontSize,
        fontWeight: titleFontWeight
    };

    const height = Math.max(
        circleRadius * 2,
        Math.floor((titleBounds.height ?? 0) + (resourceTypeBounds.height ?? 0))
    );

    const { wordsByLines: titleWordsByLine } = useText({
        children: node.label,
        verticalAnchor: "start",
        capHeight: titleFontSize,
        fontSize: titleFontSize,
        fontWeight: titleFontWeight,
        width: maxWidth
    });

    const { wordsByLines: resourceTypeWordsByLine } = useText({
        children: node.type,
        verticalAnchor: "start",
        capHeight: resourceTypeFontSize,
        fontSize: resourceTypeFontSize,
        width: maxWidth
    });

    const titleMeasuredWidth = titleWordsByLine.reduce(
        (maxTitleWidth, line) => Math.max(maxTitleWidth, line.width ?? 0),
        0
    );

    const resourceTypeMeasuredWidth = resourceTypeWordsByLine.reduce(
        (maxWidth, line) => Math.max(maxWidth, line.width ?? 0),
        0
    );

    const textMeasuredWidth = Math.ceil(
        Math.min(maxWidth, Math.max(titleMeasuredWidth, resourceTypeMeasuredWidth))
    );

    function handleMouseEnter(event: MouseEvent<SVGElement>) {
        if (event.currentTarget.parentNode?.parentNode) {
            select(event.currentTarget.parentNode.parentNode as SVGElement).raise();
        }
        setHighlighted(true);
    }

    function handleMouseLeave() {
        setHighlighted(false);
    }

    function getAbstractPart() {
        const width = textMeasuredWidth + 2 * circleRadius + 2 * paddingOutside + paddingBetween;
        const top = Math.max(
            +(paddingOutside + circleRadius),
            height - circleRadius + paddingBetween
        );
        return (
            <Group fill={fontColor}>
                {/* <rect
                    fill={"rgba(255, 0, 0, 1)"}
                    x={-(paddingOutside + circleRadius)}
                    y={top}
                    width={width}
                    height={abstractFontSize * 3}
                /> */}
                <LinedText
                    x={-circleRadius}
                    y={top}
                    width={width}
                    fontSize={abstractFontSize}
                    text={node.abstract}
                    lines={3}
                ></LinedText>
            </Group>
        );
    }

    return (
        <Group>
            <rect
                className="graph-node-background"
                fill={"rgba(224, 246, 250)"}
                opacity={highlight ? 1 : 0.0}
                x={-(paddingOutside + circleRadius)}
                y={-(paddingOutside + circleRadius)}
                rx={"8px"}
                width={textMeasuredWidth + 2 * circleRadius + 2 * paddingOutside + paddingBetween}
                height={height + 2 * paddingOutside + paddingBetween + abstractFontSize * 3}
            />
            <circle r={circleRadius} fill={PrimaryColor} />
            <ResourceIcon
                type={node.type}
                size={circleRadius}
                offsetX={-circleRadius / 2}
                offsetY={-circleRadius / 2}
            />
            <Group left={circleRadius + paddingBetween} top={-circleRadius} fill={PrimaryColor}>
                {/* <rect
                    className="graph-node-background"
                    fill={"yellow"}
                    width={textMeasuredWidth}
                    height={height}
                /> */}
                <Text
                    innerTextRef={titleRef}
                    fill={fontColor}
                    verticalAnchor="start"
                    width={textMeasuredWidth}
                    capHeight={titleFontSize}
                    style={titleStyle}
                >
                    {node.label}
                </Text>
                <Text
                    innerTextRef={resourceTypeRef}
                    fill={fontColor}
                    verticalAnchor="start"
                    x={0}
                    y={titleBounds.height ?? 0}
                    dy={node.label ? 4 : 0}
                    width={textMeasuredWidth}
                    capHeight={resourceTypeFontSize}
                    style={resourceTypeStyle}
                >
                    {node.type}
                </Text>
            </Group>
            {highlight && getAbstractPart()}
            <rect
                className="node-hover-area"
                fill={"rgba(255, 0, 0, 0.0)"}
                x={-circleRadius}
                y={-circleRadius}
                width={textMeasuredWidth + 2 * circleRadius + paddingBetween}
                height={height}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />
        </Group>
    );
};

interface LinedTextProps {
    lines?: number;
    width?: number;
    x?: number;
    y?: number;
    text: string;
    fontSize?: number;
}

const LinedText = ({
    lines = 1,
    text,
    width = 100,
    x = 0,
    y = 0,
    fontSize = 15
}: LinedTextProps) => {
    const { wordsByLines } = useText({
        children: text,
        verticalAnchor: "start",
        capHeight: fontSize,
        fontSize: fontSize,
        fontWeight: 100,
        width
    });

    const textLines: ReactNode[] = [];
    for (let index = 0; index < wordsByLines.length; index++) {
        if (index <= lines - 1) {
            const element = wordsByLines[index];
            textLines.push(
                <Text
                    key={index}
                    x={x}
                    y={y + index * fontSize}
                    width={width}
                    verticalAnchor="start"
                    style={{ fontSize }}
                >
                    {element?.words.join(" ")}
                </Text>
            );
        }
    }

    return <Group>{textLines}</Group>;
};
