//src/components/Posts/PostRecycleItem.jsx
import PropTypes from "prop-types";

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
};
