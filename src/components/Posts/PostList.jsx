// src/components/Posts/PostList.jsx
import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';

export default function PostList({ limit, compact }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts') // adjust your API URL
      .then(res => res.json())
      .then(data => {
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(limit ? sorted.slice(0, limit) : sorted);
      })
      .catch(err => console.error('Failed to fetch posts:', err));
  }, [limit]);

  return (
    <div className="post-list">
      {posts.length === 0 && <p>No posts found</p>}
      {posts.map(post => (
        <PostItem key={post._id} post={post} compact={compact} />
      ))}
    </div>
  );
}
