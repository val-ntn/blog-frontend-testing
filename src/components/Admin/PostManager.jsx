//src/components/Admin/PostManager.jsx
import { useState } from 'react';
import PostForm from './PostForm';

export default function PostManager() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button onClick={() => setShowForm(prev => !prev)}>
        {showForm ? 'Hide Post Form' : 'Create New Post'}
      </button>

      {showForm && <PostForm />}
    </div>
  );
}
