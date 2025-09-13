// src/components/Admin/Dashboard/Controls/PostRecycleControl.jsx
/*import { useState } from "react";
import PostRecycleList from "../../../Posts/PostRecycleList";
import { API_BASE_URL } from "../../../../utils/api";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";

export default function PostRecycleControl({ refreshFlag, onRefresh }) {
  const [expandedPosts, setExpandedPosts] = useState({});

  const handleRestore = async (id) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/posts/restore/${id}`,
        {},
        { withCredentials: true }
      );
      // Remove post locally
      setPosts(posts.filter((p) => p._id !== id));
      // Trigger parent refresh if needed
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Restore failed", err);
    }
  };

  const handleHardDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to permanently delete this post?")
    )
      return;
    try {
      await axios.delete(`${API_BASE_URL}/posts/hard/${id}`, {
        withCredentials: true,
      });
      // Remove post locally
      setPosts(posts.filter((p) => p._id !== id));
      // Trigger parent refresh if needed
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error("Hard delete failed", err);
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
      <h3 className="dashboard-content--text">Deleted Posts</h3>

      <PostRecycleList
        refreshFlag={refreshFlag}
        renderActions={(post) => (
          <div className="dashboard-action-buttons">
            <div className="dashboard-action-buttons__left">
              <button
                type="button"
                className="dashboard-action-buttons__edit"
                onClick={() => handleRestore(post._id)}
              >
                ♻ Restore
              </button>
              <button
                type="button"
                className="dashboard-action-buttons__delete"
                onClick={() => handleHardDelete(post._id)}
              >
                🗑 Delete
              </button>
            </div>
            <div className="dashboard-action-buttons__right">
              <button
                type="button"
                className="dashboard-action-buttons__expand"
                onClick={() => togglePostSize(post._id)}
              >
                {expandedPosts[post._id] ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
          </div>
        )}
        renderSize={(post) => (expandedPosts[post._id] ? "large" : "small")}
      />
    </div>
  );
}*/

// src/components/Posts/PostRecycleControl.jsx
/*import { useState, useEffect } from "react";
import PostRecycleList from "../../../Posts/PostRecycleList";
import axios from "axios";
import { API_BASE_URL } from "../../../../utils/api";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function PostRecycleControl({ refreshFlag, onRestore }) {
  const [posts, setPosts] = useState([]);
  const [expandedPosts, setExpandedPosts] = useState({});

  // Fetch deleted posts
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/posts/bin`, { withCredentials: true })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Failed to fetch deleted posts:", err));
  }, [refreshFlag]);

  const togglePostSize = (id) => {
    setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleRestore = async (id) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/posts/restore/${id}`,
        {},
        { withCredentials: true }
      );
      setPosts((prev) => prev.filter((p) => p._id !== id));
      if (onRestore) onRestore();
    } catch (err) {
      console.error("Restore failed", err);
    }
  };

  const handleHardDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to permanently delete this post?")
    )
      return;
    try {
      await axios.delete(`${API_BASE_URL}/posts/hard/${id}`, {
        withCredentials: true,
      });
      setPosts((prev) => prev.filter((p) => p._id !== id));
      if (onRestore) onRestore();
    } catch (err) {
      console.error("Hard delete failed", err);
    }
  };

  return (
    <div>
      <h3 className="dashboard-content--text">Deleted Posts</h3>
      <PostRecycleList
        posts={posts}
        renderActions={(post) => (
          <div className="dashboard-action-buttons">
            <div className="dashboard-action-buttons__left">
              <button
                type="button"
                className="dashboard-action-buttons__edit"
                onClick={() => handleRestore(post._id)}
              >
                ♻ Restore
              </button>
              <button
                type="button"
                className="dashboard-action-buttons__delete"
                onClick={() => handleHardDelete(post._id)}
              >
                🗑 Delete
              </button>
            </div>
            <div className="dashboard-action-buttons__right">
              <button
                type="button"
                className="dashboard-action-buttons__expand"
                onClick={() => togglePostSize(post._id)}
              >
                {expandedPosts[post._id] ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
          </div>
        )}
        renderSize={(post) => (expandedPosts[post._id] ? "large" : "small")}
      />
    </div>
  );
}
*/

// src/components/Admin/Dashboard/Controls/PostRecycleControl.jsx
import { useState } from "react";
import PostRecycleList from "../../../Posts/PostRecycleList";
import { API_BASE_URL } from "../../../../utils/api";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";

export default function PostRecycleControl({ refreshFlag, onRestore }) {
  const [expandedPosts, setExpandedPosts] = useState({});

  const handleRestore = async (id) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/posts/restore/${id}`,
        {},
        { withCredentials: true }
      );
      if (onRestore) onRestore();
    } catch (err) {
      console.error("Restore failed", err);
    }
  };

  const handleHardDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/posts/hard/${id}`, {
        withCredentials: true,
      });
      if (onRestore) onRestore(); // trigger refresh
    } catch (err) {
      console.error("Hard delete failed", err);
    }
  };

  const togglePostSize = (id) => {
    setExpandedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <h3 className="recycle-bin__section-title">Deleted Posts</h3>

      <PostRecycleList
        refreshFlag={refreshFlag}
        renderActions={(post) => (
          <div className="dashboard-action-buttons">
            <div className="dashboard-action-buttons__left">
              <button
                type="button"
                className="dashboard-action-buttons__restore"
                onClick={() => handleRestore(post._id)}
              >
                ♻ Restore
              </button>
              <button
                type="button"
                className="dashboard-action-buttons__delete"
                onClick={() => handleHardDelete(post._id)}
              >
                🗑 Hard Delete
              </button>
            </div>
            <div className="dashboard-action-buttons__right">
              <button
                type="button"
                className="dashboard-action-buttons__expand"
                onClick={() => togglePostSize(post._id)}
              >
                {expandedPosts[post._id] ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
          </div>
        )}
        renderSize={(post) => (expandedPosts[post._id] ? "large" : "small")}
      />
    </div>
  );
}
