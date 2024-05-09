import React, { useEffect, useState } from 'react';
import '../App.css';
import '../shopMate.css';
import Header from './Header';

function fetchTripDetails(id, token) {
    const idToken = token ? JSON.parse(token).id_token : null;

    return fetch(`http://localhost:8080/api/trips/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
        },
    }).then((response) => {
        return response.json();
    });
}


const TripDetail = () => {
    const [tripDetailInfo, setTripDetailInfo] = useState([]);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const id = window.location.pathname.split('/').pop();
        fetchTripDetails(id, token).then((data) => {
            setTripDetailInfo(data);
        });
    }, []);

    if (tripDetailInfo.userProfile) {
        return (
            <div className="App">
                <Header />
                <h1>Trip: {tripDetailInfo.name}</h1>
                {/* Your Trips page content goes here */}
                <div className='tripDetail'>
                    <h3>Shopper: {tripDetailInfo.userProfile.nickName}</h3>
                    <h4>Date: {tripDetailInfo.date}</h4>
                    <h4>Budget: ${tripDetailInfo.budget}</h4>
                    <h3>Items:</h3>
                    <ol className='shopList'>
                        {tripDetailInfo.items.map((item) => (
                            <li key={item.id}>{item.name}, price: ${item.price}, quantity: {item.quantity}</li>
                        ))}
                    </ol>
                    <a href='/trips' className='button'>Back to Trips</a>
                </div>
            </div>
        );
    }
};

export default TripDetail;
