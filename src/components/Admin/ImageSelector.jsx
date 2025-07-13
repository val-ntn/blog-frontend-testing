// frontend/src/components/admin/ImageSelector.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';

export default function ImageSelector({ onSelect }) {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      axios.get(`${API_BASE_URL}/pictures`, { withCredentials: true })
        .then(res => setImages(res.data))
        .catch(console.error);
    }
  }, [open]);

  const handleImageClick = (url) => {
    onSelect(url);
    setOpen(false); // close after selection
  };

  return (
    <div>
      <button type="button" onClick={() => setOpen(!open)}>
        📷 Insert Image
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
          {images.length === 0 && <p>No images available</p>}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {images.map(image => {
              const imageUrl = `${API_BASE_URL}/uploads/${image.name}`;
              return (
                <div key={image.name} style={{ cursor: 'pointer', textAlign: 'center' }}>
                  <img
                    src={imageUrl}
                    alt={image.name}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', imageUrl);
                    }}
                    onClick={() => handleImageClick(imageUrl)}
                    style={{ width: '100px', borderRadius: '6px' }}
                  />
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(imageUrl)}
                    style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}
                  >
                    Copy URL
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
