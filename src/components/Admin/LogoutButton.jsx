// src/components/Admin/LogoutButton.jsx
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LogoutButton() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      setUser(null); // reset user in context on logout
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

