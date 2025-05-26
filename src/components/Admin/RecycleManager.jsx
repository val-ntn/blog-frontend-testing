// src/components/Admin/RecycleManager.jsx
import { useState } from 'react';
import RecycleBin from './RecycleBin'; // ← This actually shows deleted items

export default function RecycleManager() {
  const [showBin, setShowBin] = useState(false);

  return (
    <div>
      <button onClick={() => setShowBin(prev => !prev)}>
        {showBin ? '← Hide Recycle Bin' : '🗑 Show Recycle Bin'}
      </button>

      {showBin && <RecycleBin />}
    </div>
  );
}
