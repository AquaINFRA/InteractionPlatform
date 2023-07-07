export const Abstract = (props: { abstractText: string; width: string }) => {
    const { abstractText, width } = props;
    return (
        <div style={{ maxWidth: width }}>
            <p className="resTypeHeader">Abstract</p>
            <p className="abstractText">{abstractText}</p>
        </div>
    );
};
