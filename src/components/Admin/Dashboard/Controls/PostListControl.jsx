// src/components/Admin/Dashboard/Controls/PostListControl.jsx
import { useState } from "react";
import PostList from "../../../Posts/PostList";
import { API_BASE_URL } from "../../../../utils/api";
import axios from "axios";

export default function PostListControl({
  refreshFlag,
  onRefresh,
  onRecycleRefresh,
  onEdit,
}) {
  const [expandedPosts, setExpandedPosts] = useState({});
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/posts/${id}`, {
        withCredentials: true,
      });
      if (onRefresh) onRefresh();
      if (onRecycleRefresh) onRecycleRefresh();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const togglePostSize = (id) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <h3>All Posts</h3>

      <PostList
        refreshFlag={refreshFlag}
        renderActions={(post) => (
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => onEdit?.(post)}>
              ✏ Edit
            </button>
            <button type="button" onClick={() => handleDelete(post._id)}>
              🗑 Delete
            </button>
            {/* Toggle size for this post */}
            <button type="button" onClick={() => togglePostSize(post._id)}>
              {expandedPosts[post._id] ? "Collapse" : "Expand"}
            </button>
          </div>
        )}
        size="small"
        renderSize={(post) => (expandedPosts[post._id] ? "large" : "small")}
      />
    </div>
  );
}
