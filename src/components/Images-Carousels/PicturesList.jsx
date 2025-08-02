// frontend/src/components/Images-Carousels/PictureList.jsx


import { API_BASE_URL } from '../../utils/api';
import Picture from './Picture'
  

/* export default function PicturesList({ images, uploading, onUpload, onDelete }) {
  return (
    <>
      <input type="file" accept="image/*" onChange={onUpload} disabled={uploading} />
      {uploading && <p>Uploading...</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
        {images.length === 0 && <p>No images found.</p>}
        {images.map(image => (
          <div key={image.name} style={{ position: 'relative' }}>
            <img
              src={`${API_BASE_URL}/uploads/${image.name}`}
              alt={image.name}
              style={{ maxWidth: '150px', borderRadius: '6px' }}
            />
            <button
              onClick={() => onDelete(image.name)}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: 'red',
                color: 'white'
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
 */

export default function PicturesList({ images, uploading, onUpload, onDelete, onSelect, viewMode, showCopyButton }) {
  return (
    <>
      {onUpload && (
        <input type="file" accept="image/*" onChange={onUpload} disabled={uploading} />
      )}
      {uploading && <p>Uploading...</p>}

      {viewMode === 'list' ? (
        <table>
          <tbody>
            {images.map(image => (
              <Picture key={image.name} image={image} onSelect={onSelect} onDelete={onDelete} mode="list" />
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {images.map(image => (
            <Picture key={image.name} image={image} onSelect={onSelect} onDelete={onDelete} mode="grid" showCopyButton={showCopyButton}/>
          ))}
        </div>
      )}
    </>
  );
}
