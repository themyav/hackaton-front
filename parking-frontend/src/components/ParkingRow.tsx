// ParkingRow.tsx
import ParkingSpot from "./ParkingSpot.tsx";
import {ParkingAngle, getGapByAngle} from "../constants/parkingAngles.ts";
import {ParkingSpotKinds, ParkingSpotStatus, ParkingSpotType} from "../constants/enum.ts";
import {User} from "../interfaces/Interfaces";
import {useLocation} from "react-router-dom";

interface ParkingSpotData {
    number: number;
    kind: ParkingSpotKinds;
    type: ParkingSpotType | null;
    status: ParkingSpotStatus | null;
    owner_id: string | null;
    vehicle: string | null;
    user
}

interface ParkingRowProps {
    first: number;
    spots: number;
    angle?: ParkingAngle;
    spotsData?: ParkingSpotData[];
    style?: React.CSSProperties;
}

const ParkingRow: React.FC<ParkingRowProps> = ({
                                                   first,
                                                   spots,
                                                   angle = ParkingAngle.Angle0,
                                                   spotsData = [],
                                                   style,
                                               }) => {
    const gap = getGapByAngle(angle);

    // Создаем дефолтные значения для spotData
    const defaultSpotData: ParkingSpotData = {
        number: 1,
        kind: ParkingSpotKinds.REGULAR_PARKING_KIND,
        type: null,
        status: null,
        owner_id: null,
        vehicle: "qew"
    };

    const location = useLocation();
    const user = location.state?.user;

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
            <div className="row" style={{gap: `${gap}px`, ...style}}>
                {Array.from({length: spots}).map((_, index) => {
                    const spotNumber = first + index;
                    const spotData = spotsData[index] || defaultSpotData;
                    const isLastSpot = index === spots - 1;

                    return (
                        <ParkingSpot
                            key={spotNumber}
                            angle={angle}
                            number={spotNumber}
                            kind={spotData.kind}
                            type={spotData.type}
                            status={spotData.status}
                            owner_id={spotData.owner_id}
                            vehicle={spotData.vehicle}
                        />
                    );
                })}
            </div>
        </>
    );
};
export default ParkingRow;