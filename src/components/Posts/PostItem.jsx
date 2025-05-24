// src/components/Posts/PostItem.jsx
import React from 'react';

export default function PostItem({ post, compact }) {
  return (
    <div className={`post-item ${compact ? 'compact' : ''}`}>
      <h3>{post.title}</h3>
      {!compact && <p>{post.content}</p>}
      <small>By: {post.author.name}</small>
    </div>
  );
}
