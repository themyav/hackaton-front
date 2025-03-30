import * as React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import NavBar from "../navigation/NavBar.tsx";

function ProfilePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = React.useState(location.state?.user || {
        id: '',
        phoneNumber: '',
        user_type: '',
        name: '',
        surname: '',
        patronimic: ''
    });

    const handleSave = () => {
        // API call would go here
        console.log("User data saved:", user);
        // navigate(-1); // Go back to previous page
    };

    const handleCancel = () => {
        navigate(-1); // Go back to previous page
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    };

    const handleUserType = (t) => {
        if (t == "REGULAR_USER_TYPE") return "Жилец"
        else return "Привилегированный"
    }

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
                    />
                    <TextField
                        label="Фамилия"
                        variant="outlined"
                        fullWidth
                        name="surname"
                        value={user.surname}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Отчество"
                        variant="outlined"
                        fullWidth
                        name="patronimic"
                        value={user.patronimic}
                        onChange={handleChange}
                    />

                    <Box sx={{display: 'flex', gap: 2, mt: 2}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSave}
                            fullWidth
                        >
                            Сохранить
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleCancel}
                            fullWidth
                        >
                            Отмена
                        </Button>
                    </Box>
                </Box>
            </Box>
        </NavBar>
    );
}

export default ProfilePage;