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
    }) => void;
}


const BookingForm = ({onClose, onBook}: BookingFormProps) => {
    const [bookingData, setBookingData] = useState({
        startDateTime: null as Dayjs | null,
        endDateTime: null as Dayjs | null,
        number: "",
        vehicle: null,
        userId: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const location = useLocation();
    const user = location.state?.user;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setBookingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateTimeChange = (name: 'startDateTime' | 'endDateTime', value: Dayjs | null) => {
        const newData = {
            ...bookingData,
            [name]: value
        };
        setBookingData(newData);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // try {
        // Валидация (остается без изменений)
        if (!bookingData.startDateTime || !bookingData.endDateTime) {
            setError('Укажите дату и время начала/окончания');
            toast.error('Заполните все поля');
            setLoading(false);
            return;
        }

        if (!bookingData.vehicle) {
            setError('Укажите номер машины');
            toast.error('Введите номер автомобиля');
            setLoading(false);
            return;
        }

        if (bookingData.startDateTime.isAfter(bookingData.endDateTime)) {
            setError('Дата окончания не может быть раньше даты начала');
            toast.error('Некорректные даты бронирования');
            setLoading(false);
            return;
        }

        if (bookingData.startDateTime.isSame(bookingData.endDateTime)) {
            setError('Время бронирования должно быть больше 0');
            toast.error('Минимальное время брони - 1 час');
            setLoading(false);
            return;
        }

        const bookingDetails = {
            number: bookingData.number,
            start: bookingData.startDateTime.format('YYYY-MM-DD HH:mm'),
            end: bookingData.endDateTime.format('YYYY-MM-DD HH:mm'),
            userId: bookingData.userId,
            vehicle: bookingData.vehicle
        };
        onBook(bookingDetails);
        onClose();

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
                    Бронирование места {}
                </Typography>

                {error && (
                    <Typography color="error" align="center">
                        {error}
                    </Typography>
                )}


                <TextField
                    label="Номер машины"
                    value={bookingData.vehicle}
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

                {user.userType === "REGULAR_USER_TYPE" &&
                    <TextField
                        label="Пользователь"
                        value={user.id}
                        InputProps={{readOnly: true}}
                        fullWidth
                    />
                }

                {user.userType === "ADMINISTRATOR_USER_TYPE" &&
                    <TextField
                        label="Пользователь"
                        value={bookingData.userId}
                        fullWidth
                    />
                }


                <Box sx={{display: 'flex', gap: 2}}>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={onClose}
                    >
                        Отмена
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading || !bookingData.vehicle}
                    >
                        {loading ? 'Обработка...' : 'Забронировать'}
                    </Button>
                </Box>
            </Box>
        </LocalizationProvider>
    );
};

export default BookingForm;