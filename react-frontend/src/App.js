import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import TripDetail from './components/TripDetail';
import Trips from './components/Trips';

function setToken(userToken) {
    console.log('Token received:', userToken);
    try {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        console.log('Token saved to session storage');
    } catch (error) {
        console.error('Error saving token to session storage:', error);
    }

}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
}

const App = () => {
    const token = getToken();

    if (!token) {
       // return <Login setToken={setToken} />;
    }

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/trips/:id" element={<TripDetail />} />
                <Route path="/trips" element={<Trips />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;
