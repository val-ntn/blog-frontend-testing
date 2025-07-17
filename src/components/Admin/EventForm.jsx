//src/components/Admin/EventForm.jsx
import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';

export default function EventForm({ onCreateSuccess }) {
  // Declare all state variables here:
  const [eventTitle, setEventTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [schedule, setSchedule] = useState('');
  const [costs, setCosts] = useState('');
  const [source, setSource] = useState('');
  const [iconURL, setIconURL] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/events`, {
      title: eventTitle,
      startDate,
      endDate,
      location,
      contact,
      schedule,
      costs,
      source,
      iconURL,
      imageURL,
      description
    }, {
      withCredentials: true
    })
      .then(res => {
        console.log('Event created:', res.data);
        // Clear form inputs after success
        setEventTitle('');
        setStartDate('');
        setEndDate('');
        setLocation('');
        setContact('');
        setSchedule('');
        setCosts('');
        setSource('');
        setIconURL('');
        setImageURL('');
        setDescription('');

        // Notify parent to refresh list
        if (onCreateSuccess) onCreateSuccess();
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Event</h3>
      <label>Title
        <input value={eventTitle} onChange={e => setEventTitle(e.target.value)} required />
      </label>
      <label>Start Date
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
      </label>
      <label>End Date
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
      </label>
      <label>Location
        <input value={location} onChange={e => setLocation(e.target.value)} />
      </label>
      <label>Contact
        <input value={contact} onChange={e => setContact(e.target.value)} />
      </label>
      <label>Description
  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    rows={4}
    placeholder="Enter a short description of the event"
  />
</label>

      <label>Schedule
        <input value={schedule} onChange={e => setSchedule(e.target.value)} />
      </label>
      <label>Costs
        <input value={costs} onChange={e => setCosts(e.target.value)} />
      </label>
      <label>Source
        <input value={source} onChange={e => setSource(e.target.value)} />
      </label>
      <label>Icon URL
        <input value={iconURL} onChange={e => setIconURL(e.target.value)} />
      </label>
      <label>Image URL
        <input value={imageURL} onChange={e => setImageURL(e.target.value)} />
      </label>
      <button type="submit">Create Event</button>
    </form>
  );
}
