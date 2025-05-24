// src/user/pages/News.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

function News() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>All Blog Posts</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default News;
