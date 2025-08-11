// src/components/Posts/PostItem.jsx

import { Link } from "react-router-dom";
import SafeHTMLRenderer from "../Common/SafeHTMLRenderer";
import CarouselItem from "../../components/Images-Carousels/CarouselItem";

/**
 * PostItem displays a blog post in one of three sizes:
 * "small" (excerpt), "medium" (full content, no carousel), "large" (full content + carousel)
 *
 * @param {Object} post - The post object.
 * @param {string} size - "small", "medium", or "large" (defaults to "medium").
 */
export default function PostItem({ post, size = "medium" }) {
  let contentToRender;
  let showReadMore = false;
  let showCarousel = false;
  let sizeClass = "";

  switch (size) {
    case "small":
      contentToRender = post.excerpt;
      showReadMore = true;
      sizeClass = "post--small";
      break;
    case "medium":
      contentToRender = post.content;
      sizeClass = "post--medium";
      break;
    case "large":
      contentToRender = post.content;
      showCarousel = true;
      sizeClass = "post--large";
      break;
    default:
      contentToRender = post.content;
      sizeClass = "post--medium";
  }

  function getId(id) {
    if (!id) return "";
    if (typeof id === "object" && "$oid" in id) return id.$oid;
    return id;
  }

  return (
    <div className={`post-item ${sizeClass}`}>
      <h3>{post.title}</h3>

      <SafeHTMLRenderer content={contentToRender} />

      {showReadMore && (
        <div className="post-read-more">
          <Link to={`/posts/${getId(post._id)}`} className="detail-link">
            Read more →
          </Link>
        </div>
      )}

      {post.author?.name && <small>By: {post.author.name}</small>}

      {showCarousel && post.carousel && (
        <CarouselItem carousel={post.carousel} />
      )}
    </div>
  );
}
