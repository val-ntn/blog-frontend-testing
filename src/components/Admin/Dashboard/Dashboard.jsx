// src/components/Admin/Dashboard.jsx


import { useState } from 'react';
import RecycleBin from './RecycleBin';
import PostListControl from './PostListControl';
import EventListControl from './EventListControl';
import Sidebar from './Sidebar';
import PostForm from '../PostForm/PostForm';
import EventForm from '../EventForm/EventForm';
import PicturesManager from './PicturesManager';

export default function Dashboard() {
  // Lift refresh flags for posts and events here
  const [postRefreshFlag, setPostRefreshFlag] = useState(false);
  const [eventRefreshFlag, setEventRefreshFlag] = useState(false);
  const [postRecycleRefreshFlag, setPostRecycleRefreshFlag] = useState(false);
  const [eventRecycleRefreshFlag, setEventRecycleRefreshFlag] = useState(false);
  const [selectedSection, setSelectedSection] = useState('posts');
  const [editingPost, setEditingPost] = useState(null); // null means creating new
  const [editingEvent, setEditingEvent] = useState(null);


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
    <button onClick={() => {
      setEditingPost(null);     // reset edit mode
      setShowPostForm(true);    // show empty form
    }}>
      Create New Post
    </button>

    <PostListControl
      refreshFlag={postRefreshFlag}
      onRefresh={triggerPostRefresh}
      onRecycleRefresh={triggerPostRecycleRefresh}
      onEdit={(post) => {
        setEditingPost(post);     // set post for editing
        setShowPostForm(true);    // open form
      }}
    />
  </>
) : (
  <>
    <PostForm
      initialData={editingPost}
      onCreateSuccess={() => {
        setShowPostForm(false);
        setEditingPost(null);
        triggerPostRefresh();
      }}
    />
    <button onClick={() => {
      setShowPostForm(false);
      setEditingPost(null);
    }}>
      Cancel
    </button>
  </>
)}

          </>
        )}

        {/* Events Section */}
        {selectedSection === 'events' && (
  <>
    {!showEventForm ? (
      <>
        <button onClick={() => {
          setEditingEvent(null);    // reset edit mode (new event)
          setShowEventForm(true);   // show empty form
        }}>
          Create New Event
        </button>

        <EventListControl
          refreshFlag={eventRefreshFlag}
          onRefresh={triggerEventRefresh}
          onRecycleRefresh={triggerEventRecycleRefresh}
          onEdit={(event) => {
            setEditingEvent(event);  // set event to edit
            setShowEventForm(true);  // open the form
          }}
        />
      </>
    ) : (
      <>
        <EventForm
          initialData={editingEvent}  // pass event data for editing or null for new
          onCreateSuccess={() => {
            setShowEventForm(false);
            setEditingEvent(null);
            triggerEventRefresh();
          }}
        />
        <button onClick={() => {
          setShowEventForm(false);
          setEditingEvent(null);
        }}>
          Cancel
        </button>
      </>
    )}
  </>
)}

        {/* Pictures */}
{selectedSection === 'pictures' && (
  <PicturesManager />
)}

        {/* Bin / Recycle Section */}
        {selectedSection === 'bin' && (
  <RecycleBin
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
