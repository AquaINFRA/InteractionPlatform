import { Flex, Box } from "@open-pioneer/chakra-integration";
import { Map } from "../../Map/Map";

export const SpatialInformation = (props: { metadataElements: object }) => {
    const metadataElements = Object.values(props.metadataElements);
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
                <Map />
            </Box>
        </Box>
    );
};
