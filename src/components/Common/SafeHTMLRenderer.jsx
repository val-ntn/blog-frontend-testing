/* //frontend/src/components/Common/SafeHTMLRenderer.jsx


import DOMPurify from 'dompurify';
import parse, { domToReact } from 'html-react-parser';
import CarouselItem from '../Carousel/CarouselItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';

const sanitizeConfig = {
  ALLOWED_TAGS: [
    'a', 'b', 'i', 'u', 'em', 'strong', 'p', 'br', 'div', 'span', 'ul', 'ol', 'li',
    'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code'
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'width', 'height', 'class', 'style', 'data-carousel-id'
  ],
  FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'onfocus'],
};

export default function SafeHTMLRenderer({ content }) {
  const [carousels, setCarousels] = useState({});

  useEffect(() => {
    axios.get(`${API_BASE_URL}/carousels`, { withCredentials: true })
      .then(res => {
        const byId = {};
        res.data.forEach(c => { byId[c._id] = c; });
        setCarousels(byId);
      })
      .catch(console.error);
  }, []);

  const sanitized = DOMPurify.sanitize(content, sanitizeConfig);

  const options = {
    replace: (domNode) => {
      if (
        domNode.name === 'div' &&
        domNode.attribs?.class?.includes('carousel-placeholder') &&
        domNode.attribs?.['data-carousel-id']
      ) {
        const id = domNode.attribs['data-carousel-id'];
        const carousel = carousels[id];
        if (carousel) {
          return <CarouselItem carousel={carousel} />;
        } else {
          return <div style={{ color: 'red' }}>[Missing Carousel]</div>;
        }
      }
    }
  };

  return <div className="safe-html">{parse(sanitized, options)}</div>;
}

 */

//frontend/src/components/Common/SafeHTMLRenderer.jsx
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import CarouselItem from "../Images-Carousels/CarouselItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";

const sanitizeConfig = {
  ALLOWED_TAGS: [
    "a",
    "b",
    "i",
    "u",
    "em",
    "strong",
    "p",
    "br",
    "div",
    "span",
    "ul",
    "ol",
    "li",
    "img",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "blockquote",
    "pre",
    "code",
  ],
  ALLOWED_ATTR: [
    "href",
    "src",
    "alt",
    "title",
    "width",
    "height",
    "class",
    "style",
    "data-carousel-id",
  ],
  FORBID_ATTR: ["onerror", "onclick", "onload", "onmouseover", "onfocus"],
};

export default function SafeHTMLRenderer({ content }) {
  const [carousels, setCarousels] = useState({});

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/carousels`, { withCredentials: true })
      .then((res) => {
        const byId = {};
        res.data.forEach((c) => {
          byId[c._id] = c;
        });
        setCarousels(byId);
        console.log(
          "Loaded carousels for SafeHTMLRenderer:",
          Object.keys(byId)
        );
      })
      .catch((err) => {
        console.error("Failed to load carousels for SafeHTMLRenderer:", err);
      });
  }, []);

  const sanitized = DOMPurify.sanitize(content, sanitizeConfig);

  const options = {
    replace: (domNode) => {
      if (
        domNode.name === "div" &&
        domNode.attribs?.class?.includes("carousel-placeholder") &&
        domNode.attribs?.["data-carousel-id"]
      ) {
        const id = domNode.attribs["data-carousel-id"];
        const carousel = carousels[id];
        if (carousel) {
          console.log(`Rendering CarouselItem for carousel ID: ${id}`);
          return <CarouselItem carousel={carousel} />;
        } else {
          console.warn(`[Missing Carousel] for ID: ${id}`);
          return <div style={{ color: "red" }}>[Missing Carousel]</div>;
        }
      }
    },
  };

  return <div className="safe-html">{parse(sanitized, options)}</div>;
}

/* 
// frontend/src/components/Common/SafeHTMLRenderer.jsx
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import CarouselItem from '../Carousel/CarouselItem';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';

const sanitizeConfig = {
  ALLOWED_TAGS: [
    'a', 'b', 'i', 'u', 'em', 'strong', 'p', 'br', 'div', 'span', 'ul', 'ol', 'li',
    'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code'
  ],
  ALLOWED_ATTR: [
    'href', 'src', 'alt', 'title', 'width', 'height', 'class', 'style', 'data-carousel-id'
  ],
  FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover', 'onfocus'],
};

export default function SafeHTMLRenderer({ content }) {
  const [carousels, setCarousels] = useState({});

  useEffect(() => {
    axios.get(`${API_BASE_URL}/carousels`, { withCredentials: true })
      .then(res => {
        const byId = {};
        res.data.forEach(c => { byId[c._id] = c; });
        setCarousels(byId);
        console.log('Loaded carousels for SafeHTMLRenderer:', Object.keys(byId));
      })
      .catch(err => {
        console.error('Failed to load carousels for SafeHTMLRenderer:', err);
      });
  }, []);

  const sanitized = DOMPurify.sanitize(content, sanitizeConfig);

  const options = {
    replace: (domNode) => {
      // Defensive null checks & logging
      if (!domNode) return;

      // Log every node processed to help debugging (optional, comment out if too verbose)
      // console.log('replace domNode:', domNode);

      if (
        domNode.name === 'div' &&
        domNode.attribs &&
        typeof domNode.attribs.class === 'string' &&
        domNode.attribs.class.includes('carousel-placeholder') &&
        typeof domNode.attribs['data-carousel-id'] === 'string'
      ) {
        const id = domNode.attribs['data-carousel-id'];
        const carousel = carousels[id];
        if (carousel) {
          console.log(`Rendering CarouselItem for carousel ID: ${id}`);
          return <CarouselItem carousel={carousel} />;
        } else {
          console.warn(`[Missing Carousel] for ID: ${id}`);
          return <div style={{ color: 'red' }}>[Missing Carousel]</div>;
        }
      }
    }
  };

  return <div className="safe-html">{parse(sanitized, options)}</div>;
}
 */
