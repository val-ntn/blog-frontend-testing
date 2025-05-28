// src/components/Admin/RecycleBin.jsx

import { useState } from 'react';
import PostRecycleList from '../Posts/PostRecycleList';
import EventRecycleList from '../Events/EventRecycleList';

export default function RecycleBin({ onPostRestore, onEventRestore }) {
  const [filter, setFilter] = useState('all');

  return (
    <div>
      <h2>Recycle Bin</h2>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('post')}>Posts</button>
        <button onClick={() => setFilter('event')}>Events</button>
      </div>

      {filter === 'post' && <PostRecycleList onRestore={onPostRestore} />}
      {filter === 'event' && <EventRecycleList onRestore={onEventRestore} />}
      {filter === 'all' && (
        <>
          <PostRecycleList onRestore={onPostRestore} />
          <EventRecycleList onRestore={onEventRestore} />
        </>
      )}
    </div>
  );
}

