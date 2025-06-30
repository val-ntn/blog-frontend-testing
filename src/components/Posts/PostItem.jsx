// src/components/Posts/PostItem.jsx

import { Link } from 'react-router-dom';
import { getExcerpt } from '../../utils/format';
import SafeHTMLRenderer from '../Common/SafeHTMLRenderer';

export default function PostItem({ post, compact }) {
  const contentToRender = compact
    ? getExcerpt(post.content, 300)
    : post.content;

  return (
    <div className={`post-item ${compact ? 'compact' : ''}`}>
      <h3>{post.title}</h3>
      <SafeHTMLRenderer content={contentToRender} />

      {compact && (
        <div className="read-more">
          <Link to={`/posts/${post._id}`}>Read more →</Link>
        </div>
      )}

      {post.author?.name && <small>By: {post.author.name}</small>}
    </div>
  );
}
