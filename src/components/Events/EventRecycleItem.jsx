// src/components/Events/EventRecycleItem.jsx
export default function EventRecycleItem({ event, onRestore, onDelete }) {
  return (
    <div className="event-recycle-item">
      <h4>{event.title}</h4>
      <div>
        <button onClick={() => onRestore(event._id)}>Restore</button>
        <button onClick={() => onDelete(event._id)}>🗑 Delete</button>
      </div>
    </div>
  );
}
