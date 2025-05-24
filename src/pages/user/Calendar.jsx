// src/pages/Calendar.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            {/* <p>{event.startDate} — {event.endDate || 'One-day event'}</p> */}
            <p>
              {new Date(event.startDate).toLocaleDateString()} 
              {event.endDate ? ` — ${new Date(event.endDate).toLocaleDateString()}` : ' (One-day event)'}
            </p>
            <p>{event.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Calendar;
