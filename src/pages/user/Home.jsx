// src/pages/user/Home.jsx

import LatestPost from "../../components/Posts/LatestPost";
import UpcomingEvents from "../../components/Events/UpcomingEvents";
import LatestReport from "../../components/Reports/LatestReport";
import SmallCalendar from "../../components/Shared/Calendar/SmallCalendar";
import GetTeaserCard from "../../components/Shared/TeaserCard/GetTeaserCard";
//import Sidebar from "../../components/Shared/Sidebar/Sidebar";

import "../../styles/layout.css"; // layout and container styles
import "../../styles/pages.css"; // page-specific styles

export default function Home() {
  return (
    <div className="grid-layout">
      <div className="hero">Hero Content</div>
      <div className="sidebar">
        <p>Sidebar</p>
      </div>
      <div className="blog-news">
        Latest News
        <LatestPost />
      </div>
      <div className="events">
        <h2>Upcoming Events</h2>
        <UpcomingEvents limit={3} />
        <SmallCalendar />
      </div>
      <div className="mapsearch">
        Map Search
        <h2>Teaser Test</h2>
        <GetTeaserCard type="post"/>
      </div>
      <div className="widgets">
        Widgets
        <h2>Teaser Test</h2>
        <GetTeaserCard type="event-report" />
      </div>
      <div className="latest-report">
        Latest Report
        <LatestReport />
      </div>
    </div>
  );
}
