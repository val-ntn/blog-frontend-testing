// src/components/Admin/Dashboard.jsx



/*export default Dashboard; */
import { useState } from 'react';
import PostManager from './PostManager';
import EventManager from './EventManager';
import RecycleManager from './RecycleManager';
import PostListControl from './PostListControl';
import EventListControl from './EventListControl';

export default function Dashboard() {
  // Lift refresh flags for posts and events here
  const [postRefreshFlag, setPostRefreshFlag] = useState(false);
  const [eventRefreshFlag, setEventRefreshFlag] = useState(false);

  // Callback to trigger refresh for both lists
  const triggerPostRefresh = () => setPostRefreshFlag(prev => !prev);
  const triggerEventRefresh = () => setEventRefreshFlag(prev => !prev);

  return (
    <div>
      <h2>Dashboard</h2>

      <PostManager onCreateSuccess={triggerPostRefresh} />
      <EventManager onCreateSuccess={triggerEventRefresh} />

      <PostListControl
        refreshFlag={postRefreshFlag}
        onRefresh={triggerPostRefresh}
      />
      <EventListControl
        refreshFlag={eventRefreshFlag}
        onRefresh={triggerEventRefresh}
      />

      <RecycleManager
        onPostRestore={triggerPostRefresh}
        onEventRestore={triggerEventRefresh}
      />
    </div>
  );
}
