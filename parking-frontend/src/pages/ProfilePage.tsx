import * as React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import NavBar from "../navigation/NavBar.tsx";
import {updateUser} from "../api/api.ts";
import {useState} from "react";
import {handleUserType} from "../formatters/UserTypeFormatter.ts";

function ProfilePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = React.useState(location.state?.user || {
        id: '',
        phoneNumber: '',
        userType: '',
        name: '',
        surname: '',
        patronimic: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleSave = async () => {
        setError('');
        setLoading(true);

        try {
            const response = await updateUser(user);
            if (response.status === 200) {
                setSaveSuccess(true);
                location.state.user = user
            }
        } catch (error) {
            setError('Ошибка при сохранении данных. Пожалуйста, попробуйте позже.');
            console.error('Update Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/home", {state: {user: location.state.user}}); // Возвращаемся назад
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    };


    return (
        <NavBar>
            <Box sx={{p: 3, maxWidth: '400px', margin: '0 auto'}}>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                    <IconButton onClick={() => navigate(-1)} sx={{mr: 1}}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <Typography variant="h5">Редактирование профиля</Typography>
                </Box>

                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                    {error && (
                        <Typography color="error" textAlign="center" sx={{mb: 2}}>
                            {error}
                        </Typography>
                    )}
                    {saveSuccess && (
                        <Typography color="success.main" textAlign="center" sx={{mb: 2}}>
                            Данные успешно сохранены!
                        </Typography>
                    )}
                    {loading && (
                        <Typography color="text.secondary" textAlign="center" sx={{mb: 2}}>
                            Подождите...
                        </Typography>
                    )}

                    <TextField
                        label="Номер телефона"
                        variant="outlined"
                        fullWidth
                        name="phoneNumber"
                        value={user.phoneNumber}
                        disabled
                    />
                    <TextField
                        label="Тип пользователя"
                        variant="outlined"
                        fullWidth
                        name="user_type"
                        value={handleUserType(user.userType)}
                        disabled
                    />
                    <TextField
                        label="Имя"
                        variant="outlined"
                        fullWidth
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <TextField
                        label="Фамилия"
                        variant="outlined"
                        fullWidth
                        name="surname"
                        value={user.surname}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <TextField
                        label="Отчество"
                        variant="outlined"
                        fullWidth
                        name="patronimic"
                        value={user.patronimic}
                        onChange={handleChange}
                        disabled={loading}
                    />

                    <Box sx={{display: 'flex', gap: 2, mt: 2}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            fullWidth
                            disabled={loading}
                        >
                            Сохранить
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCancel}
                            fullWidth
                            disabled={loading}
                        >
                            Назад
                        </Button>
                    </Box>
                </Box>
            </Box>
        </NavBar>
    );
}

export default ProfilePage;