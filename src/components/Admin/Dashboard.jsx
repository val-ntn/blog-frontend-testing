// src/components/Admin/Dashboard.jsx



/*export default Dashboard; */  
import { useState } from 'react';
import PostManager from './PostManager';
import EventManager from './EventManager';
import RecycleManager from './RecycleManager';
import PostListControl from './PostListControl';
import EventListControl from './EventListControl';
import Sidebar from './Sidebar';

export default function Dashboard() {
  // Lift refresh flags for posts and events here
  const [postRefreshFlag, setPostRefreshFlag] = useState(false);
  const [eventRefreshFlag, setEventRefreshFlag] = useState(false);
  const [postRecycleRefreshFlag, setPostRecycleRefreshFlag] = useState(false);
  const [eventRecycleRefreshFlag, setEventRecycleRefreshFlag] = useState(false);
  const [selectedSection, setSelectedSection] = useState('posts');

  // Callback to trigger refresh for both lists
  const triggerPostRefresh = () => setPostRefreshFlag(prev => !prev);
  const triggerEventRefresh = () => setEventRefreshFlag(prev => !prev);
  const triggerPostRecycleRefresh = () => setPostRecycleRefreshFlag(prev => !prev);
  const triggerEventRecycleRefresh = () => setEventRecycleRefreshFlag(prev => !prev);

 
  return (
    <div className="dashboard-container" style={{ display: 'flex' }}>
      {/* Sidebar with props */}
      <Sidebar selected={selectedSection} onSelect={setSelectedSection} />

      {/* Main content area */}
      <div className="dashboard-content" style={{ flexGrow: 1, padding: '1rem' }}>
        <h2>Dashboard</h2>

        {selectedSection === 'posts' && (
          <>
            <PostManager onCreateSuccess={triggerPostRefresh} />
            <PostListControl
              refreshFlag={postRefreshFlag}
              onRefresh={triggerPostRefresh}
              onRecycleRefresh={triggerPostRecycleRefresh}
            />
          </>
        )}

        {selectedSection === 'events' && (
          <>
            <EventManager onCreateSuccess={triggerEventRefresh} />
            <EventListControl
              refreshFlag={eventRefreshFlag}
              onRefresh={triggerEventRefresh}
              onRecycleRefresh={triggerEventRecycleRefresh}
            />
          </>
        )}

        {selectedSection === 'bin' && (
          <RecycleManager
            onPostRestore={triggerPostRefresh}
            onEventRestore={triggerEventRefresh}
            postRecycleRefreshFlag={postRecycleRefreshFlag}
            eventRecycleRefreshFlag={eventRecycleRefreshFlag}
          />
        )}

        {selectedSection === 'users' && (
          <div>User management coming soon...</div>
        )}

      </div>
    </div>
  );
}
