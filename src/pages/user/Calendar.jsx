// src/pages/Calendar.jsx
import EventList from "../../components/Events/EventList";
import "../../styles/layout.css"; // layout and container styles
import "../../styles/pages.css"; // page-specific styles

export default function Calendar() {
  return (

    <div className="page-content page-content--calendar">
      <h1 className="header--page">Calendar</h1>
      <EventList size="large" linkToDetail/>
      </div>

  );
}
