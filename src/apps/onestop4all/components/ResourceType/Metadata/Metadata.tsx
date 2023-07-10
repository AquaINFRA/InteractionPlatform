import { HStack } from "@open-pioneer/chakra-integration";

export const Metadata = (props: { metadataElements: object }) => {
    const metadataElements = Object.values(props.metadataElements);

    function isUrl(url: string) {
        const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlRegex.test(url);
    }

    return (
        <>
            <p className="resTypeHeader">Metadata</p>
            <div className="seperator"></div>
            {metadataElements.map((elem) =>
                elem.tag != "Keywords" ? (
                    <>
                        <div>
                            {!isUrl(elem.val) ? (
                                <HStack>
                                    <span className="tag">{elem.tag}: </span>
                                    <span className="value">{elem.val}</span>
                                </HStack>
                            ) : (
                                <HStack>
                                    <span className="tag">{elem.tag}: </span>{" "}
                                    <span className="value">
                                        <a href={elem.val} className="link">
                                            {elem.val}
                                        </a>
                                    </span>
                                </HStack>
                            )}
                        </div>
                        <div className="seperator"></div>
                    </>
                ) : (
                    <>
                        <div>
                            <span className="tag">{elem.tag}: </span>
                            {elem.val.map((e: string) => (
                                <>
                                    <div className="keyword">
                                        <a href={"/search?keyword=" + e}>{e}</a>
                                    </div>
                                </>
                            ))}
                        </div>
                    </>
                )
            )}
        </>
    );
};
