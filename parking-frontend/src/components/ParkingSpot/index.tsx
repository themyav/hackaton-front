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
                
.disabledIcon {
    position: absolute;
    top: 5px;       /* Прижат к верхнему краю */
    left: 5px;      /* Прижат к левому краю */
    font-size: 20px;
    transform: none; /* Отключаем поворот */
    z-index: 1; 
}


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

.spotNumber {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.disabled {
    background-color: #add8e6; /* Светло-голубой цвет для мест для инвалидов */
}

.occupied {
    background-color: grey;
}

        `}

            </style>


            {/*<div*/}
            {/*    className={[*/}
            {/*        "spot",*/}
            {/*        isOccupied && "occupied",*/}
            {/*        isDisabled && "disabled"*/}
            {/*    ].filter(Boolean).join(" ")}*/}

            {/*    onClick={toggleOccupied}*/}
            {/*    style={{transform: `rotate(${angle}deg)`}}*/}
            {/*>*/}
            {/*    <span style={{transform: `rotate(${-angle}deg)`}}>{number}</span>*/}
            {/*    {isDisabled && <div className="disabledIcon" style={{transform: `rotate(${-angle}deg)`}}>♿</div>}*/}
            {/*</div>*/}
            <div style={{position: "relative", width: "60px", height: "100px"}}>
                <div
                    className={[
                        "spot",
                        isOccupied && "occupied",
                        isDisabled && "disabled"
                    ].filter(Boolean).join(" ")}
                    onClick={toggleOccupied}
                    style={{transform: `rotate(${angle}deg)`}}
                />

                <span className="spotNumber">
    {number}
  </span>

                {isDisabled && (
                    <div className="disabledIcon">
                    ♿
                    </div>
                )}
            </div>
        </>
    );
};

export default ParkingSpot;
