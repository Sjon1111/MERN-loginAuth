
// import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Signup from './Componant/Signup'
import Signin from "./Componant/Signin"
import Dashbord from "./Componant/Dashbord"

function App() {

  const [token, setToken] = React.useState(localStorage.getItem('token') || '');

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  return (
    <Router>
      <div>
        <Routes>
          
          <Route path="/" element={token ? <Dashbord token={token} onLogout={handleLogout} /> : <Signup />} />
          <Route path="/login" element={<Signin onLogin={handleLogin} />} />
          <Route path="/dashbord" element={token ? <Dashbord token={token} onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App
