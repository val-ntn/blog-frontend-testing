// src/components/Admin/Dashboard.jsx

/* import PostForm from './PostForm';
import EventForm from './EventForm';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <PostForm />
      <EventForm />
    </div>
  );
}

export default Dashboard; */
import PostManager from './PostManager';
import EventManager from './EventManager';

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <PostManager />
      <EventManager />
    </div>
  );
}
