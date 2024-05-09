import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

//import './Login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
  }

  export default function Login({ setToken }) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {

      e.preventDefault();
      try {
        const token = await loginUser({
          username,
          password,
          rememberme: true
        });
        setToken(token);
       // window.location.href = '/trips';
       navigate('/trips'); // Navigate to the "/trips" page

      } catch (error) {
        setError('Invalid username or password');
      }
    }

    return(

        <div className="App">
            <Header />
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username</p>
            <input type="text" value={username} onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
    )
  }

  Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };
