// src/components/Posts/PostItem.jsx
import React from 'react';
import { getExcerpt } from '../../utils/format';

export default function PostItem({ post, compact }) {
  return (
    <div className={`post-item ${compact ? 'compact' : ''}`}>
      <h3>{post.title}</h3>
      {!compact && <p>{post.content}</p>}
      {compact && <p>{getExcerpt(post.content, 80)}</p>}
      {post.author?.name && <small>By: {post.author.name}</small>}
    </div>
  );
}
