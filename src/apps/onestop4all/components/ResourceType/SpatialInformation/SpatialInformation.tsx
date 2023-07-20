import { Flex, Box } from "@open-pioneer/chakra-integration";
import { Map } from "../../Map/Map";

export const SpatialInformation = (props: { metadataElements: object; bbox: string }) => {
    const metadataElements = Object.values(props.metadataElements);
    const bbox = props.bbox;
    return (
        <Box>
            <p className="metadataSectionHeader">Spatial Extent</p>
            {metadataElements.map((e, i) =>
                e.tag == "Bounding box" ? (
                    <Box key={i}>
                        <div className="seperator"></div>
                        <div>
                            <Flex alignItems="center">
                                <span className="metadataTag">{e.tag}:&nbsp;</span>
                                {e.val[0].map((elem: Array<number>, i: number) => (
                                    <div key={i}>
                                        <span>
                                            ({elem[0]} , {elem[1]})
                                            {i < e.val[0].length - 1 ? "," : ""}&nbsp;
                                        </span>
                                    </div>
                                ))}
                            </Flex>
                        </div>
                    </Box>
                ) : e.tag == "Reference systems" ? (
                    <Box key={i}>
                        <div className="seperator"></div>
                        <div>
                            <Flex alignItems="center">
                                <span className="metadataTag">{e.tag}:&nbsp;</span>
                                {e.val.map((elem: number, i: number) => (
                                    <div key={i}>
                                        <span>
                                            {elem}
                                            {i < e.val.length - 1 ? "," : ""}&nbsp;
                                        </span>
                                    </div>
                                ))}
                            </Flex>
                        </div>
                    </Box>
                ) : (
                    <></>
                )
            )}
            <Box pt="22px">
                <Map geometry={bbox} />
            </Box>
        </Box>
    );
};
