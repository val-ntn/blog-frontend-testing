// src/components/Admin/RecycleManager.jsx
import { useState } from 'react';
import RecycleBin from './RecycleBin';

export default function RecycleManager({ onPostRestore, onEventRestore }) {
  const [showBin, setShowBin] = useState(false);

  return (
    <div>
      <button onClick={() => setShowBin(prev => !prev)}>
        {showBin ? '← Hide Recycle Bin' : '🗑 Show Recycle Bin'}
      </button>

      {showBin && <RecycleBin onPostRestore={onPostRestore} onEventRestore={onEventRestore} />}
    </div>
  );
}
