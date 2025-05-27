// src/components/Events/EventList.jsx
import React, { useEffect, useState } from 'react';
import EventItem from './EventItem';
import { API_BASE_URL } from '../../utils/api';

export default function EventList({ limit, onlyUpcoming, compact, renderActions, refreshFlag }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/events`)
      .then(res => res.json())
      .then(data => {
        let filtered = data;

        if (onlyUpcoming) {
          const now = new Date();
          filtered = data.filter(event => new Date(event.startDate) >= now);
        }

        const sorted = filtered.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );

        setEvents(limit ? sorted.slice(0, limit) : sorted);
      })
      .catch(err => console.error('Failed to fetch events:', err));
  }, [limit, onlyUpcoming, refreshFlag]);

  return (
    <div>
      {events.length === 0 && <p>No events found</p>}
      {events.map(event => (
        <div key={event._id}>
          <EventItem event={event} compact={compact} />
          {renderActions && renderActions(event)}
        </div>
      ))}
    </div>
  );
}
