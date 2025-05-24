// src/pages/user/Home.jsx
import PostList from '../../components/Posts/PostList';
import EventList from '../../components/Events/EventList';

export default function Home() {
  return (
    <>
      <h1>Welcome to the Blog</h1>

      <section>
        <h2>Latest Post</h2>
        <PostList limit={1} compact={true} />
      </section>

      <section>
        <h2>Upcoming Events</h2>
        <EventList limit={3} onlyUpcoming={true} compact={true} />
      </section>
    </>
  );
}
