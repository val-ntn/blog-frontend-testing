// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard'; // import the child dashboard component

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/dashboard', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 403) {
          throw new Error('Access denied: Admins only');
        }
        if (!res.ok) {
          throw new Error('Failed to authenticate');
        }
        return res.json();
      })
      .then(() => {
        setLoading(false);
        setError(null);
      })
      .catch(() => {
        setLoading(false);
        navigate('/admin/login'); // Redirect to login if not authorized
      });
  }, [navigate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, admin! You have access to this page.</p>
      <Dashboard /> {/* Render the dashboard UI component here */}
    </div>
  );
}
