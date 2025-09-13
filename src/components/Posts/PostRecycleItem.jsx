//src/components/Posts/PostRecycleItem.jsx
/*import PropTypes from "prop-types";

export default function PostRecycleItem({ post, onRestore, onDelete }) {
  return (
    <div className="post-recycle-item">
      <h4>{post.title}</h4>
      <div>
        <button type="button" onClick={() => onRestore(post._id)}>
          Restore
        </button>
        <button type="button" onClick={() => onDelete(post._id)}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

PostRecycleItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRestore: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};*/

// src/components/Posts/PostRecycleItem.jsx
/*import SafeHTMLRenderer from "../Common/SafeHTMLRenderer";
import PropTypes from "prop-types";

export default function PostRecycleItem({ post, size = "small" }) {
  let contentToRender = size === "small" ? post.excerpt : post.content;

  return (
    <div className={`card-item--${size}--wrapper`}>
      <div className={`post-item post-item--${size}`}>
        <h3 className={`card__title card__title--${size}`}>{post.title}</h3>
        <SafeHTMLRenderer content={contentToRender} />
        {post.author?.name && (
          <small className="card__meta">By: {post.author.name}</small>
        )}
      </div>
    </div>
  );
}

PostRecycleItem.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ $oid: PropTypes.string }),
    ]).isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.shape({ name: PropTypes.string }),
  }).isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};
*/
//src/components/Posts/PostRecycleItem.jsx
import PropTypes from "prop-types";
import SafeHTMLRenderer from "../Common/SafeHTMLRenderer";
import CarouselItem from "../Images-Carousels/CarouselItem";

export default function PostRecycleItem({ post, size = "medium" }) {
  let contentToRender = null;
  let showCarousel = false;

  switch (size) {
    case "large":
      contentToRender = post.content;
      showCarousel = !!post.carousel;
      break;
    case "small":
    default:
      contentToRender = null; // only title
  }

  return (
    <div className={`card-item--${size}--wrapper`}>
      <div className={`post-item post-item--${size}`}>
        <h3 className={`card__title card__title--${size}`}>{post.title}</h3>
        {contentToRender && <SafeHTMLRenderer content={contentToRender} />}
        {showCarousel && <CarouselItem carousel={post.carousel} />}
        {post.author?.name && (
          <small className="card__meta">By: {post.author.name}</small>
        )}
      </div>
    </div>
  );
}

PostRecycleItem.propTypes = {
  post: PropTypes.object.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};
