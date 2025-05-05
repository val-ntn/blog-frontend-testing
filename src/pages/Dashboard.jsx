// Dashboard.jsx
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

  useEffect(() => {
    // Fetch users for selection
    axios.get('http://localhost:5000/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSubmit = (e) => {
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

    // Create new post (sending data to backend)
    axios.post('http://localhost:5000/api/posts', postData)
      .then(response => {
        console.log('Post created successfully:', response.data);
        // You can redirect or reset form after successful submission
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
}

export default Dashboard;

  