import ParkingRow from "../components/ParkingRow.tsx"
import NavBar from "../navigation/NavBar.tsx";
import {useLocation} from "react-router-dom";
import {User} from "../interfaces/Interfaces";

interface MapPageProps {
    columns?: number;
    groupsPerColumn?: number;
    rowsPerGroup?: number;
    spotsPerRow?: number;
}

const MapPage = ({
                     columns = 3,
                     groupsPerColumn = 2,
                     rowsPerGroup = 4,
                     spotsPerRow = 5
                 }: MapPageProps) => {

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
            };
            num += spotsPerRow;
            flag = !flag;

            return {
                id: `row-${rowIndex}`,
                spots,
                marginBottom: rowIndex % 2 === 1 ? '1em' : '-1em' // Относительные единицы
            };
        });
    };

    const rowGroups = Array.from({length: columns * groupsPerColumn}).map(() => {
        return generateParkingRows(rowsPerGroup, spotsPerRow);
    });

    return (
        <NavBar>
            <p>Карта пользователя {user?.phone}</p>
            <style>
                {`
                    .map-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 1.25rem;
                        width: 100%;
                        height: 100vh;
                        box-sizing: border-box;
                    }
                    
                    .parking-map {
                        border: 0.3rem solid black;
                        width: 90vw;
                        height: 90vh;
                        max-width: 1600px;
                        max-height: 1000px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 1.25rem;
                        box-sizing: border-box;
                        position: relative;
                        background: white;
                    }

                    .parking-grid {
                        display: grid;
                        grid-template-columns: repeat(${columns} , minmax(20px, 25rem));
                        gap: 1rem;
                        padding: 1rem;
                    }

                    .parking-group {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        gap: 0.5rem;
                    }
                `}
            </style>

            <div className="map-container">
                <div className="parking-map">
                    <div className="parking-grid">
                        {rowGroups.map((group, groupIndex) => (
                            <div key={`group-${groupIndex}`} className="parking-group">
                                {group.map((row) => (
                                    <ParkingRow
                                        key={row.id}
                                        first={row.spots.first}
                                        spots={row.spots.number}
                                        angle={row.spots.angle}
                                        style={{marginBottom: row.marginBottom}}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </NavBar>
    );
};

export default MapPage