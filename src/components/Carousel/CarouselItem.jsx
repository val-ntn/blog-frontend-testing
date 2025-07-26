/* // frontend/src/components/Carousel/CarouselItem.jsx



import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CarouselItem({ carousel }) {
  const { title, images } = carousel;

  if (!images || images.length === 0) {
    return <p>No images for {title}</p>;
  }

  return (
    <div className="carousel-container">
      <h3>{title}</h3>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
      >
        {images.map((imgNameOrUrl, index) => (
  <SwiperSlide key={index}>
    <div
      style={{
        width: '100%',
        height: '400px',
        backgroundImage: `url(${imgNameOrUrl.startsWith('http') ? imgNameOrUrl : `${API_BASE_URL}/uploads/${imgNameOrUrl}`})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    />
  </SwiperSlide>
))}

      </Swiper>
    </div>
  );
}
 */

// frontend/src/components/Carousel/CarouselItem.jsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function CarouselItem({ carousel }) {
  const { title, images } = carousel;

  if (!images || images.length === 0) {
    return <p>No images for {title}</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        //autoplay={{ delay: 4000 }}
        loop
        style={{ height: '400px', borderRadius: '8px', overflow: 'hidden' }}
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`Slide ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
