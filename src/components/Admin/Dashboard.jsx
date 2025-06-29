// src/components/Admin/Dashboard.jsx


import { useState } from 'react';
import RecycleManager from './RecycleManager';
import PostListControl from './PostListControl';
import EventListControl from './EventListControl';
import Sidebar from './Sidebar';
import PostForm from './PostForm';
import EventForm from './EventForm';

export default function Dashboard() {
  // Lift refresh flags for posts and events here
  const [postRefreshFlag, setPostRefreshFlag] = useState(false);
  const [eventRefreshFlag, setEventRefreshFlag] = useState(false);
  const [postRecycleRefreshFlag, setPostRecycleRefreshFlag] = useState(false);
  const [eventRecycleRefreshFlag, setEventRecycleRefreshFlag] = useState(false);
  const [selectedSection, setSelectedSection] = useState('posts');

  // Local UI state to control whether to show the form fullscreen
  const [showPostForm, setShowPostForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

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

        {/* Posts Section */}
        {selectedSection === 'posts' && (
          <>
            {!showPostForm ? (
              <>
                {/* Button to show post creation form */}
                <button onClick={() => setShowPostForm(true)}>Create New Post</button>
                {/* Post listing controls */}
                <PostListControl
                  refreshFlag={postRefreshFlag}
                  onRefresh={triggerPostRefresh}
                  onRecycleRefresh={triggerPostRecycleRefresh}
                />
              </>
            ) : (
              <>
                {/* Fullscreen Post form */}
                <PostForm
                  onCreateSuccess={() => {
                    setShowPostForm(false);
                    triggerPostRefresh();
                  }}
                />
                {/* Optional Cancel button */}
                <button onClick={() => setShowPostForm(false)}>Cancel</button>
              </>
            )}
          </>
        )}

        {/* Events Section */}
        {selectedSection === 'events' && (
          <>
            {!showEventForm ? (
              <>
                {/* Button to show event creation form */}
                <button onClick={() => setShowEventForm(true)}>Create New Event</button>
                {/* Event listing controls */}
                <EventListControl
                  refreshFlag={eventRefreshFlag}
                  onRefresh={triggerEventRefresh}
                  onRecycleRefresh={triggerEventRecycleRefresh}
                />
              </>
            ) : (
              <>
                {/* Fullscreen Event form */}
                <EventForm
                  onCreateSuccess={() => {
                    setShowEventForm(false);
                    triggerEventRefresh();
                  }}
                />
                {/* Optional Cancel button */}
                <button onClick={() => setShowEventForm(false)}>Cancel</button>
              </>
            )}
          </>
        )}

        {/* Bin / Recycle Section */}
        {selectedSection === 'bin' && (
          <RecycleManager
            onPostRestore={triggerPostRefresh}
            onEventRestore={triggerEventRefresh}
            postRecycleRefreshFlag={postRecycleRefreshFlag}
            eventRecycleRefreshFlag={eventRecycleRefreshFlag}
          />
        )}

        {/* Users Section */}
        {selectedSection === 'users' && (
          <div>User management coming soon...</div>
        )}
      </div>
    </div>
  );
}
