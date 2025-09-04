// src/components/Admin/Dashboard/Controls/ReportListControl.jsx

import ReportList from "../../../Reports/ReportList";
import { API_BASE_URL } from "../../../../utils/api";
import { useState } from "react";
import axios from "axios";

export default function ReportListControl({
  refreshFlag,
  onRefresh,
  onRecycleRefresh,
  onEdit,
}) {
  const [expandedReports, setExpandedReports] = useState({});
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/event-reports/${id}`, {
        withCredentials: true,
      });
      if (onRefresh) onRefresh();
      if (onRecycleRefresh) onRecycleRefresh();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const toggleReportSize = (id) => {
    setExpandedReports((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div>
      <h3>All Reports</h3>
      <ReportList
        refreshFlag={refreshFlag}
        renderActions={(report) => (
          <div className="flex items-center gap-2">
            <button onClick={() => onEdit?.(report)}>✏ Edit</button>
            <button onClick={() => handleDelete(report._id)}>🗑 Delete</button>
            <button onClick={() => toggleReportSize(report._id)}>
              {expandedReports[report._id] ? "Collapse" : "Expand"}
            </button>
          </div>
        )}
        size="small"
        renderSize={(report) =>
          expandedReports[report._id] ? "large" : "small"
        }
      />
    </div>
  );
}
