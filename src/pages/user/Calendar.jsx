// src/pages/Calendar.jsx
import EventList from "../../components/Events/EventList";
import "../../styles/layout.css"; // layout and container styles
import "../../styles/pages.css"; // page-specific styles

export default function Calendar() {
  return (
    <>
      <h1>Calendar</h1>
      <EventList size="large"/>
    </>
  );
}
