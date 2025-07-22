//frontend/src/pages/user/EventDetail.jsx

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../utils/api';
import { formatDate } from '../../utils/format';

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/events/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch event');
        return res.json();
      })
      .then(data => setEvent(data))
      .catch(console.error);
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <article>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p><strong>Start:</strong> {formatDate(event.startDate)}</p>
      {event.endDate && <p><strong>End:</strong> {formatDate(event.endDate)}</p>}
      <p><strong>Location:</strong> {event.location || 'N/A'}</p>
    </article>
  );
}
