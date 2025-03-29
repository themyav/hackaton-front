import MapPage from "./pages/MapPage.tsx";
// import ParkingSpot from "./components/ParkingSpot/index.tsx";
import { ParkingAngle } from "./constants/parkingAngles.ts";

function App(){
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <div>
                <MapPage/>
                {/*  <ParkingSpot number={123} isDisabled={false} angle={0}> </ParkingSpot>*/}
            </div>
        </div>
    );
};

export default App;

// import logo from './logo.svg';
// import './App.css';
//
// import * as React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import StartPage from './pages/StartPage.tsx';
//
// function App() {
//   return (
//       <Router>
//         <div className="App">
//           <Routes>
//             <Route path="/" element={<StartPage />} />
//             <Route path="/login" element={<StartPage />} />
//             {/*<Route path="/home" element={<HomePage />} />*/}
//             {/*<Route path="/add-flat" element={<FlatForm />} />*/}
//             {/*<Route path="/flat/:id" element={<FlatPage />} />*/}
//             {/*<Route path="/add-utility/:id" element={<UtilityForm />} />*/}
//             {/*<Route path="/utility/:id" element={<UtilityPage />} />*/}
//             {/*<Route path="/user/:id" element={<UserPage />} />*/}
//             {/*<Route path="*" element={<Navigate to="/" />} />*/}
//           </Routes>
//         </div>
//       </Router>
//   );
// }
//
// export default App;
