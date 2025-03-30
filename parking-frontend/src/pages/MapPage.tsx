import { useState, useEffect } from "react";
import ParkingRow from "../components/ParkingRow.tsx";
import NavBar from "../navigation/NavBar.tsx";
import { useLocation } from "react-router-dom";
import { getParkingSpotList } from "../api/api.ts";
import { ParkingSpotStatus, ParkingSpotType, ParkingSpotKinds } from "../constants/enum";

interface MapPageProps {
    columns?: number;
    groupsPerColumn?: number;
    rowsPerGroup?: number;
    spotsPerRow?: number;
}

interface ParkingSpotData {
    number: string; // Изменено на string, так как в ответе number - строка
    kind: ParkingSpotKinds;
    type: ParkingSpotType | null;
    status: ParkingSpotStatus | null;
    ownerId: string | null; // Изменено на ownerId (с большой I)
    vehicle?: string | null; // Добавлено, если используется
}

const MapPage = ({
                     columns = 3,
                     groupsPerColumn = 2,
                     rowsPerGroup = 4,
                     spotsPerRow = 5
                 }: MapPageProps) => {
    const location = useLocation();
    const user = location.state?.user;
    const [parkingSpots, setParkingSpots] = useState<ParkingSpotData[]>([]);

    useEffect(() => {
        const loadParkingSpots = async () => {
            try {
                const response = await getParkingSpotList(user.id);

                // Получаем данные из свойства parkingLot ответа
                setParkingSpots(response.data.parkingLot || []);
            } catch (error) {
                console.error("Ошибка загрузки парковочных мест:", error);
            }
        };
        loadParkingSpots();
    }, [user?.id]);

    const generateParkingRows = (rowsCount: number, spotsPerRow: number, startIndex: number = 0) => {
        const rows = [];
        let currentSpotIndex = startIndex;
        let angle = 0;

        for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
            const rowSpots = parkingSpots.slice(currentSpotIndex, currentSpotIndex + spotsPerRow);

            rows.push({
                id: `row-${startIndex + rowIndex}`,
                spots: {
                    number: spotsPerRow,
                    first: currentSpotIndex + 1,
                    angle: angle,
                    spotsData: rowSpots
                },
                marginBottom: rowIndex % 2 === 1 ? '1em' : '-1em'
            });

            currentSpotIndex += spotsPerRow;
            angle = angle !== 0 ? 180 : 0;
        }

        return rows;
    };

    const rowGroups = [];
    const totalGroups = columns * groupsPerColumn;
    const spotsPerGroup = rowsPerGroup * spotsPerRow;

    for (let i = 0; i < totalGroups; i++) {
        const groupStartIndex = i * spotsPerGroup;
        rowGroups.push(generateParkingRows(rowsPerGroup, spotsPerRow, groupStartIndex));
    }

    return (
        <NavBar>
            <p>Карта пользователя {user?.name || 'Unknown'}</p>

            <div className="map-container">
                <div className="parking-map">
                    <div className="border-top-left" />
                    <div className="border-top-right" />
                    <div className="parking-grid">
                        {rowGroups.map((group, groupIndex) => (
                            <div key={`group-${groupIndex}`} className="parking-group">
                                {group.map((row) => (
                                    <ParkingRow
                                        key={row.id}
                                        first={row.spots.first}
                                        spots={row.spots.number}
                                        angle={row.spots.angle}
                                        spotsData={row.spots.spotsData}
                                        style={{ marginBottom: row.marginBottom }}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className="border-bottom" />
                </div>
            </div>

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
                        border-top: none; /* ← Это ключевое изменение! */
                        border-bottom: none; /* ← Это ключевое изменение! */
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
 
                     /* Стили для границ */
                    .border-top-left {
                        position: absolute;
                        top: -0.3rem;
                        left: 0;
                        right: calc(50% + 200px);
                        height: 0.3rem;
                        background: black;
                    }
                    
                    .border-top-right {
                        position: absolute;
                        top: -0.3rem;
                        right: 0;
                        left: calc(50% + 200px);
                        height: 0.3rem;
                        background: black;
                    }
                    
                    .border-bottom {
                        position: absolute;
                        bottom: -0.3rem;
                        left: 0;
                        right: 200px; /* Разрыв 200px справа */
                        height: 0.3rem;
                        background: black;
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
        </NavBar>
    );
};

export default MapPage;