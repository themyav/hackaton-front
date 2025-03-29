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
    const [user, setUser] = React.useState(location.state?.user || {phone: '', password: ''});

    const handleSave = () => {
        // API call would go here
        console.log("User data saved:", user);
        navigate(-1); // Go back to previous page
    };

    const handleCancel = () => {
        navigate(-1); // Go back to previous page
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
                    <TextField
                        label="Номер телефона"
                        variant="outlined"
                        fullWidth
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        disabled
                    />
                    <TextField
                        label="Пароль"
                        variant="outlined"
                        fullWidth
                        name="password"
                        type="password"
                        value={user.password}
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