import { useState, useMemo } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import duration from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.locale('ru');

interface BookingData {
    startDateTime: Dayjs | null;
    endDateTime: Dayjs | null;
    price: string;
    spotNumber: string;
}

const HOUR_RATE = 100; // 100 руб/час
const DAY_RATE = 1500; // 1500 руб/день
const MIN_BOOKING_HOURS = 1;

const BookingForm = () => {
    const [bookingData, setBookingData] = useState<BookingData>({
        startDateTime: null,
        endDateTime: null,
        price: "0 ₽",
        spotNumber: "A-12"
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const calculatePrice = (start: Dayjs | null, end: Dayjs | null): string => {
        if (!start || !end) return "0 ₽";

        const durationHours = end.diff(start, 'hour', true);
        const durationDays = end.diff(start, 'day', true);

        // Минимальное время брони - 1 час
        if (durationHours < MIN_BOOKING_HOURS) return "0 ₽";

        // Если бронь больше 6 часов - выгоднее считать по дневному тарифу
        if (durationHours >= 6) {
            const days = Math.ceil(durationDays);
            return `${days * DAY_RATE} ₽`;
        }

        // Почасовой расчет
        const hours = Math.ceil(durationHours);
        return `${hours * HOUR_RATE} ₽`;
    };

    const handleDateTimeChange = (name: keyof BookingData, value: Dayjs | null) => {
        const newData = {
            ...bookingData,
            [name]: value
        };

        setBookingData(newData);

        // Пересчет цены при изменении дат
        if (name === 'startDateTime' || name === 'endDateTime') {
            const price = calculatePrice(newData.startDateTime, newData.endDateTime);
            setBookingData(prev => ({ ...prev, price }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!bookingData.startDateTime || !bookingData.endDateTime) {
            setError('Укажите дату и время начала/окончания');
            setLoading(false);
            return;
        }

        if (bookingData.startDateTime.isAfter(bookingData.endDateTime)) {
            setError('Дата окончания не может быть раньше даты начала');
            setLoading(false);
            return;
        }

        if (bookingData.startDateTime.isSame(bookingData.endDateTime)) {
            setError('Время бронирования должно быть больше 0');
            setLoading(false);
            return;
        }

        const bookingDetails = {
            spot: bookingData.spotNumber,
            start: bookingData.startDateTime.format('YYYY-MM-DD HH:mm'),
            end: bookingData.endDateTime.format('YYYY-MM-DD HH:mm'),
            price: bookingData.price,
            duration: bookingData.endDateTime.diff(bookingData.startDateTime, 'minute')
        };

        console.log('Данные бронирования:', bookingDetails);

        setTimeout(() => {
            setLoading(false);
            alert(`Бронь успешно создана! Стоимость: ${bookingData.price}`);
        }, 1000);
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
                    Бронирование парковочного места
                </Typography>

                {error && (
                    <Typography color="error" align="center">
                        {error}
                    </Typography>
                )}

                {loading && (
                    <Typography color="text.secondary" align="center">
                        Обработка запроса...
                    </Typography>
                )}

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
                    InputProps={{ readOnly: true }}
                    fullWidth
                />

                <TextField
                    label="Номер парковочного места"
                    value={bookingData.spotNumber}
                    InputProps={{ readOnly: true }}
                    fullWidth
                />

                <TextField
                    label="Стоимость"
                    value={bookingData.price}
                    InputProps={{ readOnly: true }}
                    fullWidth
                />

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading || bookingData.price === "0 ₽"}
                    sx={{ mt: 2 }}
                >
                    Забронировать
                </Button>
            </Box>
        </LocalizationProvider>
    );
};

export default BookingForm;