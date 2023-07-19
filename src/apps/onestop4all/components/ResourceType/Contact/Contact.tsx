import { Box } from "@open-pioneer/chakra-integration";
//import { Map } from "../../Map/Map";
import { Misc } from "../Metadata/Misc";

export const Contact = (props: { address: any; location: Array<Array<Array<number>>> }) => {
    //for some reason, defining address as an object instead of any results in an error....
    const { address, location } = props;

    return (
        <Box>
            <p className="metadataSectionHeader">Contact</p>
            <Misc tag={address.tag} val={address.val} />
            <Box pt="22px">{location}</Box>
        </Box>
    );
};
