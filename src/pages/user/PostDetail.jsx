import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SafeHTMLRenderer from '../../components/Common/SafeHTMLRenderer';
import { API_BASE_URL } from '../../utils/api';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data))
      .catch(console.error);
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <article>
      <h1>{post.title}</h1>
      <SafeHTMLRenderer content={post.content} />
      <p><em>By {post.author?.name}</em></p>
    </article>
  );
}
