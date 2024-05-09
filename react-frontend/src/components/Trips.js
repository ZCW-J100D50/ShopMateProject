import React, { useEffect, useState } from 'react';
import '../App.css';
import '../shopMate.css';
import Header from './Header';

function fetchTrips(token) {
    const idToken = token ? JSON.parse(token).id_token : null;
    return fetch(`http://localhost:8080/api/trips`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to fetch trips');
        }
        return response.json();
    });
}

const Trips = () => {
    const [tripsInfo, setTripsInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        fetchTrips(token)
            .then((data) => {
                setTripsInfo(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Rest of your component code


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="App">
            <Header />
            <h1>Trips Page</h1>
            <ol className='tripList'>
                {tripsInfo.map((trip) => (
                    <li key={trip.id}>
                        <a href={`/trips/${trip.id}`}>{trip.name}</a>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Trips;
