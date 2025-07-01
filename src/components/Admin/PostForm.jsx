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
  value={content}
  onEditorChange={(newValue) => setContent(newValue)}
  init={{
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
    toolbar: 'undo redo | formatselect fontsizeselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help',
    fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
    branding: false,
    height: 500,

    init_instance_callback: (editor) => {
      const promo = editor.getContainer().querySelector('.tox-promotion-link');
      if (promo) {
        promo.remove();
      }
    },
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
