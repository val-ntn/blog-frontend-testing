// frontend/src/components/Admin/CarouselForm/CarouselForm.jsx


import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/api';

export default function CarouselForm({ onCreateSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCarouselItem = {
      title,
      description,
      imageURL,
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

      <input
        type="text"
        placeholder="Image URL"
        value={imageURL}
        onChange={e => setImageURL(e.target.value)}
        required
      />

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
