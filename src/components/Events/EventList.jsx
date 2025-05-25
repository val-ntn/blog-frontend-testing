// src/components/Events/EventList.jsx
import React, { useEffect, useState } from 'react';
import EventItem from './EventItem';

export default function EventList({ limit, onlyUpcoming, compact }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events') // adjust your API URL
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
  }, [limit, onlyUpcoming]);

  return (
    <div className="event-list">
      {events.length === 0 && <p>No events found</p>}
      {events.map(event => (
        <EventItem key={event._id} event={event} compact={compact} />
      ))}
    </div>
  );
}

