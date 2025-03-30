import * as React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NavBar from '../navigation/NavBar.tsx';
import {User} from "../interfaces/Interfaces";
import {DatePicker, DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import duration from "dayjs/plugin/duration";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";


dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.locale('ru');

// Mock function to get parking places
const getAllParkingPlacesById = (userId: number): number[] => {
    // This is a stub - in a real app, this would be an API call
    return [101, 102, 103, 104, 105, 201, 202, 203];
};

function ReportPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const user: User = location.state?.user;

    // State for form
    const [startDate, setStartDate] = React.useState<Dayjs | null>(null);
    const [endDate, setEndDate] = React.useState<Dayjs | null>(null);


    const [selectedPlaces, setSelectedPlaces] = React.useState<number[]>([]);
    const [showReport, setShowReport] = React.useState(false);
    const [allPlaces] = React.useState<number[]>(getAllParkingPlacesById(user?.id || 0));

    const handlePlaceChange = (event: SelectChangeEvent<typeof selectedPlaces>) => {
        const value = event.target.value;
        setSelectedPlaces(typeof value === 'string' ? value.split(',').map(Number) : value);
    };

    const handleDeletePlace = (placeToDelete: number) => () => {
        setSelectedPlaces((places) => places.filter((place) => place !== placeToDelete));
    };

    const handleSelectAll = () => {
        setSelectedPlaces([...allPlaces]);
    };

    const handleClearAll = () => {
        setSelectedPlaces([]);
    };

    const handleGenerateReport = () => {
        setShowReport(true);
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

                    <Box sx={{display: 'flex', gap: 2, mb: 3}}>
                        <DatePicker
                            label="Начало бронирования"
                            value={startDate}
                            onChange={(newValue) => handleStartDateChange(newValue)}
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
                            onChange={(newValue) => handleEndDateChange(newValue)}
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
                                            onMouseDown={(event) => event.stopPropagation()} // Добавлено
                                        />
                                    ))}
                                </Box>
                            )}
                        >
                            <MenuItem
                                value="select-all" // Добавлено значение
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSelectAll();
                                }}
                            >
                                <em>Выбрать все</em>
                            </MenuItem>
                            <MenuItem
                                value="clear-all" // Добавлено значение
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClearAll();
                                }}
                            >
                                <em>Очистить выделение</em>
                            </MenuItem>
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
                        >
                            Назад
                        </Button>
                        <Button
                            variant="contained"
                            onClick={handleGenerateReport}
                            disabled={!startDate || !endDate || selectedPlaces.length === 0}
                        >
                            Получить отчет
                        </Button>
                    </Box>

                    {showReport && (
                        <Box sx={{mt: 4, p: 2, border: '1px dashed grey', borderRadius: 1}}>
                            <Typography variant="h6" gutterBottom>
                                Ваш отчет --- ниже
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Здесь будет сгенерированный отчет
                            </Typography>
                        </Box>
                    )}
                </Box>
            </LocalizationProvider>
        </NavBar>
    );
}

export default ReportPage;