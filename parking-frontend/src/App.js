import './App.css';

import * as React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import StartPage from './pages/StartPage.tsx';
import HomePage from "./pages/HomePage.tsx";


function ProtectedRoute({children}) {
    const location = useLocation();
    if (!location.state?.user) {
        return <Navigate to="/login" replace/>;
    }
    return children;
}

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<StartPage/>}/>
                    <Route path="/login" element={<StartPage/>}/>
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <HomePage/>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
