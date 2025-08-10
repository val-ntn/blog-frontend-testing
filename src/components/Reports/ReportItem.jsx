// src/components/Reports/ReportItem.jsx

import { Link } from "react-router-dom";
import SafeHTMLRenderer from "../Common/SafeHTMLRenderer";
import CarouselItem from "../../components/Images-Carousels/CarouselItem";

/**
 * ReportItem displays a report in "small", "medium", or "large" size.
 * - "small" shows excerpt + "read more"
 * - "medium" shows full content
 * - "large" shows content + optional carousel
 *
 * @param {Object} report - The report object
 * @param {string} size - "small", "medium", or "large"
 * @param {boolean} compact - DEPRECATED
 */
export default function ReportItem({ report, size = "medium", compact }) {
  // Legacy compact support
  if (compact === true) size = "small";

  let contentToRender;
  let showReadMore = false;
  let showCarousel = false;
  let sizeClass = "";

  switch (size) {
    case "small":
      contentToRender = report.excerpt;
      showReadMore = true;
      sizeClass = "report--small";
      break;
    case "large":
      contentToRender = report.content;
      showCarousel = true;
      sizeClass = "report--large";
      break;
    case "medium":
    default:
      contentToRender = report.content;
      sizeClass = "report--medium";
  }

  return (
    <div className={`report-item ${sizeClass}`}>
      <h3>{report.title}</h3>
      <SafeHTMLRenderer content={contentToRender} />

      {showReadMore && (
        <div className="report-read-more">
          <Link to={`/event-reports/${report._id}`}>Read more →</Link>
        </div>
      )}

      {showCarousel && report.carousel && (
        <CarouselItem carousel={report.carousel} />
      )}

      {report.author?.name && <small>By: {report.author.name}</small>}

      {report.event && (
        <small>
          {" "}
          | Related Event:{" "}
          <Link to={`/events/${report.event._id}`}>
            {report.event.title || report.event.name}
          </Link>
        </small>
      )}
    </div>
  );
}
