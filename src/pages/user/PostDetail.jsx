// frontend/src/pages/user/PostDetail.jsx

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PostItem from "../../components/Posts/PostItem";
import { API_BASE_URL } from "../../utils/api";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch post");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched post:", data); // for debug
        setPost(data);
      })
      .catch(console.error);
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return <PostItem post={post} size="large" />;
}
