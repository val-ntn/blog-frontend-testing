

// src/components/Events/EventItem.jsx

import React from "react";
import { formatDateRange, getExcerpt } from "../../utils/format";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/**
 * EventItem renders an event in one of three sizes:
 * - "small": excerpt + read more
 * - "medium": full description
 * - "large": full description + extra meta (location, contact, etc.)
 *
 * Consistent with PostItem & ReportItem structure.
 */
export default function EventItem({
  event,
  size = "medium",
  linkToDetail = false,
}) {
  let contentToRender;
  //let showReadMore = false;
  let shouldLink = linkToDetail;
  let showExtraMeta = false;
  let sizeClass = "";


switch (size) {
  case "small":
    contentToRender = event.excerpt || getExcerpt(event.description, 60);
    sizeClass = "event--small";
    break;
  case "medium":
    contentToRender = event.description;
    sizeClass = "event--medium";
    break;
  case "large":
    contentToRender = event.description;
    showExtraMeta = true;
    sizeClass = "event--large";
    shouldLink = false; // override for large
    break;
  default:
    contentToRender = event.description;
    sizeClass = "event--medium";
}
  

  function getId(id) {
    if (!id) return "";
    if (typeof id === "object" && "$oid" in id) return id.$oid;
    return id;
  }

  const body = (
    <div className={`event-item ${sizeClass}`}>
      {/* Event title */}
      <h4 className={`card__title--event card__title-event--${size}`}>
        {event.title}
      </h4>

      {/* Main description/excerpt */}
      {contentToRender && <p className="card__text">{contentToRender}</p>}

      {/* Date (always shown) */}
      <small className="card__date card__date--center">
       {formatDateRange(event.startDate, event.endDate)}
      </small>

      {/* Extra details for large cards */}
      {showExtraMeta && (
        <div className="event-item__meta">
          {event.location && (
            <p>
              <strong>📍 Location:</strong> {event.location}
            </p>
          )}
          {event.schedule && (
            <p>
              <strong>🕒 Schedule:</strong> {event.schedule}
            </p>
          )}
          {event.costs && (
            <p>
              <strong>💲 Costs:</strong> {event.costs}
            </p>
          )}
          {event.contact && (
            <p>
              <strong>☎ Contact:</strong> {event.contact}
            </p>
          )}
          {event.source && (
            <p>
              <a
                href={event.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit website
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );

  return shouldLink ? (
    <Link to={`/events/${getId(event._id)}`} className="event-item__link">
      {body}
    </Link>
  ) : (
    body
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
    excerpt: PropTypes.string, // allow backend-provided excerpt
    startDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]).isRequired,
    endDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    location: PropTypes.string,
    schedule: PropTypes.string,
    costs: PropTypes.string,
    contact: PropTypes.string,
    source: PropTypes.string,
  }).isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  linkToDetail: PropTypes.bool,
};
