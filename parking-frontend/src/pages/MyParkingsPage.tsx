import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function MyParkingsPage() {
    const navigate = useNavigate();

    return (
        <Box sx={{p: 3, textAlign: 'center'}}>
            <Typography variant="h4" gutterBottom>
                Мои парковочные места
            </Typography>
            <Typography>
                Список парковочных мест пользователя
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate(-1)}
            >
                Назад
            </Button>
        </Box>
    );
}

export default MyParkingsPage;