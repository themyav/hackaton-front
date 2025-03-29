import * as React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NavBar from '../navigation/NavBar.tsx';
import {User} from "../interfaces/Interfaces";

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
    const [startDate, setStartDate] = React.useState<string>('');
    const [endDate, setEndDate] = React.useState<string>('');
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

    return (
        <NavBar>
            <Box sx={{p: 3, maxWidth: 800, margin: '0 auto'}}>
                <Typography variant="h4" gutterBottom>
                    Формирование отчета
                </Typography>
                <Typography gutterBottom>
                    Получения отчета по местам, которые {user?.phone} сдает в аренду
                </Typography>

                <Box sx={{display: 'flex', gap: 2, mb: 3}}>
                    <TextField
                        label="Начальная дата отчета"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <TextField
                        label="Конечная дата отчета"
                        type="date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
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
                                    <Chip key={value} label={value} onDelete={handleDeletePlace(value)} />
                                ))}
                            </Box>
                        )}
                    >
                        <MenuItem onClick={(e) => { e.stopPropagation(); handleSelectAll(); }}>
                            <em>Выбрать все</em>
                        </MenuItem>
                        <MenuItem onClick={(e) => { e.stopPropagation(); handleClearAll(); }}>
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
        </NavBar>
    );
}

export default ReportPage;