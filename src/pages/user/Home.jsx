// src/pages/user/Home.jsx

import PostList from '../../components/Posts/PostList';
import EventList from '../../components/Events/EventList';
import LatestPost from '../../components/Posts/LatestPost';
import UpcomingEvents from '../../components/Events/UpcomingEvents';
import LatestReport from '../../components/Reports/LatestReport';
import SmallCalendar from '../../components/Events/SmallCalendar';

import '../../styles/Layout.css';  // layout and container styles
import './Home.css';              // page-specific styles

export default function Home() {
  return (

      <div className="grid-layout">
        <div className="hero">Hero Content</div>
        <div className="sidebar">Sidebar</div>  
        <div className="blog-news">
  <h2>Latest Post</h2>
  <LatestPost />
</div>
        <div className="events">
          <h2>Upcoming Events</h2>
          <UpcomingEvents limit={3} />
          <SmallCalendar />
        </div>
        <div className="mapsearch">Map Search</div>
        <div className="widgets">Widgets</div>
        <div className="latest-report">
  <h2>Latest Report</h2>
  <LatestReport />
</div>
      </div>
  
  );
}
