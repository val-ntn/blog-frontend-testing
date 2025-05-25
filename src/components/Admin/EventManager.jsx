//src/components/Admin/EventManager.jsx
import { useState } from 'react';
import EventForm from './EventForm';

export default function EventManager() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button onClick={() => setShowForm(prev => !prev)}>
        {showForm ? 'Hide Event Form' : 'Create New Event'}
      </button>

      {showForm && <EventForm />}
    </div>
  );
}
