//src/components/Navbar.jsx

import { Link } from "react-router-dom";
import "./Navbar.css"; // optional styling

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/calendar">Calendar</Link>
        </li>
        <li>
          <Link to="/event-reports">Reports</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
