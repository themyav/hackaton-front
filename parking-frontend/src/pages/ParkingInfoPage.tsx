// ParkingInfoPage.tsx
import * as React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NavBar from '../navigation/NavBar.tsx';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {CombinedParkingInfo} from './MyParkingsPage';

const ParkingInfoPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { parkingInfo, user } = location.state as {
        parkingInfo: CombinedParkingInfo,
        user: User
    };

    const handlePayClick = () => {
        // Логика оплаты будет добавлена позже
        console.log('Оплата парковочного места', parkingInfo.number);
    };

    return (
        <NavBar>
            <Box sx={{p: 3, maxWidth: 600, margin: '0 auto'}}>
                <Typography variant="h4" gutterBottom sx={{textAlign: 'center'}}>
                    Информация о парковочном месте #{parkingInfo.number}
                </Typography>

                <Paper elevation={3} sx={{p: 3, mb: 3}}>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary="Номер места"
                                secondary={parkingInfo.number}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="Тип"
                                secondary={parkingInfo.type}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="Вид"
                                secondary={parkingInfo.kind}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="Статус"
                                secondary={parkingInfo.status}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="Транспорт"
                                secondary={parkingInfo.vehicle || 'Не указан'}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="Статус владения"
                                secondary={parkingInfo.isOwned ? 'Вы владелец' : 'Вы не владелец'}
                            />
                        </ListItem>

                        {parkingInfo.isBooked && (
                            <>
                                <Divider />
                                <ListItem>
                                    <ListItemText
                                        primary="Бронирование с"
                                        secondary={new Date(parkingInfo.bookingInfo!.timeFrom).toLocaleString()}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText
                                        primary="Бронирование по"
                                        secondary={new Date(parkingInfo.bookingInfo!.timeTo).toLocaleString()}
                                    />
                                </ListItem>
                                {parkingInfo.rentalInfo && (
                                    <>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText
                                                primary="Стоимость за час"
                                                secondary={`${parkingInfo.rentalInfo.costPerHour} руб.`}
                                            />
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemText
                                                primary="Стоимость за день"
                                                secondary={`${parkingInfo.rentalInfo.costPerDay} руб.`}
                                            />
                                        </ListItem>
                                    </>
                                )}
                            </>
                        )}
                    </List>
                </Paper>

                <Box sx={{display: 'flex', justifyContent: 'center', gap: 2}}>
                    {parkingInfo.isBooked && !parkingInfo.isOwned && (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handlePayClick}
                        >
                            Оплатить
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        onClick={() => navigate(-1)}
                    >
                        Назад к списку
                    </Button>
                </Box>
            </Box>
        </NavBar>
    );
};

export default ParkingInfoPage;