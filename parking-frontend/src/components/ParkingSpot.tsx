import {useState} from "react";
import BookingModal from "./BookingModal.tsx";
import { toast } from 'react-hot-toast';

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



    const handlePurchase = async () => {
        try {

            await new Promise(resolve => setTimeout(resolve, 500));

            console.log("Купили место", number);

            // throw new Error("qe");
            setIsOccupied(true);
            setIsModalOpen(false);

            toast.success(`Место ${number} успешно приобретено!`);
        } catch (error) {
            toast.error('Ошибка при покупке');
            console.error("Purchase error:", error);
        }
    };

    const handleBook = async (bookingDetails: {
        spot: string;
        start: string;
        end: string;
        price: string;
    }) => {
        try {
            const loadingToast = toast.loading('Бронируем место...');

            // Имитация API-запроса
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log("Бронь создана:", bookingDetails);
            setIsOccupied(true);
            setIsModalOpen(false);

            toast.success(`Место ${number} успешно забронировано!`, {
                duration: 4000,
            });
        } catch (error) {
            toast.error('Ошибка при бронировании');
            console.error("Booking error:", error);
        }
        // Убрали finally с toast.dismiss()
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
                    onPurchase={handlePurchase}
                />
            </div>
        </>
    );
};

export default ParkingSpot;