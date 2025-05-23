// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [externalLinks, setExternalLinks] = useState('');

  // For event creation
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

  useEffect(() => {
    // Fetch users for selection
    axios.get('http://localhost:5000/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Handle Post submission
  const handlePostSubmit = (e) => {
    e.preventDefault();

    const postData = {
      title,
      content,
      author,
      category,
      tags: tags.split(','),
      thumbnailURL,
      externalLinks: externalLinks.split(',')
    };

    axios.post('http://localhost:5000/api/posts', postData)
      .then(response => {
        console.log('Post created successfully:', response.data);
        // Optionally reset form after submission
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

  // Handle Event submission
  const handleEventSubmit = (e) => {
    e.preventDefault();

    const eventData = {
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
    };

    axios.post('http://localhost:5000/api/events', eventData)
      .then(response => {
        console.log('Event created successfully:', response.data);
        // Optionally reset form after submission
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
      })
      .catch(error => {
        console.error('Error creating event:', error);
      });
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {/* Create Post Form */}
      <h3>Create Blog Post</h3>
      <form onSubmit={handlePostSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Content:</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div>
          <label>Tags (comma separated):</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div>
          <label>Thumbnail URL:</label>
          <input type="text" value={thumbnailURL} onChange={(e) => setThumbnailURL(e.target.value)} />
        </div>
        <div>
          <label>External Links (comma separated):</label>
          <input type="text" value={externalLinks} onChange={(e) => setExternalLinks(e.target.value)} />
        </div>
        <div>
          <label>Author:</label>
          <select value={author} onChange={(e) => setAuthor(e.target.value)} required>
            <option value="">Select Author</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Create Post</button>
      </form>

      {/* Create Event Form */}
      <h3>Create Event</h3>
      <form onSubmit={handleEventSubmit}>
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
    </div>
  );
}

export default Dashboard;

  