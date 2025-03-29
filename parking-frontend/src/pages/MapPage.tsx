import ParkingRow from "../components/ParkingRow/index.tsx"
import NavBar from "../navigation/NavBar.tsx";
import {useLocation} from "react-router-dom";
import {User} from "../interfaces/Interfaces";


const MapPage = () => {
    const location = useLocation();
    const user: User = location.state?.user;

    let num = 1
    let flag = false
    const generateParkingRows = (rowsCount: number, spotsPerRow: number) => {

        return Array.from({length: rowsCount}).map((_, rowIndex) => {
            const angle = flag ? 0 : 180;

            const spots = {
                number: spotsPerRow,
                first: num,
                angle: angle
            }
            num += spotsPerRow
            flag = !flag
            return {
                id: `row-${rowIndex}`,
                spots,
                marginBottom: rowIndex % 2 === 1 ? '100px' : '2px'
            };
        });
    };

    const first = generateParkingRows(2, 5);
    const second = generateParkingRows(2, 5);
    const third = generateParkingRows(2, 5);

    return (
        <NavBar>
            <p>Карта пользователя {user?.phone}</p>
            <style>
                {`
 .parkingMap {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  background-color: #f5f5f5;
}

.parkingRowContainer {
  position: relative;
  margin-bottom: 30px;
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
            `}
            </style>
            <div className="parkingMap">
                <div>
                    {first.map((row) => (
                        <ParkingRow
                            first={row.spots.first}
                            spots={row.spots.number}
                            angle={row.spots.angle}
                            style={{
                                '--row-margin': row.marginBottom,
                                marginBottom: row.marginBottom
                            } as React.CSSProperties}
                        />
                    ))}

                    {second.map((row) => (
                        <ParkingRow
                            first={row.spots.first}
                            spots={row.spots.number}
                            angle={row.spots.angle}
                            style={{
                                '--row-margin': row.marginBottom,
                                marginBottom: row.marginBottom
                            } as React.CSSProperties}
                        />
                    ))}


                    {third.map((row) => (
                        <ParkingRow
                            first={row.spots.first}
                            spots={row.spots.number}
                            angle={row.spots.angle}
                            style={{
                                '--row-margin': row.marginBottom,
                                marginBottom: row.marginBottom
                            } as React.CSSProperties}
                        />
                    ))}
                </div>


            </div>
        </NavBar>
    );
};


export default MapPage