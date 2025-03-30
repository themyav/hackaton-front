// MyParkingsPage.tsx
import * as React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NavBar from '../navigation/NavBar.tsx';
import Box from '@mui/material/Box';
import {getMyParkingList} from '../api/api.ts'; // Предполагается, что функция находится здесь
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from 'react';
import {Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InfoIcon from '@mui/icons-material/Info';
import {tableStyle} from "../styles/TableStyle.tsx";


interface ParkingData {
    bookings: Array<{
        userId: string;
        parkingLot: string;
        vehicle: string;
        timeFrom: string;
        timeTo: string;
    }>;
    rentals: Array<{
        rentalId: string;
        parkingLot: string;
        timeFrom: string;
        timeTo: string;
        costPerHour: string;
        costPerDay: string;
    }>;
    parkingLots: Array<{
        number: string;
        kind: string;
        type: string;
        status: string;
        vehicle: string;
        ownerId: string;
    }>;
    total: string;
}

interface CombinedParkingInfo {
    number: string;
    kind: string;
    type: string;
    status: string;
    vehicle: string;
    bookingInfo?: {
        timeFrom: string;
        timeTo: string;
    };
    isOwned: boolean;
    isBooked: boolean;
}

const MyParkingsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;
    const [parkingData, setParkingData] = useState<ParkingData | null>(null);
    const [combinedData, setCombinedData] = useState<CombinedParkingInfo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchParkingData = async () => {
            try {
                if (!user?.id) return;

                const response = await getMyParkingList(user.id);
                setParkingData(response.data);

                const combined: CombinedParkingInfo[] = [];

                response.data.parkingLots
                    .filter(lot => lot.ownerId === user.id)
                    .forEach(lot => {
                        combined.push({
                            number: lot.number,
                            kind: lot.kind,
                            type: lot.type,
                            status: lot.status,
                            vehicle: lot.vehicle,
                            isOwned: true,
                            isBooked: false
                        });
                    });

                // Добавляем бронирования пользователя
                response.data.bookings
                    .filter(booking => booking.userId === user.id)
                    .forEach(booking => {
                        const parkingLot = response.data.parkingLots.find(lot => lot.number === booking.parkingLot);

                        combined.push({
                            number: booking.parkingLot,
                            kind: parkingLot?.kind || 'UNKNOWN',
                            type: parkingLot?.type || 'UNKNOWN',
                            status: parkingLot?.status || 'UNKNOWN',
                            vehicle: booking.vehicle,
                            bookingInfo: {
                                timeFrom: booking.timeFrom,
                                timeTo: booking.timeTo
                            },
                            isOwned: parkingLot?.ownerId === user.id,
                            isBooked: true
                        });
                    });

                setCombinedData(combined);
                setLoading(false);
            } catch (err) {
                setError('Ошибка при загрузке данных о парковках');
                setLoading(false);
                console.error(err);
            }
        };

        fetchParkingData();
    }, [user?.userId]);

    if (loading) {
        return (
            <NavBar>
                <Box sx={{p: 3, textAlign: 'center'}}>
                    <Typography variant="h4" gutterBottom>
                        Мои парковочные места
                    </Typography>
                    <Typography>Загрузка...</Typography>
                </Box>
            </NavBar>
        );
    }

    if (error) {
        return (
            <NavBar>
                <Box sx={{p: 3, textAlign: 'center'}}>
                    <Typography variant="h4" gutterBottom>
                        Мои парковочные места
                    </Typography>
                    <Typography color="error">{error}</Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate(-1)}
                    >
                        Назад
                    </Button>
                </Box>
            </NavBar>
        );
    }

    const handleInfoClick = (item: CombinedParkingInfo) => {
        navigate('/parking-info', {
            state: {
                parkingInfo: item,
                user: user
            }
        });
    };

    return (
        <NavBar>
            <Box sx={{p: 3}}>
                <Typography variant="h4" gutterBottom sx={{textAlign: 'center'}}>
                    Мои парковочные места
                </Typography>
                <Typography variant="subtitle1" sx={{textAlign: 'center', mb: 3}}>
                    Список парковочных мест пользователя {user?.phone}
                </Typography>

                {combinedData.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="parking table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Номер места</TableCell>
                                    <TableCell>Тип</TableCell>
                                    <TableCell>Вид</TableCell>
                                    <TableCell>Статус</TableCell>
                                    <TableCell>Транспорт</TableCell>
                                    <TableCell>Статус владения</TableCell>
                                    <TableCell>Бронирование</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {combinedData.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.number}</TableCell>
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell>{row.kind}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>{row.vehicle || '-'}</TableCell>
                                        <TableCell>
                                            {row.isOwned ? 'Владелец' : 'Не владелец'}
                                        </TableCell>
                                        <TableCell>
                                            {row.isBooked ? (
                                                <div>
                                                    <div>С: {new Date(row.bookingInfo!.timeFrom).toLocaleString()}</div>
                                                    <div>По: {new Date(row.bookingInfo!.timeTo).toLocaleString()}</div>
                                                </div>
                                            ) : 'Не забронировано'}
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Подробная информация">
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleInfoClick(row)}
                                                >
                                                    <InfoIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography sx={{textAlign: 'center', mt: 3}}>
                        У вас нет парковочных мест или бронирований
                    </Typography>
                )}

                <Box sx={{textAlign: 'center', mt: 3}}>
                    <Button
                        variant="contained"
                        onClick={() => navigate(-1)}
                    >
                        Назад
                    </Button>
                </Box>
            </Box>
        </NavBar>
    );
};

export default MyParkingsPage;