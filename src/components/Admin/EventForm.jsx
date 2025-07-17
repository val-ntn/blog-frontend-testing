//src/components/Admin/EventForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';

export default function EventForm({ initialData = null, onCreateSuccess }) {
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

  useEffect(() => {
    if (initialData) {
      setEventTitle(initialData.title || '');
      setStartDate(initialData.startDate ? initialData.startDate.slice(0, 10) : '');
      setEndDate(initialData.endDate ? initialData.endDate.slice(0, 10) : '');
      setLocation(initialData.location || '');
      setContact(initialData.contact || '');
      setSchedule(initialData.schedule || '');
      setCosts(initialData.costs || '');
      setSource(initialData.source || '');
      setIconURL(initialData.iconURL || '');
      setImageURL(initialData.imageURL || '');
      setDescription(initialData.description || '');
    } else {
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
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const apiCall = initialData
      ? axios.put(`${API_BASE_URL}/events/${initialData._id}`, {
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
          description,
        }, { withCredentials: true })
      : axios.post(`${API_BASE_URL}/events`, {
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
          description,
        }, { withCredentials: true });

    apiCall
      .then(res => {
        console.log(initialData ? 'Event updated:' : 'Event created:', res.data);
        if (onCreateSuccess) onCreateSuccess();
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialData ? 'Edit Event' : 'Create Event'}</h3>
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
          onChange={e => setDescription(e.target.value)}
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
      <button type="submit">{initialData ? 'Update Event' : 'Create Event'}</button>
    </form>
  );
}
