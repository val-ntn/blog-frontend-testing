// src/components/Reports/ReportItem.jsx

import { Link } from "react-router-dom";
import SafeHTMLRenderer from "../Common/SafeHTMLRenderer";
import CarouselItem from "../../components/Images-Carousels/CarouselItem";

export default function ReportItem({ report, compact }) {
  const contentToRender = compact ? report.excerpt : report.content;

  return (
    <div className={`report-item ${compact ? "compact" : ""}`}>
      <h3>{report.title}</h3>
      <SafeHTMLRenderer content={contentToRender} />

      {/* Show read more link only in compact mode */}
      {compact && (
        <div className="read-more">
          <Link to={`/event-reports/${report._id}`}>Read more →</Link>
        </div>
      )}

      {/* Only show carousel in full view */}
      {!compact && report.carousel && (
        <CarouselItem carousel={report.carousel} />
      )}

      {/* Author info */}
      {report.author?.name && <small>By: {report.author.name}</small>}

      {/* Event link */}
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
