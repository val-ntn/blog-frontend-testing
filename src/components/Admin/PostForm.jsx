//src/components/Admin/PostForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';

export default function PostForm() {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [externalLinks, setExternalLinks] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE_URL}/users`)
      .then(res => setUsers(res.data))
      .catch(console.error);
  }, []);

  const handleSubmit = (e) => {
  e.preventDefault();

  axios.post(`${API_BASE_URL}/posts`, {
    title,
    content,
    author,
    category,
    tags: tags.split(','),
    thumbnailURL,
    externalLinks: externalLinks.split(',')
  }, {
    withCredentials: true  // ✅ crucial for sending the token cookie
  })
    .then(res => {
      console.log('Post created:', res.data);
      // Optional: reset form fields here
      // Clear form
  setTitle('');
  setContent('');
  setAuthor('');
  setCategory('');
  setTags('');
  setThumbnailURL('');
  setExternalLinks('');
    })
    .catch(err => {
      console.error('Error creating post:', err.response?.data || err.message);
    });
};

  return (
    <>
      <h3>Create Blog Post</h3>
      <form onSubmit={handleSubmit}>
        {/* your input fields here like before */}
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
    </>
  );
}
