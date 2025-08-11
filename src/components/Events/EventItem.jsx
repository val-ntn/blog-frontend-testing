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
 * @param {boolean} linkToDetail - Wrap in link or not
 */
export default function EventItem({
  event,
  size = "medium",
  linkToDetail = false,
}) {
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

  function getId(id) {
    if (!id) return "";
    if (typeof id === "object" && "$oid" in id) return id.$oid;
    return id;
  }

  return linkToDetail ? (
    <Link to={`/events/${getId(event._id)}`} className="detail-link">
      {content}
    </Link>
  ) : (
    content
  );
}
