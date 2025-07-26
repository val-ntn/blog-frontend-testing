// frontend/src/components/Admin/CarouselForm/CarouselForm.jsx


import { useState } from 'react';
import ImageSelector from '../ImageSelector';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/api';

export default function CarouselForm({ onCreateSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [imageURLs, setImageURLs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageURLs.length) {
      alert("Please select at least one image.");
      return;
    }

    const newCarouselItem = {
      title,
      description,
      images: imageURLs,
      externalLink,
      isActive,
    };

    try {
      await axios.post(`${API_BASE_URL}/carousels`, newCarouselItem, { withCredentials: true });
      alert("Carousel item created!");
      if (onCreateSuccess) onCreateSuccess();
    } catch (err) {
      console.error(err);
      alert("Error saving carousel item.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Carousel Item</h3>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      {/* Image selection & preview */}
      <div style={{ margin: '1rem 0' }}>
        <ImageSelector onSelect={(url) => setImageURLs(prev => [...prev, url])} />

        {imageURLs.length > 0 && (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            {imageURLs.map((url, index) => (
              <div key={index} style={{ position: 'relative' }}>
                <img
                  src={url}
                  alt={`Selected ${index}`}
                  style={{ width: '100px', borderRadius: '6px' }}
                />
                <button
                  type="button"
                  onClick={() =>
                    setImageURLs(prev => prev.filter((_, i) => i !== index))
                  }
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'red',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    textAlign: 'center',
                    lineHeight: '18px',
                    cursor: 'pointer',
                  }}
                >
                  ✖
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        type="text"
        placeholder="External Link (optional)"
        value={externalLink}
        onChange={e => setExternalLink(e.target.value)}
      />

      <label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={e => setIsActive(e.target.checked)}
        />
        Active
      </label>

      <button type="submit">Save</button>
    </form>
  );
}
