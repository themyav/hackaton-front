// ParkingSpot.tsx
import {useEffect, useState} from "react";
import BookingModal from "./BookingModal.tsx";
import {toast} from 'react-hot-toast';
import {ParkingSpotKinds, ParkingSpotStatus, ParkingSpotType} from "../constants/enum.ts";
import {addBooking, getParkingSpotList, getSpotsByOwnerId} from "../api/api.ts"
import {useLocation} from "react-router-dom";
import dayjs from "dayjs";

// ParkingSpot.tsx
interface ParkingSpotProps {
    number: number;
    kind?: ParkingSpotKinds;
    type?: ParkingSpotType | null;
    status?: ParkingSpotStatus | null;
    owner_id?: string | null;
    vehicle?: string | null;
    angle?: number;
}


interface ParkingLot {
    number: string;
    kind: string;
    type: string;
    status: string;
    vehicle: string;
    ownerId: string;
}

interface Booking {
    userId: string;
    parkingLot: string;
    vehicle: string;
    timeFrom: string;
    timeTo: string;
    bookingId: string;
}

interface Rental {
    rentalId: string;
    parkingLot: string;
    timeFrom: string;
    timeTo: string;
    costPerHour: string;
    costPerDay: string;
}

interface ApiResponse {
    bookings: Booking[];
    rentals: Rental[];
    parkingLots: ParkingLot[];
    total: string;
}

interface UnifiedParkingSpot {
    number: string;
    kind: ParkingSpotKinds;
    type: ParkingSpotType;
    status: ParkingSpotStatus;
    vehicle: string;
    ownerId: string;
    rented: boolean;
    timeFrom: string | null;
    timeTo: string | null;
    bookingId?: string; // только для арендованных
}

function isTimeDifferenceMoreThanTwoHours(start, end) {
    if (!start || !end) return false;

    // Преобразуем время в минуты
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);

    const startTotal = startHours * 60 + startMinutes;
    const endTotal = endHours * 60 + endMinutes;

    // Если время окончания меньше времени начала, предполагаем, что это на следующий день
    const diff = endTotal < startTotal ?
        (1440 - startTotal + endTotal) :
        (endTotal - startTotal);

    return diff > 120; // 120 минут = 2 часа
}

const getUnifiedParkingSpots = async (id: string): Promise<UnifiedParkingSpot[]> => {
    try {
        const response = await getSpotsByOwnerId(id);
        const now = dayjs();

        // Обработка данных
        const rentedSpots = response.data.bookings
            .filter(booking => dayjs(booking.timeTo).isAfter(now))
            .map(booking => {
                const parkingLot = response.data.parkingLots.find(lot => lot.number === booking.parkingLot);
                const type = isTimeDifferenceMoreThanTwoHours(booking.timeFrom, booking.timeTo)
                    ? ParkingSpotType.ShortTermRentByMeParkingType
                    : ParkingSpotType.LongTermRentByMeParkingType;

                return {
                    number: booking.parkingLot,
                    kind: parkingLot?.kind || ParkingSpotKinds.REGULAR_PARKING_KIND,
                    type: type,
                    status: ParkingSpotStatus.MineParkingLotStatus,
                    vehicle: booking.vehicle,
                    ownerId: booking.userId,
                    rented: true,
                    timeFrom: booking.timeFrom,
                    timeTo: booking.timeTo,
                    bookingId: booking.bookingId
                };
            });

        const nonRentedSpots = response.data.parkingLots
            .filter(lot => !response.data.bookings.some(
                booking => booking.parkingLot === lot.number && dayjs(booking.timeTo).isAfter(now)
            ))
            .map(lot => ({
                number: lot.number,
                kind: lot.kind as ParkingSpotKinds,
                type: lot.type as ParkingSpotType,
                status: lot.status as ParkingSpotStatus,
                vehicle: lot.vehicle,
                ownerId: lot.ownerId,
                rented: false,
                timeFrom: null,
                timeTo: null
            }));

        return [...rentedSpots, ...nonRentedSpots];
    } catch (error) {
        console.error("Ошибка загрузки парковочных мест:", error);
        return [];
    }
};


