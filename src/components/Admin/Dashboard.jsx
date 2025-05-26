// src/components/Admin/Dashboard.jsx



/*export default Dashboard; */
import PostManager from './PostManager';
import EventManager from './EventManager';
import RecycleManager from './RecycleManager';

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <PostManager />
      <EventManager />
      <RecycleManager />
    </div>
  );
}

