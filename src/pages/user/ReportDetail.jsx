// src/pages/user/ReportDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SafeHTMLRenderer from '../../components/Common/SafeHTMLRenderer';
import { API_BASE_URL } from '../../utils/api';
import { Link } from 'react-router-dom';

export default function ReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/event-reports/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch report');
        return res.json();
      })
      .then(data => setReport(data))
      .catch(console.error);
  }, [id]);

  if (!report) return <p>Loading...</p>;

  return (
    <article>
      <h1>{report.title}</h1>
      <SafeHTMLRenderer content={report.content} />
      <p><em>By {report.author?.name || 'Unknown'}</em></p>
      <p>
  <strong>Event:</strong>{' '}
  {report.event ? (
    <Link to={`/events/${report.event._id}`}>
      {report.event.title || report.event.name}
    </Link>
  ) : (
    'N/A'
  )}
</p>
    </article>
  );
}
