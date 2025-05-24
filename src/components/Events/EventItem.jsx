// src/components/Events/EventItem.jsx
import React from 'react';

export default function EventItem({ event, compact }) {
  const eventDate = new Date(event.startDate).toLocaleDateString();

  return (
    <div className={`event-item ${compact ? 'compact' : ''}`}>
      <h4>{event.title}</h4>
      {!compact && <p>{event.description}</p>}
      <small>Date: {eventDate}</small>
    </div>
  );
}
