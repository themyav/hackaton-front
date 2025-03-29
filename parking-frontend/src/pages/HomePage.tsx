import * as React from 'react';
import Button from '@mui/material/Button';
import {useNavigate, useLocation} from 'react-router-dom';
import {TextField} from '@mui/material';
import {formatPhone} from "../formatters/PhoneFormatter.ts";

function HomePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = React.useState(location.state?.user || {phone: '', password: ''});
    const [editMode, setEditMode] = React.useState(false);

    const handleLogout = () => {
        navigate('/login');
    };

    const handleEditUser = () => {
        setEditMode(true);
    };

    const handleSave = () => {
        //API call
        setEditMode(false);
        console.log("User data saved:", user);
    };

    const handleCancel = () => {
        setUser(location.state?.user || {phone: '', password: ''});
        setEditMode(false);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "phone") {
            setUser({...user, [name]: formatPhone(value)});
        } else {
            setUser({...user, [name]: value});
        }
    };

    return (
        <div style={{padding: '20px', maxWidth: '400px', margin: '0 auto'}}>
            <h1>{"Добро пожаловать!"}</h1>

            {editMode ? (
                <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    <TextField
                        label="Номер телефона"
                        variant="outlined"
                        fullWidth
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        required
                        placeholder="+7 XXX XXX XX XX"
                    />
                    <TextField
                        label="Пароль"
                        variant="outlined"
                        fullWidth
                        name="password"
                        type="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                    <div style={{display: 'flex', gap: '10px'}}>
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Сохранить
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleCancel}>
                            Отмена
                        </Button>
                    </div>
                </div>
            ) : (
                <div style={{marginBottom: '20px'}}>
                    <p><strong>Телефон:</strong> {user.phone}</p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleEditUser}
                        style={{margin: '10px 0'}}
                    >
                        Редактировать профиль
                    </Button>
                </div>
            )}

            <Button variant="contained" color="primary" onClick={handleLogout}>
                Выйти
            </Button>
        </div>
    );
}

export default HomePage;