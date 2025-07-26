//frontend/src/components/Admin/Dashboard/PicturesManager.jsx


/* import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/api';

export default function PicturesManager() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);


  

  // Fetch images list from backend
  const fetchImages = () => {
    axios.get(`${API_BASE_URL}/upload`, { withCredentials: true }) // corrected endpoint
      .then(res => setImages(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);  // key must be 'image' for multer

    try {
      await axios.post(`${API_BASE_URL}/upload`, formData, { // corrected endpoint
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      fetchImages();  // refresh list after upload
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (imageName) => {
    axios.delete(`${API_BASE_URL}/upload/${imageName}`, { withCredentials: true }) // corrected endpoint
      .then(() => fetchImages())
      .catch(console.error);
  };

  return (
    <div>
      <h3>Manage Pictures</h3>
      <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
      {uploading && <p>Uploading...</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {images.length === 0 && <p>No images found.</p>}
        {images.map(image => (
          <div key={image.name} style={{ position: 'relative' }}>
            <img
              src={`${API_BASE_URL}/uploads/${image.name}`}
              alt={image.name}
              style={{ maxWidth: '150px', borderRadius: '6px' }}
            />
            <button
              onClick={() => handleDelete(image.name)}
              style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: 'white' }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
 */

// frontend/src/components/Admin/Dashboard/PicturesManager.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/api';
import CarouselList from '../../Carousel/CarouselList';
import CarouselForm from '../CarouselForm/CarouselForm';

export default function PicturesManager() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [showCarouselForm, setShowCarouselForm] = useState(false);
  const [carouselRefreshKey, setCarouselRefreshKey] = useState(0); // NEW

  // Fetch images list from backend
  const fetchImages = () => {
    axios
      .get(`${API_BASE_URL}/upload`, { withCredentials: true })
      .then(res => setImages(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      await axios.post(`${API_BASE_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      fetchImages();
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (imageName) => {
    axios
      .delete(`${API_BASE_URL}/upload/${imageName}`, { withCredentials: true })
      .then(() => fetchImages())
      .catch(console.error);
  };

  const handleCarouselSaved = () => {
    setCarouselRefreshKey(prev => prev + 1); // trigger refresh
  };

  return (
    <div>
      <h3>Manage Pictures</h3>

      <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
      {uploading && <p>Uploading...</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {images.length === 0 && <p>No images found.</p>}
        {images.map(image => (
          <div key={image.name} style={{ position: 'relative' }}>
            <img
              src={`${API_BASE_URL}/uploads/${image.name}`}
              alt={image.name}
              style={{ maxWidth: '150px', borderRadius: '6px' }}
            />
            <button
              onClick={() => handleDelete(image.name)}
              style={{ position: 'absolute', top: 0, right: 0, background: 'red', color: 'white' }}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <hr style={{ margin: '2rem 0' }} />

      <h3>Carousel Items</h3>
      <CarouselList key={carouselRefreshKey} />

      <button onClick={() => setShowCarouselForm(prev => !prev)}>
        {showCarouselForm ? 'Close Carousel Form' : 'Add New Carousel'}
      </button>

      {showCarouselForm && (
        <CarouselForm
          onClose={() => setShowCarouselForm(false)}
          onCreateSuccess={handleCarouselSaved}
        />
      )}
    </div>
  );
}
