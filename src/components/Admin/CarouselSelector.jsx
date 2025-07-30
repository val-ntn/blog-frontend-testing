// frontend/src/components/admin/CarouselSelector.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';

export default function CarouselSelector({ onSelect }) {
  const [carousels, setCarousels] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      axios.get(`${API_BASE_URL}/carousels`, { withCredentials: true })
        .then(res => setCarousels(res.data))
        .catch(console.error);
    }
  }, [open]);

  const handleCarouselClick = (carousel) => {
    onSelect(carousel);
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={() => setOpen(!open)}>
        🌀 Insert Carousel
      </button>

      {open && (
        <div
          style={{
            marginTop: '1rem',
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: '8px',
            background: '#f9f9f9',
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          <h4 style={{ marginBottom: '0.5rem' }}>Carousels</h4>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {carousels.map(carousel => {
              const thumbnail = carousel.images?.[0];
              if (!thumbnail) return null;

              return (
                <div
                  key={carousel._id}
                  style={{ cursor: 'pointer', textAlign: 'center' }}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      'application/json',
                      JSON.stringify({
                        type: 'carousel',
                        id: carousel._id,
                      })
                    );
                  }}
                  onClick={() => handleCarouselClick(carousel)}
                >
                  <img
                    src={thumbnail}
                    alt={carousel.title}
                    style={{ width: '100px', borderRadius: '6px' }}
                  />
                  <p style={{ fontSize: '0.8rem', marginTop: '0.3rem' }}>
                    {carousel.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
