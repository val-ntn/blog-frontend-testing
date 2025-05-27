//src/components/Admin/EventListControl.jsx

import { useState } from 'react';
import EventList from '../../components/Events/EventList';
import { API_BASE_URL } from '../../utils/api';

export default function EventListControl() {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleEdit = (event) => {
    alert(`Editing event: ${event.title}`);
  };

  const handleDelete = async (id) => {
  if (!window.confirm('Delete this event?')) return;
  try {
    await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setRefreshFlag(prev => !prev);
  } catch (err) {
    console.error('Delete failed', err);
  }
};

  return (
    <div>
      <h3>All Events</h3>

      <EventList
        refreshFlag={refreshFlag}
        renderActions={(event) => (
          <div className="flex items-center gap-2">
            <button onClick={() => handleEdit(event)}>✏ Edit</button>
            <button onClick={() => handleDelete(event._id)}>🗑 Delete</button>
          </div>
        )}
      />
    </div>
  );
}
