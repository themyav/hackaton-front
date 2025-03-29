import {useState} from "react";
import BookingModal from "./BookingModal.tsx";

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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSpotClick = () => {
        setIsModalOpen(true);

    };

    const handleBook = (bookingDetails: {
        spot: string;
        start: string;
        end: string;
        price: string;
    }) => {
        console.log("Бронь создана:", bookingDetails);
        setIsOccupied(true);
        setIsModalOpen(false);
    };

    return (
        <>
            <style>
                {`                
                .disabledIcon {
                    position: absolute;
                    top: 5px;
                    left: 5px;
                    font-size: 20px;
                    transform: none;
                    z-index: 1; 
                }
                
                .spot {
                    width: 60px;
                    height: 90px;
                    color: black;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    border: 1px solid black;
                    border-bottom: 1px solid white;
                    position: relative;
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
                    background-color: #add8e6;
                }
                
                .occupied {
                    background-color: grey;
                    cursor: not-allowed;
                }
                `}
            </style>

            <div style={{position: "relative", width: "60px", height: "100px"}}>
                <div
                    className={[
                        "spot",
                        isOccupied && "occupied",
                        isDisabled && "disabled"
                    ].filter(Boolean).join(" ")}
                    onClick={handleSpotClick}
                    style={{transform: `rotate(${angle}deg)`}}
                />
                <span className="spotNumber">{number}</span>
                {isDisabled && <div className="disabledIcon">♿</div>}

                <BookingModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    spotNumber={number}
                    onBook={handleBook}
                />
            </div>
        </>
    );
};

export default ParkingSpot;