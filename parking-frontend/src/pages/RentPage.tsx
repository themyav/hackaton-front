import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NavBar from '../navigation/NavBar.tsx';


function RentPage() {
    const navigate = useNavigate();

    return (
        <NavBar>
            <Box sx={{p: 3, textAlign: 'center'}}>
                <Typography variant="h4" gutterBottom>
                    Аренда парковки
                </Typography>
                <Typography>
                    Аренда парковочного места ИЛИ сдача своего авто в аренду
                </Typography>
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

export default RentPage;