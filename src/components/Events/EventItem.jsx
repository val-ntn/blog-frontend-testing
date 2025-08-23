// src/components/Events/EventItem.jsx

import React from "react";
import { formatDateRange, getExcerpt } from "../../utils/format";
import PropTypes from "prop-types";
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
      <h4 className="card__title">{event.title}</h4>
      {description && <p className="card__text">{description}</p>}
      <small className="card__date card__date--center">
        Date: {formatDateRange(event.startDate, event.endDate)}
      </small>
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

EventItem.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({ $oid: PropTypes.string }),
    ]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    startDate: PropTypes.oneOfType([
      PropTypes.string, // when fetched as JSON
      PropTypes.instanceOf(Date),
    ]).isRequired,
    endDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
  }).isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  linkToDetail: PropTypes.bool,
};
