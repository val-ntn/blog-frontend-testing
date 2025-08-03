//frontend/src/components/Carousel/CarouselList.jsx

// CarouselList.jsx
/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarouselItem from './CarouselItem';
import { API_BASE_URL } from '../../utils/api';

export default function CarouselList() {
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarousels();
  }, []);

  const fetchCarousels = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/carousels`, { withCredentials: true });
      setCarousels(res.data);
    } catch (err) {
      console.error("Failed to fetch carousels", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSoftDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this carousel?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/carousels/${id}`, { withCredentials: true });
      setCarousels(prev => prev.filter(c => c._id !== id));
    } catch (err) {
      console.error("Soft delete failed", err);
      alert("Failed to delete carousel.");
    }
  };

  if (loading) return <p>Loading carousels...</p>;
  if (carousels.length === 0) return <p>No carousels found.</p>;

  return (
    <div>
      {carousels.map(carousel => (
  <div key={carousel._id} style={{ marginBottom: '2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '800px', margin: '0 auto' }}>
      <h3>{carousel.title}</h3>
      <button
        onClick={() => handleSoftDelete(carousel._id)}
        style={{
          background: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          padding: '0.3rem 0.6rem',
          fontWeight: 'bold',
        }}
        title="Delete Carousel"
      >
        X
      </button>
    </div>
    <CarouselItem carousel={carousel} />
  </div>
))}

    </div>
  );
}

 */

// frontend/src/components/Images-Carousels/CarouselList.jsx

import CarouselItem from "./CarouselItem";

export default function CarouselList({
  carousels,
  onDelete,
  onSelect,
  disableDelete = false,
  viewMode = "grid",
}) {
  return (
    <div className={`carousel-list ${viewMode}`}>
      {carousels.map((carousel) => (
        <div key={carousel._id} onClick={() => onSelect?.(carousel)}>
          <CarouselItem carousel={carousel} />
          {!disableDelete && onDelete && (
            <button onClick={() => onDelete(carousel._id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}
