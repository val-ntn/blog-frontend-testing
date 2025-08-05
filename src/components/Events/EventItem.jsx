// src/components/Events/EventItem.jsx
import React from "react";
import { formatDateRange, getExcerpt } from "../../utils/format";
import { Link } from "react-router-dom";

/* export default function EventItem({ event, compact }) {
  return (
    <div className={`event-item ${compact ? "compact" : ""}`}>
      <h4>{event.title}</h4>
      {!compact && <p>{event.description}</p>}
      {compact && <p>{getExcerpt(event.description, 60)}</p>}
      <small>Date: {formatDate(event.startDate)}</small>
    </div>
  );
} */

export default function EventItem({ event, compact, linkToDetail = false }) {
  const content = (
    <div className={`event-item ${compact ? "compact" : ""}`}>
      <h4>{event.title}</h4>
      {!compact && <p>{event.description}</p>}
      {compact && <p>{getExcerpt(event.description, 60)}</p>}
      <small>Date: {formatDateRange(event.startDate, event.endDate)}</small>
    </div>
  );

  return linkToDetail ? (
    <Link to={`/events/${event.id}`} className="event-item-link">
      {content}
    </Link>
  ) : (
    content
  );
}
