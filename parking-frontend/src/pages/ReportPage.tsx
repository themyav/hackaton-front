import * as React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NavBar from '../navigation/NavBar.tsx';
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {getAllMyBookings, getAllOwnedPlaces} from "../api/api.ts";

dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.locale('ru');

function ReportPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

    // State for form
    const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
    const [endDate, setEndDate] = React.useState<Dayjs | null>(null);
    const [selectedPlaces, setSelectedPlaces] = React.useState<number[]>([]);
    const [showReport, setShowReport] = React.useState(false);
    const [allPlaces, setAllPlaces] = React.useState<number[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [reportData, setReportData] = React.useState<any>(null);

    React.useEffect(() => {
        const fetchParkingPlaces = async () => {
            try {
                if (user?.id) {
                    const response = await getAllOwnedPlaces(user.id);
                    const places = response.data.parkingLot.map(lot => Number(lot.number));
                    setAllPlaces(places);
                }
            } catch (error) {
                console.error('Failed to fetch parking places:', error);
                setError('Ошибка загрузки парковочных мест');
            } finally {
                setLoading(false);
            }
        };

        fetchParkingPlaces();
    }, [user?.id]);

    const handlePlaceChange = (event: SelectChangeEvent<typeof selectedPlaces>) => {
        const value = event.target.value;
        setSelectedPlaces(typeof value === 'string' ? value.split(',').map(Number) : value);
    };

    const handleDeletePlace = (placeToDelete: number) => () => {
        setSelectedPlaces((places) => places.filter((place) => place !== placeToDelete));
    };

    const handleGenerateReport = async () => {
        if (!user?.id || !startDate || !endDate) return;

        setLoading(true);
        setError(null);

        try {
            const response = await getAllMyBookings(
                user.id,
                startDate.toISOString(),
                endDate.toISOString()
            );

            if (response.status === 200) {
                // Filter bookings by selected places if any are selected
                const filteredBookings = selectedPlaces.length > 0
                    ? response.data.bookings.filter((booking: any) =>
                        selectedPlaces.includes(Number(booking.parkingLot))
                    )
                    : response.data.bookings;

                setReportData({
                    bookings: filteredBookings,
                    total: response.data.total
                });
                setShowReport(true);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setError('Ошибка получения данных о бронированиях');
        } finally {
            setLoading(false);
        }
    };

    const handleStartDateChange = (newValue: Dayjs | null) => {
        setStartDate(newValue);
        if (newValue && endDate && newValue.isAfter(endDate)) {
            setEndDate(null);
        }
    };

    const handleEndDateChange = (newValue: Dayjs | null) => {
        setEndDate(newValue);
    };

    return (
        <NavBar>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{p: 3, maxWidth: 800, margin: '0 auto'}}>
                    <Typography variant="h4" gutterBottom>
                        Формирование отчета
                    </Typography>
                    <Typography gutterBottom>
                        Здесь можно сформировать отчет по парковочным местам, которые Вы сдавали в аренду.
                    </Typography>

                    {error && (
                        <Typography color="error" sx={{mb: 2}}>
                            {error}
                        </Typography>
                    )}

                    <Box sx={{display: 'flex', gap: 2, mb: 3}}>
                        <DatePicker
                            label="Начало бронирования"
                            value={startDate}
                            onChange={handleStartDateChange}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    required: true,
                                },
                            }}
                            minDate={dayjs()}
                            format="DD.MM.YYYY"
                        />

                        <DatePicker
                            label="Окончание бронирования"
                            value={endDate}
                            onChange={handleEndDateChange}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    required: true,
                                },
                            }}
                            minDate={startDate || dayjs()}
                            format="DD.MM.YYYY"
                        />
                    </Box>

                    <FormControl fullWidth sx={{mb: 2}}>
                        <InputLabel id="parking-places-label">Номера парковочных мест</InputLabel>
                        <Select
                            labelId="parking-places-label"
                            id="parking-places"
                            multiple
                            value={selectedPlaces}
                            onChange={handlePlaceChange}
                            renderValue={(selected) => (
                                <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            onDelete={handleDeletePlace(value)}
                                            onMouseDown={(event) => event.stopPropagation()}
                                        />
                                    ))}
                                </Box>
                            )}
                            disabled={loading}
                        >
                            {allPlaces.map((place) => (
                                <MenuItem key={place} value={place}>
                                    {place}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 3}}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate(-1)}
                            disabled={loading}
                        >
                            Назад
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleGenerateReport}
                            disabled={!startDate || !endDate || loading}
                        >
                            {loading ? 'Загрузка...' : 'Получить отчет'}
                        </Button>
                    </Box>

                    {showReport && reportData && (
                        <Box sx={{mt: 4, p: 2, border: '1px dashed grey', borderRadius: 1}}>
                            <Typography variant="h6" gutterBottom>
                                Отчет о бронированиях
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                Всего бронирований: {reportData.total}
                            </Typography>

                            {reportData.bookings.length > 0 ? (
                                <Box sx={{mt: 2}}>
                                    {reportData.bookings.map((booking: any, index: number) => (
                                        <Box key={index} sx={{mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1}}>
                                            <Typography>Парковочное место: {booking.parkingLot}</Typography>
                                            <Typography>Транспорт: {booking.vehicle}</Typography>
                                            <Typography>Начало: {dayjs(booking.timeFrom).format('DD.MM.YYYY HH:mm')}</Typography>
                                            <Typography>Окончание: {dayjs(booking.timeTo).format('DD.MM.YYYY HH:mm')}</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            ) : (
                                <Typography variant="body2" color="text.secondary">
                                    Нет данных о бронированиях для выбранных параметров
                                </Typography>
                            )}
                        </Box>
                    )}
                </Box>
            </LocalizationProvider>
        </NavBar>
    );
}

export default ReportPage;