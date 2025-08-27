// src/pages/user/News.jsx
import PostList from "../../components/Posts/PostList";
import "../../styles/layout.css"; // layout and container styles
import "../../styles/pages.css"; // page-specific styles

export default function News() {
  return (
    <div className="page-content news-page">
      <h1>News</h1>
      <PostList />
      </div>
    
  );
}