const ParkingSpot: React.FC<ParkingSpotProps> = ({
                                                     number,
                                                     kind,
                                                     type,
                                                     status,
                                                     angle = 0,
                                                     vehicle,

                                                 }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [unifiedSpots, setUnifiedSpots] = useState<UnifiedParkingSpot[]>([]);
    const location = useLocation();
    const user = location.state?.user;

    useEffect(() => {
        const loadData = async () => {
            if (user.id) {
                const spots = await getUnifiedParkingSpots(user.id);
                setUnifiedSpots(spots);
            }
        };
        loadData();
    }, [user.id]);

    console.log("unifiedSpots", unifiedSpots)

    const getSpotClassesAndSymbols = () => {
        const classNames: string[] = [];
        const symbols: string[] = [];

        // Обрабатываем kind
        switch (kind) {
            case ParkingSpotKinds.INCLUSIVE_PARKING_KIND:
                symbols.push("♿");
                classNames.push("busyStatus")
                break;
            case ParkingSpotKinds.SPECIAL_PARKING_KIND:
                symbols.push("🚔");
                classNames.push("busyStatus")
                break;
        }

        if (kind !== ParkingSpotKinds.REGULAR_PARKING_KIND) {
            return {classNames, symbols};
        }

        // Обрабатываем status
        switch (status) {
            case ParkingSpotStatus.FreeParkingLotStatus:
                classNames.push("freeStatus");
                break;
            case ParkingSpotStatus.BusyParkingLotStatus:
                classNames.push("busyStatus");
                break;
            case ParkingSpotStatus.MineParkingLotStatus:
                classNames.push("mineStatus");
                break;
            case ParkingSpotStatus.ExpiredParkingLotStatus:
                classNames.push("expiredStatus");
                break;
        }

        // Обрабатываем type
        switch (type) {
            case ParkingSpotType.UndefinedParkingType:
                break
            case ParkingSpotType.OwnedParkingType:
                symbols.push("🔒");
                break;
            case ParkingSpotType.LongTermRentByMeParkingType:
                symbols.push("💰");
                break;
            case ParkingSpotType.ShortTermRentByMeParkingType:
                symbols.push("💰🕧");
                break;
            case ParkingSpotType.LongTermRentByOtherParkingType:
                symbols.push("🅿️");
                break;
            case ParkingSpotType.ShortTermRentByOtherParkingType:
                symbols.push("🅿️🕧");
                break;
        }

        return {classNames, symbols};
    };

    const {classNames, symbols} = getSpotClassesAndSymbols();

    const handleSpotClick = () => {
        setIsModalOpen(true);
    };

    const handlePurchase = async () => {
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            toast.success(`Место ${number} успешно приобретено!`);
            setIsModalOpen(false);
        } catch (error) {
            toast.error('Ошибка при покупке');
            console.error("Purchase error:", error);
        }
    };

    const handleBook = async (bookingDetails: {
        start: string;
        end: string;
        vehicle: string;
        userId: string;
        number: string
        rentalId: string
    }) => {
        try {
            const loadingToast = toast.loading('Бронируем место...');

            const bookingData = {
                booking: {
                    userId: bookingDetails.userId,
                    parkingLot: bookingDetails.number,
                    vehicle: bookingDetails.vehicle,
                    timeFrom: bookingDetails.start,
                    timeTo: bookingDetails.end,
                    bookingId: bookingDetails.rentalId
                }
            };

            await addBooking(bookingData);

            toast.dismiss(loadingToast);
            toast.success(`Место ${number} успешно забронировано!`, {duration: 4000});
            setIsModalOpen(false);
        } catch (error) {
            toast.error('Ошибка при бронировании');
            console.error("Booking error:", error);
        }
    };

    return (
        <>
            <style>
                {`         
                
                .busyStatus {
                    background-color: #918e8e;
                }
                
                .freeStatus {
                    background-color: #95d980;
                }
                
                .mineStatus {
                    background-color: #4bb8f2;
                }
                
                .expiredStatus {
                    background-color: #f06359;
                }
                
                .special {
                    background-color: #ffc107;
                }
                
                .symbols {
                    position: absolute;
                    bottom: 5px;
                    right: 5px;
                    font-size: 12px;
                }       
                .icons {
                    position: absolute;
                    top: 5px;
                    left: 5px;
                    font-size: 15px;
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
                    transition: all 0.3s ease;
                }
                
                .spotNumber {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                }

               
                `}
            </style>

            <div style={{position: "relative", width: "60px", height: "100px"}}>
                <div
                    className={[
                        "spot",
                        ...classNames,
                    ].filter(Boolean).join(" ")}
                    onClick={handleSpotClick}
                    style={{transform: `rotate(${angle}deg)`}}
                >
                    <span className="spotNumber">{number}</span>
                    {symbols.length > 0 && (
                        <span className="icons">{symbols.join('')}</span>
                    )}
                </div>


                <BookingModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    spotNumber={number.toString()}
                    onBook={handleBook}
                    onPurchase={handlePurchase}
                    status={status}
                />
            </div>
        </>
    );
};

export default ParkingSpot;