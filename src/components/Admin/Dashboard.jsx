// src/components/Admin/Dashboard.jsx



/*export default Dashboard; */
import PostManager from './PostManager';
import EventManager from './EventManager';
import RecycleManager from './RecycleManager';
import PostListControl from './PostListControl';
import EventListControl from './EventListControl';

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <PostManager />
      <EventManager />
      <PostListControl />   {/* Admin Post List with actions */}
      <EventListControl />
      <RecycleManager />
    </div>
  );
}

