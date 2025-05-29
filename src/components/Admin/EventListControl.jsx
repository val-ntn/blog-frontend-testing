//src/components/Admin/EventListControl.jsx



import EventList from '../../components/Events/EventList';
import { API_BASE_URL } from '../../utils/api';

export default function EventListControl({ refreshFlag, onRefresh, onRecycleRefresh }) {
  const handleEdit = (event) => {
    // Edit logic placeholder (e.g., navigate to edit page or open modal)
    console.log(`Editing event: ${event.title}`);
  };

 const handleDelete = async (id) => {
  try {
    await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (onRefresh) onRefresh();
    if (onRecycleRefresh) onRecycleRefresh(); // 🔁 refresh the bin!
  } catch (err) {
    console.error('Delete failed', err);
  }
};

  return (
    <div>
      <h3>All Events</h3>
      <EventList
        refreshFlag={refreshFlag}
        renderActions={(event) => (
          <div className="flex items-center gap-2">
            <button onClick={() => handleEdit(event)}>✏ Edit</button>
            <button onClick={() => handleDelete(event._id)}>🗑 Delete</button>
          </div>
        )}
      />
    </div>
  );
}
