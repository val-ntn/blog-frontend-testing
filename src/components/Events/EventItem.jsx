/* // src/components/Events/EventItem.jsx
import React from "react";
import { formatDateRange, getExcerpt } from "../../utils/format";
import { Link } from "react-router-dom";

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
 */

// src/components/Events/EventItem.jsx
import React from "react";
import { formatDateRange, getExcerpt } from "../../utils/format";
import { Link } from "react-router-dom";

/**
 * EventItem renders an event in one of three sizes:
 * "small" (excerpt), "medium" (full desc), "large" (same as medium for now)
 *
 * @param {Object} event - The event object
 * @param {string} size - "small", "medium", or "large"
 * @param {boolean} compact - DEPRECATED
 * @param {boolean} linkToDetail - Wrap in link or not
 */
export default function EventItem({
  event,
  compact,
  size = "medium",
  linkToDetail = false,
}) {
  // Legacy support for compact
  if (compact === true) size = "small";

  let description = "";
  let sizeClass = "";

  switch (size) {
    case "small":
      description = getExcerpt(event.description, 60);
      sizeClass = "event--small";
      break;
    case "medium":
    case "large":
    default:
      description = event.description;
      sizeClass = size === "large" ? "event--large" : "event--medium";
  }

  const content = (
    <div className={`event-item ${sizeClass}`}>
      <h4>{event.title}</h4>
      {description && <p>{description}</p>}
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
