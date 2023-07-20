import { Box, Flex } from "@open-pioneer/chakra-integration";
import { Map } from "../../Map/Map";
import { Misc } from "../Metadata/Misc";
import { GoToLocationBtnIcon } from "../../../components/Icons";
import { ActionButton } from "../../../components/ResourceType/ActionButton/ActionButton";

export const Contact = (props: { address: any; location: string }) => {
    //for some reason, defining address as an object instead of any results in an error....
    const { address, location } = props;

    const goToLocation = (location: string) => {
        console.log(location);
    };

    return (
        <Box>
            <p className="metadataSectionHeader">Contact</p>
            <Flex gap="8px" pt="10px">
                <Misc tag={address.tag} val={address.val} />
                <ActionButton
                    label="Go to location"
                    icon={<GoToLocationBtnIcon />}
                    variant="outline"
                    fun={() => {
                        goToLocation(location);
                    }}
                />
            </Flex>
            <Map geometry={location} />
        </Box>
    );
};
