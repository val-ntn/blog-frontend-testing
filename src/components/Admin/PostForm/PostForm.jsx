// frontend/src/components/Admin/PostForm.jsx

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils/api';
import { Editor } from '@tinymce/tinymce-react';
import ImageSelector from '../ImageSelector';
import styles from './PostForm.module.css';

// TinyMCE core
import 'tinymce/tinymce';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';

// Plugins
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
  const editorRef = useRef(null);
  const toolbarRef = useRef(null);
  const selectedImgRef = useRef(null);

  const nodeChangeHandler = useRef(null);

  // Selected sides state
  const [selectedSides, setSelectedSides] = useState(new Set(['all']));



  // Fetch users on mount
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
    }, { withCredentials: true })
      .then(res => {
        console.log('Post created:', res.data);
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
useEffect(() => {
  return () => {
    if (editorRef.current && nodeChangeHandler.current) {
      editorRef.current.off('NodeChange', nodeChangeHandler.current);
    }
  };
}, []);

  const toggleSide = (side) => {
    setSelectedSides(prev => {
      const newSet = new Set(prev);
      if (side === 'all') {
        newSet.clear();
        newSet.add('all');
        newSet.add('top');
        newSet.add('right');
        newSet.add('bottom');
        newSet.add('left');
      } else {
        newSet.delete('all');
        if (newSet.has(side)) {
          newSet.delete(side);
        } else {
          newSet.add(side);
        }
        if (['top', 'right', 'bottom', 'left'].every(s => newSet.has(s))) {
          newSet.add('all');
        }
      }
      return newSet;
    });
  };

  const getIntStyle = (el, prop) => {
    if (el.style[prop]) {
      return parseInt(el.style[prop]) || 0;
    }
    const computed = window.getComputedStyle(el).getPropertyValue(prop);
    return parseInt(computed) || 0;
  };

  const handleToolbarAction = (action) => {
    const img = selectedImgRef.current;
    if (!img) return;
    const sides = selectedSides;

    const updateMargin = (side, delta) => {
      const propMap = {
        top: 'marginTop',
        right: 'marginRight',
        bottom: 'marginBottom',
        left: 'marginLeft'
      };
      const cssProp = propMap[side];
      if (!cssProp) return;
      const current = getIntStyle(img, cssProp);
      const newValue = Math.max(current + delta, 0);
      img.style[cssProp] = `${newValue}px`;
    };

    switch (action) {
      case 'increase-margin':
        sides.forEach(side => {
          if (side !== 'all') updateMargin(side, 10);
        });
        break;
      case 'decrease-margin':
        sides.forEach(side => {
          if (side !== 'all') updateMargin(side, -10);
        });
        break;
      case 'align-left':
        img.style.float = 'left';
        img.style.marginRight = '1em';
        img.style.marginBottom = '1em';
        break;
      case 'align-right':
        img.style.float = 'right';
        img.style.marginLeft = '1em';
        img.style.marginBottom = '1em';
        break;
      case 'reset-styles':
        img.removeAttribute('style');
        break;
    }
  };

  const showToolbarForImage = (img, editor) => {
    // Remove highlight from other images
    editor.dom.removeClass(editor.getBody().querySelectorAll('img'), 'margin-highlighted');
    editor.dom.addClass(img, styles.imageHighlighted);

    selectedImgRef.current = img;

    const rect = img.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const left = rect.left + window.scrollX;
    const toolbar = toolbarRef.current;

    if (toolbar) {
      toolbar.style.top = `${top + rect.height + 10}px`;
      toolbar.style.left = `${left}px`;
      toolbar.style.display = 'flex';
      toolbar.style.flexWrap = 'wrap';
    }
  };

  const hideToolbar = () => {
    if (toolbarRef.current) {
      toolbarRef.current.style.display = 'none';
    }
    const editor = editorRef.current;
    if (editor && selectedImgRef.current) {
      editor.dom.removeClass(selectedImgRef.current, 'margin-highlighted');
    }
    selectedImgRef.current = null;
  };

  const getButtonStyle = (side) => ({
    fontWeight: selectedSides.has(side) ? 'bold' : 'normal',
    backgroundColor: selectedSides.has(side) ? '#d0e6ff' : 'transparent',
    border: '1px solid #ccc',
    borderRadius: '3px',
    padding: '2px 6px',
    cursor: 'pointer',
    userSelect: 'none',
  });

  return (
    <>
      <h3>Create Blog Post</h3>

      <div ref={toolbarRef} className={styles.toolbar}>
        <button onClick={() => toggleSide('all')} style={getButtonStyle('all')} title="All sides">■</button>
        <button onClick={() => toggleSide('top')} style={getButtonStyle('top')} title="Top margin">▀</button>
        <button onClick={() => toggleSide('right')} style={getButtonStyle('right')} title="Right margin">▐</button>
        <button onClick={() => toggleSide('bottom')} style={getButtonStyle('bottom')} title="Bottom margin">▄</button>
        <button onClick={() => toggleSide('left')} style={getButtonStyle('left')} title="Left margin">▌</button>
        <button onClick={() => handleToolbarAction('increase-margin')} title="Increase margin">➕</button>
        <button onClick={() => handleToolbarAction('decrease-margin')} title="Decrease margin">➖</button>
        <button onClick={() => handleToolbarAction('align-left')} title="Align Left">▌</button>
        <button onClick={() => handleToolbarAction('align-right')} title="Align Right">▐</button>
        <button onClick={() => handleToolbarAction('reset-styles')} title="Reset styles">⟲</button>
      </div>

      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <label className={styles.label}>
          Title:
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className={styles.input}/>
        </label>

        <label className={styles.label}>
          Content:
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={content}
            onEditorChange={newValue => setContent(newValue)}
            init={{
              base_url: '/tinymce', // 👈 add this line
              suffix: '.min', // optional, for production builds
              plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount',
              toolbar: 'undo redo | formatselect fontsizeselect | bold italic | alignleft aligncenter alignright image | styleselect | bullist numlist outdent indent | removeformat | help',
              height: 500,
              branding: false,
              image_advtab: true,
              style_formats: [
                {
                  title: 'Image Left',
                  selector: 'img',
                  styles: { float: 'left', margin: '0 1em 1em 0' },
                },
                {
                  title: 'Image Right',
                  selector: 'img',
                  styles: { float: 'right', margin: '0 0 1em 1em' },
                },
                {
                  title: 'Centered Image',
                  selector: 'img',
                  styles: { display: 'block', margin: '0 auto' },
                },
              ],
              init_instance_callback: (editor) => {
  const promo = editor.getContainer().querySelector('.tox-promotion-link');
  if (promo) promo.remove();

  nodeChangeHandler.current = (e) => {
    if (e.element.nodeName === 'IMG') {
      showToolbarForImage(e.element, editor);
    } else {
      hideToolbar();
    }
  };

  editor.on('NodeChange', nodeChangeHandler.current);
}

            }}
          />
        </label>

        <div style={{ margin: '1rem 0' }}>
          <ImageSelector
            onSelect={(url) => {
              if (editorRef.current) {
                editorRef.current.insertContent(`<img src="${url}" alt="Image" />`);
              }
            }}
          />
        </div>

        <label className={styles.label}>
          Author:
          <select value={author} onChange={e => setAuthor(e.target.value)} required className={styles.select}>
            <option value="">Select author</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.name || user.username}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Category:
          <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
        </label>

        <label className={styles.label}>
          Tags (comma separated):
          <input type="text" value={tags} onChange={e => setTags(e.target.value)} />
        </label>

        <label className={styles.label}>
          External Links (comma separated):
          <input type="text" value={externalLinks} onChange={e => setExternalLinks(e.target.value)} />
        </label>

        <button type="submit" className={styles.submitButton}>Create Post</button>
      </form>
    </>
  );
}
