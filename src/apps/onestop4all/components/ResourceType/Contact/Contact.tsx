import { useState } from "react";
import { Box, Flex } from "@open-pioneer/chakra-integration";
import { Map } from "../Map/Map";
import { Misc } from "../Metadata/Misc";
import { GoToLocationBtnIcon } from "../../../components/Icons";
import { ActionButton } from "../../../components/ResourceType/ActionButton/ActionButton";

export const Contact = (props: { address: any; location: string }) => {
    //for some reason, defining address as an object instead of any results in an error....
    const { address, location } = props;
    const [triggerPositioning, setTriggerPositioning] = useState(0);

    return (
        <Box>
            <p className="metadataSectionHeader">{address.tag}</p>
            <Flex gap="8px" pt="10px">
                <Misc val={address.val} />
                <ActionButton
                    label="Go to location"
                    icon={<GoToLocationBtnIcon />}
                    variant="outline"
                    fun={() => {
                        setTriggerPositioning((trigger) => trigger + 1);
                    }}
                />
            </Flex>
            <Map geometry={location} height="35vh" triggerPositioning={triggerPositioning} />
        </Box>
    );
};
