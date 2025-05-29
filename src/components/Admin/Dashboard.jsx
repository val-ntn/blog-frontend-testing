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
  const [postRecycleRefreshFlag, setPostRecycleRefreshFlag] = useState(false);
  const [eventRecycleRefreshFlag, setEventRecycleRefreshFlag] = useState(false);

  // Callback to trigger refresh for both lists
  const triggerPostRefresh = () => setPostRefreshFlag(prev => !prev);
  const triggerEventRefresh = () => setEventRefreshFlag(prev => !prev);
  const triggerPostRecycleRefresh = () => setPostRecycleRefreshFlag(prev => !prev);
  const triggerEventRecycleRefresh = () => setEventRecycleRefreshFlag(prev => !prev);

  return (
    <div>
      <h2>Dashboard</h2>

      <PostManager onCreateSuccess={triggerPostRefresh} />
      <EventManager onCreateSuccess={triggerEventRefresh} />

      <PostListControl
        refreshFlag={postRefreshFlag}
        onRefresh={triggerPostRefresh}
        onRecycleRefresh={triggerPostRecycleRefresh}
      />
      <EventListControl
        refreshFlag={eventRefreshFlag}
        onRefresh={triggerEventRefresh}
        onRecycleRefresh={triggerEventRecycleRefresh}
      />

      <RecycleManager
        onPostRestore={triggerPostRefresh}
        onEventRestore={triggerEventRefresh}
        postRecycleRefreshFlag={postRecycleRefreshFlag}
        eventRecycleRefreshFlag={eventRecycleRefreshFlag}
      />
    </div>
  );
}
