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
import TextField from '@mui/material/TextField';
import {CombinedParkingInfo} from './MyParkingsPage.tsx';
import {changeCarNumberForArendator, changeCarNumberForOwner} from "../api/api.ts";

const ParkingInfoPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {parkingInfo: initialParkingInfo, user} = location.state as {
        parkingInfo: CombinedParkingInfo,
        user: any
    };

    const [isEditing, setIsEditing] = React.useState(false);
    const [parkingInfo, setParkingInfo] = React.useState(initialParkingInfo);
    const [vehicle, setVehicle] = React.useState(parkingInfo.vehicle || '');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handlePayClick = () => {
        // Логика оплаты будет добавлена позже
        console.log('Оплата парковочного места', parkingInfo.number);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        setLoading(true);
        setError('');

        try {
            if (parkingInfo.isOwned) {
                // Запрос для владельца
                let response = await changeCarNumberForOwner(parkingInfo);
                if (response.status === 200) {
                    console.log("status changed succesfully")
                } else {
                    console.log("Problems with status change")
                }
            } else if (parkingInfo.isBooked) {
                let response = await changeCarNumberForArendator({bookingId: 1, vehicle: parkingInfo.vehicle});
                if (response.status === 200) {
                    console.log("status changed succesfully")
                } else {
                    console.log("Problems with status change")
                }
            }

            // Обновляем локальное состояние
            setParkingInfo({
                ...parkingInfo,
                vehicle: vehicle
            });
            setIsEditing(false);
        } catch (err) {
            setError('Ошибка при обновлении данных');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelClick = () => {
        setVehicle(parkingInfo.vehicle || '');
        setIsEditing(false);
    };

    return (
        <NavBar>
            <Box sx={{p: 3, maxWidth: 600, margin: '0 auto'}}>
                <Typography variant="h4" gutterBottom sx={{textAlign: 'center'}}>
                    Информация о парковочном месте #{parkingInfo.number}
                </Typography>

                {error && (
                    <Typography color="error" sx={{textAlign: 'center', mb: 2}}>
                        {error}
                    </Typography>
                )}

                <Paper elevation={3} sx={{p: 3, mb: 3}}>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary="Номер места"
                                secondary={parkingInfo.number}
                            />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText
                                primary="Тип"
                                secondary={parkingInfo.type}
                            />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText
                                primary="Вид"
                                secondary={parkingInfo.kind}
                            />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText
                                primary="Статус"
                                secondary={parkingInfo.status}
                            />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            {isEditing ? (
                                <TextField
                                    fullWidth
                                    label="Транспорт"
                                    value={vehicle}
                                    onChange={(e) => setVehicle(e.target.value)}
                                    variant="outlined"
                                />
                            ) : (
                                <ListItemText
                                    primary="Транспорт"
                                    secondary={parkingInfo.vehicle || 'Не указан'}
                                />
                            )}
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <ListItemText
                                primary="Статус владения"
                                secondary={parkingInfo.isOwned ? 'Вы владелец' : 'Вы не владелец'}
                            />
                        </ListItem>

                        {parkingInfo.isBooked && (
                            <>
                                <Divider/>
                                <ListItem>
                                    <ListItemText
                                        primary="Бронирование с"
                                        secondary={new Date(parkingInfo.bookingInfo!.timeFrom).toLocaleString()}
                                    />
                                </ListItem>
                                <Divider/>
                                <ListItem>
                                    <ListItemText
                                        primary="Бронирование по"
                                        secondary={new Date(parkingInfo.bookingInfo!.timeTo).toLocaleString()}
                                    />
                                </ListItem>
                                {parkingInfo.rentalInfo && (
                                    <>
                                        <Divider/>
                                        <ListItem>
                                            <ListItemText
                                                primary="Стоимость за час"
                                                secondary={`${parkingInfo.rentalInfo.costPerHour} руб.`}
                                            />
                                        </ListItem>
                                        <Divider/>
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
                    {!isEditing ? (
                        <>
                            {parkingInfo.isBooked && !parkingInfo.isOwned && (
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handlePayClick}
                                    disabled={loading}
                                >
                                    Оплатить
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                onClick={handleEditClick}
                                disabled={loading}
                            >
                                Редактировать
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => navigate(-1)}
                                disabled={loading}
                            >
                                Назад к списку
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSaveClick}
                                disabled={loading}
                            >
                                {loading ? 'Сохранение...' : 'Сохранить'}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleCancelClick}
                                disabled={loading}
                            >
                                Отмена
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
        </NavBar>
    );
};

export default ParkingInfoPage;