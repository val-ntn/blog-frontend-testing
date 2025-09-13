// src/components/Posts/PostRecycleList.jsx
/*import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import axios from "axios";
import PostRecycleItem from "./PostRecycleItem";
import { API_BASE_URL } from "../../utils/api";

export default function PostRecycleList({ onRestore, refreshFlag }) {
  // add refreshFlag here
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/posts/bin`, { withCredentials: true })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, [refreshFlag]);

  const handleRestore = async (id) => {
    await axios.patch(
      `${API_BASE_URL}/posts/restore/${id}`,
      {},
      { withCredentials: true }
    );
    setPosts(posts.filter((p) => p._id !== id));

    if (onRestore) onRestore();
  };

  const handlePermanentDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to permanently delete this post? This cannot be undone."
    );
    if (!confirm) return;

    await axios.delete(`${API_BASE_URL}/posts/hard/${id}`, {
      withCredentials: true,
    });
    setPosts(posts.filter((p) => p._id !== id));

    if (onRestore) onRestore();
  };

  return (
    <div>
      <h3>Deleted Posts</h3>
      {posts.length === 0 && <p>No deleted posts.</p>}
      {posts.map((post) => (
        <PostRecycleItem
          key={post._id}
          post={post}
          onRestore={handleRestore}
          onDelete={handlePermanentDelete}
        />
      ))}
    </div>
  );
}
PostRecycleList.propTypes = {
  onRestore: PropTypes.func,
  refreshFlag: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};*/

// src/components/Posts/PostRecycleList.jsx
/*import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import PostRecycleItem from "./PostRecycleItem";
import { API_BASE_URL } from "../../utils/api";

export default function PostRecycleList({
  refreshFlag,
  renderActions,
  renderSize,
}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/posts/bin`, { withCredentials: true })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, [refreshFlag]);

  return (
    <div className="post-list--wrapper">
      {posts.length === 0 && <p>No deleted posts.</p>}
      {posts.map((post) => (
        <div key={post._id}>
          <PostRecycleItem
            post={post}
            size={renderSize ? renderSize(post) : "small"}
          />
          {renderActions && renderActions(post)}
        </div>
      ))}
    </div>
  );
}

PostRecycleList.propTypes = {
  refreshFlag: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  renderActions: PropTypes.func,
  renderSize: PropTypes.func,
};*/

// src/components/Posts/PostRecycleList.jsx
/*import PropTypes from "prop-types";
import PostRecycleItem from "./PostRecycleItem";

export default function PostRecycleList({ posts, renderActions, renderSize }) {
  if (!posts || posts.length === 0) return <p>No deleted posts.</p>;

  return (
    <div className="post-list--wrapper">
      {posts.map((post) => (
        <div key={post._id}>
          <PostRecycleItem
            post={post}
            size={renderSize ? renderSize(post) : "small"}
          />
          {renderActions && renderActions(post)}
        </div>
      ))}
    </div>
  );
}

PostRecycleList.propTypes = {
  posts: PropTypes.array.isRequired,
  renderActions: PropTypes.func,
  renderSize: PropTypes.func,
};*/

// src/components/Posts/PostRecycleList.jsx
import React, { useEffect, useState } from "react";
import PostRecycleItem from "./PostRecycleItem";
import PropTypes from "prop-types";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";

export default function PostRecycleList({
  refreshFlag,
  renderActions,
  renderSize,
}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/posts/bin`, { withCredentials: true })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Failed to fetch deleted posts:", err));
  }, [refreshFlag]);

  if (!Array.isArray(posts)) return <p>Loading deleted posts...</p>;

  return (
    <div className="post-list--wrapper">
      {posts.length === 0 && <p>No deleted posts found</p>}
      {posts.map((post) => (
        <div key={post._id}>
          <PostRecycleItem
            post={post}
            size={renderSize ? renderSize(post) : "small"}
          />
          {renderActions && renderActions(post)}
        </div>
      ))}
    </div>
  );
}

PostRecycleList.propTypes = {
  refreshFlag: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  renderActions: PropTypes.func,
  renderSize: PropTypes.func,
};
