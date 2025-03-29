import ParkingSpot from "../ParkingSpot/index.tsx";
import {ParkingAngle, getGapByAngle} from "../../constants/parkingAngles.ts";

interface ParkingRowProps {
    spots: number;
    angle?: ParkingAngle;
}

const ParkingRow: React.FC<ParkingRowProps> = ({
                                                   spots,
                                                   angle = ParkingAngle.Angle0,
                                               }) => {
    const gap = getGapByAngle(angle);
    let content = [];
    for (let i = 0; i < spots; i++) {
        i == spots - 1
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
            <div className="row" style={{gap: `${gap}px`}}>
                {content}
            </div>
        </>

    );
};

export default ParkingRow;
