// src/components/Posts/PostList.jsx
import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { API_BASE_URL } from '../../utils/api';

export default function PostList({ limit, compact, refreshFlag, renderActions }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts`)
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(limit ? sorted.slice(0, limit) : sorted);
      })
      .catch(err => console.error('Failed to fetch posts:', err));
  }, [limit, refreshFlag]);

  return (
    <div>
      {posts.length === 0 && <p>No posts found</p>}
      {posts.map(post => (
        <div key={post._id}>
          <PostItem post={post} compact={compact} />
          {renderActions && renderActions(post)}
        </div>
      ))}
    </div>
  );
}
