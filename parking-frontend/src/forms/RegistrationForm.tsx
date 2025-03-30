import * as React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState} from "react";
import {formStyle} from '../styles/FormStyle.tsx'
import {formatPhone} from '../formatters/PhoneFormatter.ts'
import {registerUser} from '../api/api.ts';
import {validatePhone} from "../validators/PhoneValidator.ts"; // Import the registerUser function


function RegistrationForm() {
    const [registrationData, setRegistrationData] = useState({
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const handleRegistration = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        if (!validatePhone(registrationData.phoneNumber)) {
            setError('Неверный формат номера телефона. Используйте формат: +7 XXX XXX XX XX');
            setLoading(false);
            return;
        }

        if (registrationData.password !== registrationData.confirmPassword) {
            setError('Пароли не совпадают');
            setLoading(false);
            return;
        }

        try {
            const response = await registerUser({
                phoneNumber: registrationData.phoneNumber,
                password: registrationData.password
            });
            if (response.status === 200) {
                // const userId: string = response.data.userId;
                setSuccessMessage(`Регистрация прошла успешно! Перейдите на страницу входа.`);
                setRegistrationData({
                    password: '',
                    confirmPassword: '',
                    phoneNumber: ''
                });
            }
        } catch (error) {
            setError('Ошибка регистрации. Попробуйте снова.');
            console.error('Registration error:', error);
        } finally {
            setLoading(false); // Set loading to false after the request completes (success or error)
        }
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "phoneNumber") {
            setRegistrationData({...registrationData, [name]: formatPhone(value)});
        } else {
            setRegistrationData({...registrationData, [name]: value});
        }
    };

    const passwordFieldsMargin = {
        margin: '10px 0'
    };

    const passwordFieldsMargin2 = {
        margin: '10px 0'
    };


    return (
        <form onSubmit={handleRegistration} style={formStyle}>
            {error && <div style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{error}</div>}
            {successMessage &&
                <div style={{color: 'green', textAlign: 'center', marginBottom: '10px'}}>{successMessage}</div>}
            {loading &&  // Conditionally render based on boolean loading state
                <div style={{color: 'gray', textAlign: 'center', marginBottom: '10px'}}>Подождите...</div>}
            <TextField
                label="Номер телефона"
                variant="outlined"
                fullWidth
                name="phoneNumber"
                value={registrationData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="+7 XXX XXX XX XX"
            />
            <div style={passwordFieldsMargin}/>
            <TextField
                label="Пароль"
                variant="outlined"
                fullWidth
                name="password"
                type="password"
                value={registrationData.password}
                onChange={handleChange}
                required
            />
            <TextField
                label="Повторите пароль"
                variant="outlined"
                fullWidth
                name="confirmPassword"
                type="password"
                value={registrationData.confirmPassword}
                onChange={handleChange}
                required
            />
            <Button type="submit" variant="contained" color="primary" disabled={loading}
                    style={{marginBottom: '0px'}}
            >
                Зарегистрироваться
            </Button>
        </form>
    );
}

export default RegistrationForm;