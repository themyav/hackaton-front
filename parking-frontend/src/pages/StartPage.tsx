import * as React from 'react';
import LoginForm from '../forms/LoginForm.tsx';
import SignupForm from '../forms/RegistrationForm.tsx';
import {useState} from "react";
import Button from "@mui/material/Button";

function StartPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [changeButtonText, setChangeButtonText] = useState('Зарегистрироваться');

    const handleToggle = () => {
        setIsLogin(prev => !prev);
        setChangeButtonText(prev => prev === 'Зарегистрироваться' ? 'Войти' : 'Зарегистрироваться');
    };

    return (
        <div className="App">
            {isLogin ? (
                <div>
                    <h1>Вход</h1>
                    <LoginForm/>
                </div>
            ) : (
                <div>
                    <h1>Регистрация</h1>
                    <SignupForm/>
                </div>
            )}
            <Button variant="contained" onClick={handleToggle}>
                {changeButtonText}
            </Button>
        </div>
    );
}

export default StartPage;