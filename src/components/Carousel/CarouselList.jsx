//frontend/src/components/Carousel/CarouselList.jsx


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarouselItem from './CarouselItem';
import { API_BASE_URL } from '../../utils/api';

export default function CarouselList() {
  const [carousels, setCarousels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/carousels`, { withCredentials: true })
      .then(res => setCarousels(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading carousels...</p>;
  if (carousels.length === 0) return <p>No carousels found.</p>;

  return (
    <div>
      {carousels.map(carousel => (
        <CarouselItem key={carousel._id} carousel={carousel} />
      ))}
    </div>
  );
}
