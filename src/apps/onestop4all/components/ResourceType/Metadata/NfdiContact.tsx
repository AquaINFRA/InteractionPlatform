import { Box, Flex } from "@open-pioneer/chakra-integration";
import { PersonalInfo } from "./PersonalInfo";

export const NfdiContact = (props: { contact: any }) => {
    const contact = props.contact;

    return (
        <Box className="metadataKeywords">
            <div className="seperator"></div>
            <Flex>
                <span className="metadataTag">NFDI4Earth contact:&nbsp;</span>
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
