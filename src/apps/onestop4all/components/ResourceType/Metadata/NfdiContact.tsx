import { Box, Flex } from "@open-pioneer/chakra-integration";
import { PersonalInfo } from "./PersonalInfo";

export const NfdiContact = (props: { contact: any; tag: string }) => {
    const contact = props.contact;
    const tag = props.tag;

    return (
        <Box className="metadataSection">
            <div className="seperator"></div>
            <Flex>
                <span className="metadataTag">{tag}:&nbsp;</span>
                <Flex className="metadataValue">
                    <PersonalInfo
                        name={contact.name}
                        email={contact.email}
                        orcid={contact.orcid}
                        affiliation={contact.affiliation}
                    />
                </Flex>
            </Flex>
        </Box>
    );
};
