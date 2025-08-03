// src/components/Posts/PostItem.jsx

/* import { Link } from "react-router-dom";
import SafeHTMLRenderer from "../Common/SafeHTMLRenderer";
export default function PostItem({ post, compact }) {
  const contentToRender = compact ? post.excerpt : post.content;

  return (
    <div className={`post-item ${compact ? "compact" : ""}`}>
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
 */

// src/components/Posts/PostItem.jsx

import { Link } from "react-router-dom";
import SafeHTMLRenderer from "../Common/SafeHTMLRenderer";
import CarouselItem from "../../components/Images-Carousels/CarouselItem";

export default function PostItem({ post, compact }) {
  const contentToRender = compact ? post.excerpt : post.content;

  return (
    <div className={`post-item ${compact ? "compact" : ""}`}>
      <h3>{post.title}</h3>
      <SafeHTMLRenderer content={contentToRender} />

      {compact && (
        <div className="read-more">
          <Link to={`/posts/${post._id}`}>Read more →</Link>
        </div>
      )}

      {post.author?.name && <small>By: {post.author.name}</small>}

      {/* Render carousel if not compact (optional, just like ReportItem doesn’t show it in compact mode) */}
      {!compact && post.carousel && <CarouselItem carousel={post.carousel} />}

      {/* Optional related entity */}
      {/* 
      {post.topic && (
        <small>
          {" "}
          | Topic:{" "}
          <Link to={`/topics/${post.topic._id}`}>
            {post.topic.name}
          </Link>
        </small>
      )}
      */}
    </div>
  );
}
