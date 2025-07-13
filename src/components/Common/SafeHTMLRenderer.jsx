import DOMPurify from 'dompurify';

// Configure DOMPurify to allow style and class attributes but forbid event handlers
const sanitizeConfig = {
  ALLOWED_TAGS: [
    'a', 'b', 'i', 'u', 'em', 'strong', 'p', 'br', 'div', 'span', 'ul', 'ol', 'li',
    'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code'
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'width', 'height', 'class', 'style'
  ],
  FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'onfocus'], // no JS event handlers
};

export default function SafeHTMLRenderer({ content }) {
  // Optionally, you can add a hook to sanitize CSS inside style attribute (see below)
  const cleanHTML = DOMPurify.sanitize(content, sanitizeConfig);
  return <div className="safe-html" dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
}
