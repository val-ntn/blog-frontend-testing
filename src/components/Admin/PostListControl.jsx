// src/components/Admin/PostListControl.jsx
import PostList from '../../components/Posts/PostList';
import { API_BASE_URL } from '../../utils/api';

export default function PostListControl({ refreshFlag, onRefresh }) {
  const handleEdit = (post) => {
    alert(`Editing post: ${post.title}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <div>
      <h3>All Posts</h3>
      <PostList
        refreshFlag={refreshFlag}
        renderActions={(post) => (
          <>
            <button onClick={() => handleEdit(post)}>✏ Edit</button>
            <button onClick={() => handleDelete(post._id)}>🗑 Delete</button>
          </>
        )}
      />
    </div>
  );
}
