//src/components/Admin/PostForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';

export default function PostForm({ onCreateSuccess }) {
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
      tags: tags.split(',').map(t => t.trim()),
      thumbnailURL,
      externalLinks: externalLinks.split(',').map(l => l.trim()),
    }, {
      withCredentials: true
    })
      .then(res => {
        console.log('Post created:', res.data);

        // Clear form
        setTitle('');
        setContent('');
        setAuthor('');
        setCategory('');
        setTags('');
        setThumbnailURL('');
        setExternalLinks('');

        if (onCreateSuccess) onCreateSuccess();
      })
      .catch(err => {
        console.error('Error creating post:', err.response?.data || err.message);
      });
  };

  return (
    <>
      <h3>Create Blog Post</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Content:
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </label>

        <label>
          Author:
          <select
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
          >
            <option value="">Select author</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.name || user.username}
              </option>
            ))}
          </select>
        </label>

        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </label>

        <label>
          Tags (comma separated):
          <input
            type="text"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
        </label>

        <label>
          Thumbnail URL:
          <input
            type="url"
            value={thumbnailURL}
            onChange={e => setThumbnailURL(e.target.value)}
          />
        </label>

        <label>
          External Links (comma separated):
          <input
            type="text"
            value={externalLinks}
            onChange={e => setExternalLinks(e.target.value)}
          />
        </label>

        <button type="submit">Create Post</button>
      </form>
    </>
  );
}
