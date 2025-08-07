//src/components/Navbar.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-home">
          Home
        </Link>
      </div>

      <div className="nav-right">
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
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
      </div>
    </nav>
  );
}

export default Navbar;
