// src/pages/user/Reports.jsx
import ReportList from "../../components/Reports/ReportList";
import "../../styles/layout.css"; // layout and container styles
import "../../styles/pages.css"; // page-specific styles

export default function Reports() {
  return (
    <div className="page-content page-content--reports">
      <h1 className="header--page">Event Reports</h1>
      <ReportList />
    </div>
  );
}
