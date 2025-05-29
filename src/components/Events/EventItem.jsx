// src/components/Events/EventItem.jsx
import React from 'react';
import { formatDate, getExcerpt } from '../../utils/format';

export default function EventItem({ event, compact }) {
  return (
    <div className={`event-item ${compact ? 'compact' : ''}`}>
      <h4>{event.title}</h4>
      {!compact && <p>{event.description}</p>}
      {compact && <p>{getExcerpt(event.description, 60)}</p>}
      <small>Date: {formatDate(event.startDate)}</small>
    </div>
  );
}
