import { ReactNode } from "react";

export interface ParticipateEntryProps {
    imageUrl: string;
    text: ReactNode;
}

export const ParticipateEntry = ({ text, imageUrl }: ParticipateEntryProps) => {
    return (
        <div className="participate-entry">
            <div className="overlap">
                <div className="circle-group">
                    <div className="circle circle-1 icon-base" />
                    <div className="circle circle-2 div" />
                    <div className="circle circle-3 icon-base-2" />
                </div>
                <img className="image" src={`/get-involved/${imageUrl}`} />
            </div>
            <div className="label">{text}</div>
        </div>
    );
};
