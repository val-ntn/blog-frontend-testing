// frontend/src/components/Common/SafeHTMLRenderer.jsx
import DOMPurify from 'dompurify';

export default function SafeHTMLRenderer({ content }) {
  const cleanHTML = DOMPurify.sanitize(content);
  return <div className="safe-html" dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}
