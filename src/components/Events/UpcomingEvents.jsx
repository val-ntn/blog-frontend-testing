// src/components/Events/UpcomingEvents.jsx
/*import React, { useEffect, useState } from "react";
import EventItem from "./EventItem";
import { API_BASE_URL } from "../../utils/api";
import PropTypes from "prop-types";
import "./Events.css";

export default function UpcomingEvents({ limit = 3 }) {
  const [events, setEvents] = useState([]);
  const [collapsed, setCollapsed] = useState(false); // for mobile toggle

  useEffect(() => {
    const start = performance.now();
    fetch(`${API_BASE_URL}/events/upcoming?limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        const end = performance.now();
        console.log(`UpcomingEvents fetch took ${end - start} ms`);
        setEvents(data);
      })
      .catch((err) => console.error("Error loading upcoming events:", err));
  }, [limit]);

  if (events.length === 0) return <p>No upcoming events.</p>;

return (
    <div className="upcoming-events">
      <h2
        className="events-title"
        onClick={() => setCollapsed((prev) => !prev)}
      >
        Upcoming Events
      </h2>
      {!collapsed && (
        <div className="events-list">
          {events.map((event) => (
            <React.Fragment key={event._id}>
              <EventItem key={event._id} event={event} size="small" />
              <div className="card__divider" />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

UpcomingEvents.propTypes = {
  limit: PropTypes.number,
};*/

// src/components/Events/UpcomingEvents.jsx
import React, { useEffect, useState } from "react";
import EventItem from "./EventItem";
import { API_BASE_URL } from "../../utils/api";
import PropTypes from "prop-types";
import { FaChevronDown } from "react-icons/fa";
import SmallCalendar from "../Shared/Calendar/SmallCalendar";
import "./Events.css";

export default function UpcomingEvents({ limit = 3 }) {
  const [events, setEvents] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const start = performance.now();
    fetch(`${API_BASE_URL}/events/upcoming?limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        const end = performance.now();
        console.log(`UpcomingEvents fetch took ${end - start} ms`);
        setEvents(data);
      })
      .catch((err) => console.error("Error loading upcoming events:", err));
  }, [limit]);

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 600;
      setIsMobile(mobile);
      setCollapsed(mobile); // collapse by default if small
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // run on mount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (events.length === 0) return <p>No upcoming events.</p>;

  return (
    <div className="upcoming-events">
      <h2
        className={`events-title ${isMobile ? "toggleable" : ""}`}
        onClick={() => isMobile && setCollapsed((prev) => !prev)}
      >
        Upcoming Events
        {isMobile && (
          <FaChevronDown
            className={`chevron-icon ${collapsed ? "" : "rotated"}`}
          />
        )}
      </h2>

      {/* Only show list if not collapsed */}
      {(!isMobile || !collapsed) && (
        <div className="events-list">
          {events.map((event) => (
            <React.Fragment key={event._id}>
              <EventItem event={event} size="small" />
              <div className="card__divider" />
            </React.Fragment>
          ))}
          <SmallCalendar />
        </div>
      )}
    </div>
  );
}

UpcomingEvents.propTypes = {
  limit: PropTypes.number,
};

