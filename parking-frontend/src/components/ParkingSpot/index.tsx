import {useState} from "react";

interface ParkingSpotProps {
    number: string;
    isDisabled?: boolean;
    angle: number;
}

const ParkingSpot: React.FC<ParkingSpotProps> = ({
                                                     number,
                                                     isDisabled = false,
                                                     angle = 0,
                                                 }) => {
    const [isOccupied, setIsOccupied] = useState(false);

    const toggleOccupied = () => {
        setIsOccupied((prev) => !prev);
    };

    return (
        <>
            <style>
                {`
.spot {
    width: 60px;
    height: 100px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid black;
    border-bottom: 1px solid white;
    position: relative; /* Для позиционирования иконки */
    transition: background-color 0.3s ease;
}
.disabled {
    background-color: #add8e6; /* Светло-голубой цвет для мест для инвалидов */
}

.occupied {
    background-color: grey;
}

.disabledIcon {
    position:absolute;
    bottom: 5px;
    right: 5px;
    font-size: 20px;
}
        `}

            </style>


            <div
                // className={`${styles.spot} ${isOccupied ? styles.occupied : ""} ${
                //     isDisabled ? styles.disabled : ""
                // }`}

                className="spot"
                onClick={toggleOccupied}
                style={{transform: `rotate(${angle}deg)`}}
            >
                <span style={{transform: `rotate(${-angle}deg)`}}>{number}</span>
                {isDisabled && <div className="disabledIcon">♿</div>}
            </div>
        </>
    );
};

export default ParkingSpot;
