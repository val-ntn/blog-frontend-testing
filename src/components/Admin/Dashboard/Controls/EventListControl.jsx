//src/components/Admin/Dashboard/Controls/EventListControl.jsx

/*import EventList from "../../../Events/EventList";
import { API_BASE_URL } from "../../../../utils/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EventListControl({
  refreshFlag,
  onRefresh,
  onRecycleRefresh,
  onEdit,
}) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/events/${id}`, {
        withCredentials: true,
      });
      if (onRefresh) onRefresh();
      if (onRecycleRefresh) onRecycleRefresh();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div>
      <h3>All Events</h3>
      <EventList
        size="small"
        refreshFlag={refreshFlag}
        renderActions={(event) => (
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => onEdit?.(event)}>
              ✏ Edit
            </button>
            <button type="button" onClick={() => handleDelete(event._id)}>
              🗑 Delete
            </button>
            <button
              type="button"
              onClick={() => navigate(`/admin/events/${event._id}/reports`)}
            >
              📄 Reports
            </button>
          </div>
        )}
      />
    </div>
  );
}*/
//src/components/Admin/Dashboard/Controls/EventListControl.jsx
import { useState } from "react";
import EventList from "../../../Events/EventList";
import { API_BASE_URL } from "../../../../utils/api";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";

export default function EventListControl({
  refreshFlag,
  onRefresh,
  onRecycleRefresh,
  onEdit,
}) {
  const navigate = useNavigate();

  // Track which events are expanded
  const [expandedEvents, setExpandedEvents] = useState({});
  // { [eventId]: true } => large, false/undefined => small

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/events/${id}`, {
        withCredentials: true,
      });
      if (onRefresh) onRefresh();
      if (onRecycleRefresh) onRecycleRefresh();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const toggleEventSize = (id) => {
    setExpandedEvents((prev) => ({
      ...prev,
      [id]: !prev[id], // toggle the specific event
    }));
  };

  return (
    <div>
      <h3 className="dashboard-content--text">All Events</h3>

      <EventList
        refreshFlag={refreshFlag}
        renderActions={(event) => (
          <div className="dashboard-action-buttons">
            <div className="dashboard-action-buttons__left">
              <button
                type="button"
                className="dashboard-action-buttons__edit"
                onClick={() => onEdit?.(event)}
              >
                ✏ Edit
              </button>
              <button
                type="button"
                className="dashboard-action-buttons__delete"
                onClick={() => handleDelete(event._id)}
              >
                🗑 Delete
              </button>
              <button
                type="button"
                className="dashboard-action-buttons__reports"
                onClick={() => navigate(`/admin/events/${event._id}/reports`)}
              >
                📄 Reports
              </button>
            </div>
            <div className="dashboard-action-buttons__right">
              {/* Toggle size for this event */}
              <button
                type="button"
                className="dashboard-action-buttons__expand"
                onClick={() => toggleEventSize(event._id)}
              >
                {expandedEvents[event._id] ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </button>
            </div>
          </div>
        )}
        size="small" // default small for all events
        renderSize={(event) => (expandedEvents[event._id] ? "large" : "small")} // new prop
      />
    </div>
  );
}
