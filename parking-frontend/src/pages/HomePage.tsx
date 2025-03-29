import * as React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NavBar from '../navigation/NavBar.tsx';
import {User} from '../interfaces/Interfaces.ts';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user;

    const handleLogout = () => {
        navigate('/login');
    };

    const handleEditProfile = () => {
        navigate('/profile', { state: { user } });
    };

    return (
        <NavBar>
            <div style={{padding: '20px', maxWidth: '400px', margin: '0 auto'}}>
                <h1>Добро пожаловать!</h1>
                <p><strong>Телефон:</strong> {user?.phone}</p>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEditProfile}
                    style={{margin: '10px 0'}}
                >
                    Редактировать профиль
                </Button>

                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                >
                    Выйти
                </Button>
            </div>
        </NavBar>
    );
};

export default HomePage;