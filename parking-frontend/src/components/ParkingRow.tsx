import ParkingSpot from "./ParkingSpot.tsx";
import {ParkingAngle, getGapByAngle} from "../constants/parkingAngles.ts";

interface ParkingRowProps {
    first: number
    spots: number;
    angle?: ParkingAngle;
    style?: React.CSSProperties;
}

const ParkingRow: React.FC<ParkingRowProps> = ({
                                                   first,
                                                   spots,
                                                   angle = ParkingAngle.Angle0,
                                                   style
                                               }) => {
    const gap = getGapByAngle(angle);
    let content = [];
    for (let i = first; i < first + spots; i++) {
        i == first+spots - 1
            ? content.push(
                <ParkingSpot isDisabled={true} angle={angle} number={String(i)}/>
            )
            : content.push(<ParkingSpot angle={angle} number={String(i)}/>);
    }
    return (
        <>
            <style>
                {`
          .row{
    display: flex;
    flex-direction: row;
}
        `}
            </style>
            <div className="row"  style={{ gap: `${gap}px`, ...style }}>
                {content}
            </div>
        </>

    );
};

export default ParkingRow;
