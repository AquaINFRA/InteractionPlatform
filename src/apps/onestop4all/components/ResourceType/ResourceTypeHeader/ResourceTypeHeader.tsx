import { HStack, Icon } from "@open-pioneer/chakra-integration";
import { StandardIcon, BackIcon } from "../../Icons";

export function ResourceTypeHeader(props: { resType: string; width: string }) {
    const resourceType = props.resType;
    const resourceIcon = "/" + resourceType + ".png";
    return (
        <HStack maxWidth={props.width}>
            <a href="/search?">
                <Icon boxSize={10}>
                    <BackIcon />
                </Icon>
            </a>
            <a href="/search">
                <div className="back">
                    <div className="to">
                        <a>Back</a>&nbsp;
                    </div>
                    <div className="resultList">to result list</div>
                </div>
            </a>
            <div className="seperator" />
            <p className="resourceType">{resourceType}</p>
            <StandardIcon boxSize={10} />
        </HStack>
    );
}
