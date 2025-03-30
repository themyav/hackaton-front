import {useState, useMemo} from 'react';
import {
    TextField,
    Button,
    Box,
    Typography
} from '@mui/material';
import {LocalizationProvider, DateTimePicker} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, {Dayjs} from 'dayjs';
import 'dayjs/locale/ru';
import duration from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {toast} from 'react-hot-toast';
import {useLocation} from "react-router-dom";
import {getUserByPhone, getRentalBySpotId} from "../api/api.ts"

dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.locale('ru');

interface BookingFormProps {
    onClose: () => void;
    number: string;
    userId: string;
    onBook: (bookingDetails: {
        start: string;
        end: string;
        vehicle: string;
        userId: string;
        number: string;
        rentalId?: string;
    }) => void;
}

const BookingForm = ({onClose, onBook, number, userId}: BookingFormProps) => {
    const [bookingData, setBookingData] = useState({
        startDateTime: null as Dayjs | null,
        endDateTime: null as Dayjs | null,
        vehicle: "",
        userId: userId,
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const location = useLocation();
    const user = location.state?.user;

    const handlePhone = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const cleanedPhone = value.replace(/\D/g, '');

        setBookingData(prev => ({
            ...prev,
            phone: value
        }));

        if (cleanedPhone.length >= 11) {
            try {
                const response = await getUserByPhone(cleanedPhone);

                if (response.data?.user) {
                    setBookingData(prev => ({
                        ...prev,
                        userId: response.data.user.id
                    }));
                    toast.success(`Пользователь ${response.data.user.name} найден`);
                } else {
                    toast.error('Пользователь с таким номером не найден');
                }
            } catch (error) {
                console.error('Ошибка поиска пользователя:', error);
                toast.error('Ошибка при поиске пользователя');
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setBookingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateTimeChange = (name: 'startDateTime' | 'endDateTime', value: Dayjs | null) => {
        setBookingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!bookingData.startDateTime || !bookingData.endDateTime) {
                throw new Error('Укажите дату и время начала/окончания');
            }

            if (!bookingData.vehicle) {
                throw new Error('Укажите номер машины');
            }

            if (bookingData.startDateTime.isAfter(bookingData.endDateTime)) {
                throw new Error('Дата окончания не может быть раньше даты начала');
            }

            if (bookingData.startDateTime.isSame(bookingData.endDateTime)) {
                throw new Error('Время бронирования должно быть больше 0');
            }

            const currentUserId = user?.userType === "REGULAR_USER_TYPE" ? user.id : bookingData.userId;

            // Получаем rentalId асинхронно
            let rentalId = '';
            try {
                const rentalResponse = await getRentalBySpotId(number);
                rentalId = rentalResponse.data?.rentalId || '';
            } catch (error) {
                console.error('Ошибка получения rentalId:', error);
            }

            const bookingDetails = {
                start: bookingData.startDateTime.toISOString(),
                end: bookingData.endDateTime.toISOString(),
                vehicle: bookingData.vehicle,
                userId: currentUserId,
                number: number,
                ...(rentalId && { rentalId }) // Добавляем rentalId только если он есть
            };

            onBook(bookingDetails);
            onClose();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const durationText = useMemo(() => {
        if (!bookingData.startDateTime || !bookingData.endDateTime) return '';

        const minutes = bookingData.endDateTime.diff(bookingData.startDateTime, 'minute');
        if (minutes < 60) return `${minutes} мин`;

        const hours = bookingData.endDateTime.diff(bookingData.startDateTime, 'hour');
        const remainingMinutes = minutes % 60;
        return `${hours} ч ${remainingMinutes > 0 ? remainingMinutes + ' мин' : ''}`;
    }, [bookingData.startDateTime, bookingData.endDateTime]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    maxWidth: 400,
                    mx: 'auto',
                    p: 3,
                    borderRadius: 2,
                    bgcolor: 'background.paper',
                    boxShadow: 1
                }}
            >
                <Typography variant="h6" align="center">
                    Бронирование места {number}
                </Typography>

                {error && (
                    <Typography color="error" align="center">
                        {error}
                    </Typography>
                )}

                <TextField
                    label="Номер машины"
                    name="vehicle"
                    value={bookingData.vehicle}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{mb: 2}}
                />

                <DateTimePicker
                    label="Начало бронирования"
                    value={bookingData.startDateTime}
                    onChange={(newValue) => handleDateTimeChange('startDateTime', newValue)}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            required: true,
                        },
                    }}
                    minDateTime={dayjs()}
                    format="DD.MM.YYYY HH:mm"
                />

                <DateTimePicker
                    label="Окончание бронирования"
                    value={bookingData.endDateTime}
                    onChange={(newValue) => handleDateTimeChange('endDateTime', newValue)}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                            required: true,
                        },
                    }}
                    minDateTime={bookingData.startDateTime || dayjs()}
                    format="DD.MM.YYYY HH:mm"
                />

                <TextField
                    label="Длительность брони"
                    value={durationText || '—'}
                    InputProps={{readOnly: true}}
                    fullWidth
                />

                {user?.userType === "ADMINISTRATOR_USER_TYPE" && (
                    <TextField
                        label="Телефон пользователя"
                        value={bookingData.phone}
                        onChange={handlePhone}
                        placeholder="+7 (XXX) XXX-XX-XX"
                        fullWidth
                    />
                )}

                <Box sx={{display: 'flex', gap: 2}}>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={onClose}
                        disabled={loading}
                    >
                        Отмена
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                    >
                        {loading ? 'Обработка...' : 'Забронировать'}
                    </Button>
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default BookingForm;