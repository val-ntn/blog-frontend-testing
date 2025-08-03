//frontend/src/pages/user/PostDetail.jsx

/* import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SafeHTMLRenderer from "../../components/Common/SafeHTMLRenderer";
import { API_BASE_URL } from "../../utils/api";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch(console.error);
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <article>
      <h1>{post.title}</h1>
      <SafeHTMLRenderer content={post.content} />
      <p>
        <em>By {post.author?.name}</em>
      </p>
    </article>
  );
} */

// frontend/src/pages/user/PostDetail.jsx

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SafeHTMLRenderer from "../../components/Common/SafeHTMLRenderer";
import { API_BASE_URL } from "../../utils/api";
import CarouselItem from "../../components/Images-Carousels/CarouselItem";

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

  return (
    <article>
      <h1>{post.title}</h1>
      <SafeHTMLRenderer content={post.content} />

      {post.carousel && <CarouselItem carousel={post.carousel} />}

      <p>
        <em>By {post.author?.name || "Unknown"}</em>
      </p>

      {/* Example of related object (if needed) */}
      {/* 
      <p>
        <strong>Category:</strong>{" "}
        {post.category ? (
          <Link to={`/categories/${post.category._id}`}>
            {post.category.name}
          </Link>
        ) : (
          "N/A"
        )}
      </p>
      */}
    </article>
  );
}
