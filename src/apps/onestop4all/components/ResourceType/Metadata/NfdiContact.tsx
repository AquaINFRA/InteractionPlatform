import { Box, Flex, Image } from "@open-pioneer/chakra-integration";

export const NfdiContact = (props: { contact: any }) => {
    const contact = props.contact[0];
    const contact_info =
        (contact.name ? contact.name : "") +
        " " +
        //(contact.affiliation ? contact.affiliation : "") + " " +
        (contact.email ? (contact.name ? "(" + contact.email + ")" : contact.mail) : "");

    function isUrl(url: string) {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(url);
    }

    return (
        <Box className="metadataKeywords">
            <div className="seperator"></div>
            <Flex>
                <span className="metadataTag">NFDI4Earth contact:&nbsp;</span>
                <Flex className="metadataValue">
                    {contact_info}&nbsp;
                    <a
                        href={
                            isUrl(contact.orcid)
                                ? contact.orcid
                                : "https://orcid.org/" + contact.orcid
                        }
                        rel="noreferrer"
                        target="_blank"
                    >
                        <Image className="orcid" alt="Bg icon" src="/orcid.png" />
                    </a>
                </Flex>
            </Flex>
        </Box>
    );
};
