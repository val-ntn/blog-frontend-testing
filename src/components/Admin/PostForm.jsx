//src/components/Admin/PostForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import { Editor } from '@tinymce/tinymce-react';

// TinyMCE core
import 'tinymce/tinymce';

// TinyMCE theme and icons
import 'tinymce/themes/silver';
import 'tinymce/icons/default';

// Plugins (ES modules, no .min.js)
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/table';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';

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
        <Editor
  value={content}                 // set the editor content from state
  onEditorChange={(newValue) => setContent(newValue)}  // update state on change
  init={{
    base_url: '/tinymce',  // base path for all assets
    suffix: '.min',
    skin_url: '/tinymce/skins/ui/oxide',
    content_css: '/tinymce/skins/content/default/content.css',
    icons_url: '/tinymce/icons/default/icons.js',
    plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help',
    height: 500,
  }}
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
