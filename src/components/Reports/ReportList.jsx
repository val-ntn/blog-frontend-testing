// src/components/Reports/ReportList.jsx

import React, { useEffect, useState } from 'react';
import ReportItem from './ReportItem';
import { API_BASE_URL } from '../../utils/api';

export default function ReportList({ limit, compact, refreshFlag, renderActions }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/event-reports`)
      .then(res => res.json())
      .then(data => {
        // Optionally limit reports
        setReports(limit ? data.slice(0, limit) : data);
      })
      .catch(err => console.error('Failed to fetch reports:', err));
  }, [limit, refreshFlag]);

  return (
    <div>
      {reports.length === 0 && <p>No reports found</p>}
      {reports.map(report => (
        <div key={report._id}>
          <ReportItem report={report} compact={compact} />
          {renderActions && renderActions(report)}
        </div>
      ))}
    </div>
  );
}
