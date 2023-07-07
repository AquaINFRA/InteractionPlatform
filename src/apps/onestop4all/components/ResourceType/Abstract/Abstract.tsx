export const Abstract = (props: { abstractText: string }) => {
    const abstractText = props.abstractText;
    return (
        <div style={{ maxWidth: "50%", marginLeft: "10%" }}>
            <p className="resTypeHeader">Abstract</p>
            <p className="abstractText">{abstractText}</p>
        </div>
    );
};
