import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { API_BASE_URL } from '../../utils/api';

function LatestPost() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts/latest`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(err => console.error('Error loading latest post:', err));
  }, []);

  if (!post) return <p>Loading...</p>;

  return <PostItem post={post} compact={true} />;
}

export default LatestPost;
