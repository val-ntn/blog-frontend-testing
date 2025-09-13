// src/components/Events/EventRecycleItem.jsx
/*import PropTypes from "prop-types";

export default function EventRecycleItem({ event, onRestore, onDelete }) {
  return (
    <div className="event-recycle-item">
      <h4>{event.title}</h4>
      <div>
        <button type="button" onClick={() => onRestore(event._id)}>
          Restore
        </button>
        <button type="button" onClick={() => onDelete(event._id)}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

EventRecycleItem.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRestore: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};*/

// EventRecycleItem.jsx
import PropTypes from "prop-types";
import SafeHTMLRenderer from "../Common/SafeHTMLRenderer";

export default function EventRecycleItem({ event, size = "small" }) {
  let contentToRender = null;
  switch (size) {
    case "large":
      contentToRender = event.description;
      break;
    case "small":
    default:
      contentToRender = null; // only title
  }

  return (
    <div className={`card-item--${size}--wrapper`}>
      <div className={`event-item event-item--${size}`}>
        <h3 className={`card__title card__title--${size}`}>{event.title}</h3>
        {contentToRender && <SafeHTMLRenderer content={contentToRender} />}
        {event.location && size === "large" && <p>📍 {event.location}</p>}
      </div>
    </div>
  );
}

EventRecycleItem.propTypes = {
  event: PropTypes.object.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};
