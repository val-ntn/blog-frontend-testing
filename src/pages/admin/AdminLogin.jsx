
// src/pages/admin/AdminLogin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is already logged in, redirect to dashboard if yes
    axios.get('http://localhost:5000/api/admin/dashboard', { withCredentials: true })
      .then(res => {
        if (res.data.message) {
          setIsLoggedIn(true);
          navigate('/admin'); // redirect to dashboard
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/login', form, { withCredentials: true });
      setIsLoggedIn(true);
      navigate('/admin'); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Admin Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
