//src/components/Posts/PostRecycleList.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import PostRecycleItem from './PostRecycleItem';
import { API_BASE_URL } from '../../utils/api';  // import the backend base URL

export default function PostRecycleList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/posts/bin`, { withCredentials: true })  // use full backend URL
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleRestore = async (id) => {
    await axios.patch(`${API_BASE_URL}/posts/restore/${id}`, { }, { withCredentials: true });
    setPosts(posts.filter(p => p._id !== id));
  };

  const handlePermanentDelete = async (id) => {
    await axios.delete(`${API_BASE_URL}/posts/hard/${id}`, { withCredentials: true });
    setPosts(posts.filter(p => p._id !== id));
  };

  return (
    <div>
      <h3>Deleted Posts</h3>
      {posts.length === 0 ? (
        <p>No deleted posts</p>
      ) : (
        posts.map(post => (
          <PostRecycleItem
            key={post._id}
            post={post}
            onRestore={handleRestore}
            onDelete={handlePermanentDelete}
          />
        ))
      )}
    </div>
  );
}


