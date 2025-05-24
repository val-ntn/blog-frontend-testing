//src/pages/user/EventForm.jsx
import { useState } from 'react';
import axios from 'axios';

export default function EventForm() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/events', {
      title: eventTitle,
      startDate,
      endDate,
      location,
      contact,
      schedule,
      costs,
      source,
      iconURL,
      imageURL
    })
      .then(res => {
        console.log('Event created:', res.data);
        // Optionally reset form here
      })
      .catch(console.error);
  };

  return (
    <>
      <h3>Create Event</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Title:</label>
          <input type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required />
        </div>
        <div>
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </div>
        <div>
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <div>
          <label>Contact:</label>
          <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} />
        </div>
        <div>
          <label>Schedule:</label>
          <input type="text" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
        </div>
        <div>
          <label>Costs:</label>
          <input type="text" value={costs} onChange={(e) => setCosts(e.target.value)} />
        </div>
        <div>
          <label>Source (URL):</label>
          <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
        </div>
        <div>
          <label>Icon URL:</label>
          <input type="text" value={iconURL} onChange={(e) => setIconURL(e.target.value)} />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </>
  );
}
