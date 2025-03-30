import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from 'react';
import {getUserById, loginUser} from '../api/api.ts';
import {useNavigate} from 'react-router-dom';
import {formStyle} from '../styles/FormStyle.tsx';
import {formatPhone} from "../formatters/PhoneFormatter.ts";
import {validatePhone} from "../validators/PhoneValidator.ts";

function LoginForm() {
    const [loginData, setLoginData] = useState({
        phoneNumber: '',
        password: '',
    });

    React.useEffect(() => {
        window.history.replaceState({}, document.title);
    }, []);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!validatePhone(loginData.phoneNumber)) {
            setError('Неверный формат номера телефона. Используйте формат: +7 XXX XXX XX XX');
            setLoading(false);
            return;
        }

        try {
            const response = await loginUser(loginData);
            if (response.status === 200) {
                console.log('Login successful!');
                console.log(`${response.data.token}`)
                try {
                    const response_user = await getUserById(response.data.userID);
                    if (response.status === 200) {
                        navigate('/home', {state: {token: response.data.token, user: response_user.data.user}});
                    }
                } catch (error) {
                    setError('Ошибка получения данных о пользователе');
                }

            }
        } catch (error) {
            setError('Неверные логин или пароль');
            console.error('Login Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "phoneNumber") {
            setLoginData({...loginData, [name]: formatPhone(value)});
        } else {
            console.log(name, value)
            setLoginData({...loginData, [name]: value});
        }
    };

    return (
        <form onSubmit={handleLogin} style={formStyle}>
            {error && <div style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{error}</div>}
            {loading && <div style={{color: 'gray', textAlign: 'center', marginBottom: '10px'}}>Подождите...</div>}
            <TextField
                label="Номер телефона"
                variant="outlined"
                fullWidth
                name="phoneNumber"
                value={loginData.phoneNumber}
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
                value={loginData.password}
                onChange={handleChange}
                required
            />
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
                Войти
            </Button>
        </form>
    );
}

export default LoginForm;