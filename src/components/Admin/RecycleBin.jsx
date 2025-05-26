// src/components/Admin/RecycleBin.jsx

import { useState } from 'react';
import PostRecycleList from '../Posts/PostRecycleList';
import EventRecycleList from '../Events/EventRecycleList';

export default function RecycleBin() {
  const [filter, setFilter] = useState('all'); // 'all', 'post', or 'event'

  return (
    <div>
      <h2>Recycle Bin</h2>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('post')}>Posts</button>
        <button onClick={() => setFilter('event')}>Events</button>
      </div>

      {filter === 'post' && <PostRecycleList />}
      {filter === 'event' && <EventRecycleList />}
      {filter === 'all' && (
        <>
          <PostRecycleList />
          <EventRecycleList />
        </>
      )}
    </div>
  );
}
