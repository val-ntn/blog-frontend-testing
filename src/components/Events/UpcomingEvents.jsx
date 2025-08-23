// src/components/Events/UpcomingEvents.jsx
import React, { useEffect, useState } from "react";
import EventItem from "./EventItem";
import { API_BASE_URL } from "../../utils/api";
import PropTypes from "prop-types";
import "./Events.css";

export default function UpcomingEvents({ limit = 3 }) {
  const [events, setEvents] = useState([]);

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
    <div className="events-list">
      {events.map((event) => (
        <React.Fragment key={event._id}>
          <EventItem key={event._id} event={event} size="small" />
          <div className="card__divider" />
        </React.Fragment>
      ))}
    </div>
  );
}

UpcomingEvents.propTypes = {
  limit: PropTypes.number,
};
