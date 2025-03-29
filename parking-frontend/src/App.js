import './App.css';

import * as React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate} from 'react-router-dom';
import StartPage from './pages/StartPage.tsx';
import HomePage from "./pages/HomePage.tsx";
import MyParkingsPage from "./pages/MyParkingsPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import ReportPage from "./pages/ReportPage.tsx";
import MapPage from "./pages/MapPage.tsx";


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<StartPage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/my-parkings" element={<MyParkingsPage/>}/>
                    <Route path="/reports" element={<ReportPage/>}/>
                    <Route path="/map" element={<MapPage/>}/>

                </Routes>
            </div>
        </Router>
    );
}

export default App;



