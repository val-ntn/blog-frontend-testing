// src/components/Admin/RecycleManager.jsx
import { useState } from 'react';
import RecycleBin from './RecycleBin';

export default function RecycleManager({ 
  onPostRestore, 
  onEventRestore, 
  postRecycleRefreshFlag, 
  eventRecycleRefreshFlag 
}) {
  const [showBin, setShowBin] = useState(false);

  return (
    <div>
      <button onClick={() => setShowBin(prev => !prev)}>
        {showBin ? '← Hide Recycle Bin' : '🗑 Show Recycle Bin'}
      </button>

      {showBin && (
        <RecycleBin
          onPostRestore={onPostRestore}
          onEventRestore={onEventRestore}
          postRecycleRefreshFlag={postRecycleRefreshFlag}     
          eventRecycleRefreshFlag={eventRecycleRefreshFlag}    
        />
      )}
    </div>
  );
}
