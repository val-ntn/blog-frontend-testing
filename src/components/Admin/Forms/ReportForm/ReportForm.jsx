// frontend/src/components/Admin/Forms/ReportForm/ReportForm.jsx

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../utils/api";
import ImageSelector from "../../ImageSelector";
import CarouselSelector from "../../CarouselSelector";
import styles from "./ReportForm.module.css";
import ImageToolbar from "./ImageToolbar";
import RichTextEditor from "./RichTextEditor";

export default function ReportForm({ onCreateSuccess, initialData }) {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  const [eventId, setEventId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");

  const editorRef = useRef(null);
  const toolbarRef = useRef(null);
  const selectedImgRef = useRef(null);

  const [selectedSides, setSelectedSides] = useState(new Set(["all"]));

  const [selectedCarousel, setSelectedCarousel] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/events`, { withCredentials: true })
      .then((res) => setEvents(res.data))
      .catch(console.error);

    axios
      .get(`${API_BASE_URL}/users`, { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (initialData) {
      setEventId(initialData.event?._id || initialData.event || "");
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
      setAuthor(initialData.author?._id || initialData.author || "");
      setExcerpt(initialData.excerpt || "");
    }
  }, [initialData]);

  const clearForm = () => {
    setEventId("");
    setTitle("");
    setContent("");
    setAuthor("");
    setExcerpt("");
  };

  useEffect(() => {
    if (!initialData) clearForm();
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      event: eventId,
      title,
      content,
      author,
      excerpt,
    };

    const request = initialData
      ? axios.put(`${API_BASE_URL}/event-reports/${initialData._id}`, payload, {
          withCredentials: true,
        })
      : axios.post(`${API_BASE_URL}/event-reports`, payload, {
          withCredentials: true,
        });

    request
      .then((res) => {
        console.log(`Report ${initialData ? "updated" : "created"}:`, res.data);
        clearForm();
        if (onCreateSuccess) onCreateSuccess();
      })
      .catch((err) => {
        console.error(
          `Error ${initialData ? "updating" : "creating"} report:`,
          err.response?.data || err.message
        );
      });
  };

  // Helpers to get int style
  const getIntStyle = (el, prop) => {
    if (el.style[prop]) {
      return parseInt(el.style[prop]) || 0;
    }
    const computed = window.getComputedStyle(el).getPropertyValue(prop);
    return parseInt(computed) || 0;
  };

  // Toolbar action handler (matches PostForm)
  const handleToolbarAction = (action) => {
    const img = selectedImgRef.current;
    if (!img) return;
    const sides = selectedSides;

    const updateMargin = (side, delta) => {
      const propMap = {
        top: "marginTop",
        right: "marginRight",
        bottom: "marginBottom",
        left: "marginLeft",
      };
      const cssProp = propMap[side];
      if (!cssProp) return;
      const current = getIntStyle(img, cssProp);
      const newValue = Math.max(current + delta, 0);
      img.style[cssProp] = `${newValue}px`;
    };

    switch (action) {
      case "increase-margin":
        sides.forEach((side) => {
          if (side !== "all") updateMargin(side, 10);
        });
        break;
      case "decrease-margin":
        sides.forEach((side) => {
          if (side !== "all") updateMargin(side, -10);
        });
        break;
      case "align-left":
        img.style.float = "left";
        img.style.marginRight = "1em";
        img.style.marginBottom = "1em";
        break;
      case "align-right":
        img.style.float = "right";
        img.style.marginLeft = "1em";
        img.style.marginBottom = "1em";
        break;
      case "reset-styles":
        img.removeAttribute("style");
        break;
    }
  };

  const hideToolbar = () => {
    if (toolbarRef.current) {
      toolbarRef.current.style.display = "none";
    }
    const editor = editorRef.current;
    if (editor && selectedImgRef.current) {
      editor.dom.removeClass(selectedImgRef.current, "margin-highlighted");
    }
    selectedImgRef.current = null;
  };

  const showToolbarForImage = (img, editor) => {
    // Remove highlight from all images
    editor.dom.removeClass(
      editor.getBody().querySelectorAll("img"),
      "margin-highlighted"
    );
    editor.dom.addClass(img, styles.imageHighlighted);

    selectedImgRef.current = img;

    const rect = img.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const left = rect.left + window.scrollX;
    const toolbar = toolbarRef.current;

    if (toolbar) {
      toolbar.style.top = `${top + rect.height + 10}px`;
      toolbar.style.left = `${left}px`;
      toolbar.style.display = "flex";
      toolbar.style.flexWrap = "wrap";
    }
  };

  return (
    <>
      <h3>{initialData ? "Edit Report" : "Create Report"}</h3>

      <ImageToolbar
        selectedImgRef={selectedImgRef}
        toolbarRef={toolbarRef}
        selectedSides={selectedSides}
        setSelectedSides={setSelectedSides}
        onAction={handleToolbarAction}
      />

      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <label className={styles.label}>
          Event:
          <select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
            className={styles.select}
          >
            <option value="">Select event</option>
            {events.map((ev) => (
              <option key={ev._id} value={ev._id}>
                {ev.title}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Content:
          <RichTextEditor
            value={content}
            onChange={setContent}
            editorRef={editorRef}
            onNodeChange={(e) => {
              const editor = editorRef.current;
              if (e.element.nodeName === "IMG") {
                showToolbarForImage(e.element, editor);
              } else {
                hideToolbar();
              }
            }}
          />
        </label>

        <label className={styles.label}>
          Excerpt:
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            placeholder="Short summary of report"
            className={styles.textarea}
          />
        </label>

        <div style={{ margin: "1rem 0" }}>
          <ImageSelector
            onSelect={(url) => {
              if (editorRef.current) {
                editorRef.current.insertContent(
                  `<img src="${url}" alt="Image" />`
                );
              }
            }}
          />
        </div>
        <CarouselSelector
          onSelect={(carousel) => {
            setSelectedCarousel(carousel);
          }}
        />

        {selectedCarousel && (
          <div>
            Selected Carousel: <strong>{selectedCarousel.title}</strong> (Type:{" "}
            {selectedCarousel.type})
          </div>
        )}

        <label className={styles.label}>
          Author:
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className={styles.select}
          >
            <option value="">Select author</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name || user.username}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className={styles.submitButton}>
          {initialData ? "Update Report" : "Create Report"}
        </button>
      </form>
    </>
  );
}
