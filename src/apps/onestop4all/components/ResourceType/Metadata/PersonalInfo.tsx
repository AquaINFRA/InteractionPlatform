import { Image } from "@open-pioneer/chakra-integration";

export function isUrl(url: string) {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
}

export function isEmail(address: string) {
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return emailRegex.test(address);
}

export const MetadataUrl = (props: { item: string; type: string }) => {
    const { item, type } = props;
    return (
        <a
            href={type == "mail" ? "mailto: " : "" + item}
            className="metadataLink"
            rel="noreferrer"
            target="_blank"
        >
            {item}
        </a>
    );
};

export const PersonalInfo = (props: {
    name: string;
    orcid: string;
    email: string;
    affiliation: string;
}) => {
    const { name, orcid, email, affiliation } = props;

    return (
        <>
            {name ? name : ""}
            {email ? (
                isEmail(email) ? (
                    <span>
                        &nbsp;{"("}
                        <MetadataUrl item={email} type="mail" />
                        {")"}&nbsp;
                    </span>
                ) : (
                    email
                )
            ) : (
                ""
            )}
            {orcid ? (
                <a
                    href={isUrl(orcid) ? orcid : "https://orcid.org/" + orcid}
                    rel="noreferrer"
                    target="_blank"
                >
                    <Image className="orcid" alt="Bg icon" src="/orcid.png" />
                </a>
            ) : null}
        </>
    );
};
