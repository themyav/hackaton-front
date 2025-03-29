import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NavBar from '../navigation/NavBar.tsx';
import Box from '@mui/material/Box';


interface User {
    phone: string;
    password: string;
}

const MyParkingsPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user] = React.useState<User>(location.state?.user || { phone: '', password: '' });

    return (
        <NavBar>
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Мои парковочные места
                </Typography>
                <Typography>
                    Список парковочных мест пользователя {user.phone}
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
};

export default MyParkingsPage;