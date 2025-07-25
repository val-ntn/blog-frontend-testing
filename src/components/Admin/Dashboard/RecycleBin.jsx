// src/components/Admin/Dashboard/RecycleBin.jsx

import { useState } from 'react';
import PostRecycleList from '../../Posts/PostRecycleList';
import EventRecycleList from '../../Events/EventRecycleList';

export default function RecycleBin({ 
  onPostRestore, 
  onEventRestore, 
  postRecycleRefreshFlag,        // accept this flag
  eventRecycleRefreshFlag        // accept this flag
}) {
  const [filter, setFilter] = useState('all');

  return (
    <div>
      <h2>Recycle Bin</h2>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('post')}>Posts</button>
        <button onClick={() => setFilter('event')}>Events</button>
      </div>

      {filter === 'post' && (
        <PostRecycleList 
          onRestore={onPostRestore} 
          refreshFlag={postRecycleRefreshFlag}    // pass flag here
        />
      )}
      {filter === 'event' && (
        <EventRecycleList 
          onRestore={onEventRestore} 
          refreshFlag={eventRecycleRefreshFlag}  // pass flag here
        />
      )}
      {filter === 'all' && (
        <>
          <PostRecycleList 
            onRestore={onPostRestore} 
            refreshFlag={postRecycleRefreshFlag}  // pass flag here
          />
          <EventRecycleList 
            onRestore={onEventRestore} 
            refreshFlag={eventRecycleRefreshFlag} // pass flag here
          />
        </>
      )}
    </div>
  );
}

