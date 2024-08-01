import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashbord = ({ token, onLogout }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/dashbord', {
          headers: {
            'Authorization': token
          }
        });
        setMessage(response.data.message);
      } catch (error) {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage('An error occurred. Please try again.');
        }
      }
    };

    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Protected Route</h1>
      <p>{message}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashbord;
