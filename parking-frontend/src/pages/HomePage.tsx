import * as React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import NavBar from '../navigation/NavBar.tsx';
import {handleUserType} from "../formatters/UserTypeFormatter.ts";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

    const handleLogout = () => {
        navigate('/login');
    };

    const handleEditProfile = () => {
        navigate('/profile', {state: {user}});
    };

    const printHelloMessage = () => {
        if (user.name === '' || user.name === undefined) return "Добро пожаловать!"
        else return `Добро пожаловать, ${user.name}!`
    }

    return (
        <NavBar>
            <Box sx={{
                p: 4,
                maxWidth: '500px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {printHelloMessage()}
                </Typography>

                <Paper elevation={3} sx={{p: 3, borderRadius: 2}}>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                        <Box>
                            <Typography variant="overline" color="text.secondary">
                                Номер телефона
                            </Typography>
                            <Typography variant="body1">
                                {user.phoneNumber}
                            </Typography>
                        </Box>

                        <Divider/>

                        <Box>
                            <Typography variant="overline" color="text.secondary">
                                Тип пользователя
                            </Typography>
                            <Typography variant="body1">
                                {handleUserType(user.userType)}
                            </Typography>
                        </Box>

                        <Divider/>

                        <Box>
                            <Typography variant="overline" color="text.secondary">
                                ФИО
                            </Typography>
                            <Typography variant="body1">
                                {user.surname} {user.name} {user.patronimic}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    mt: 2,
                    flexDirection: {xs: 'column', sm: 'row'}
                }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEditProfile}
                        fullWidth
                        size="large"
                    >
                        Редактировать профиль
                    </Button>

                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleLogout}
                        fullWidth
                        size="large"
                    >
                        Выйти
                    </Button>
                </Box>
            </Box>
        </NavBar>
    );
};

export default HomePage;