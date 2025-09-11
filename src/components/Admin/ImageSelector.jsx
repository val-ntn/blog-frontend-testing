// frontend/src/components/admin/ImageSelector.jsx

/*import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";
import PropTypes from "prop-types";
import PicturesList from "../Images-Carousels/PicturesList";
import Button from "../UI/Button";

export default function ImageSelector({ onSelect }) {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    if (open) {
      axios
        .get(`${API_BASE_URL}/upload/images`, { withCredentials: true })
        .then((res) => setImages(res.data))
        .catch(console.error);
    }
  }, [open]);

  const handleSelect = (url) => {
    onSelect(url);
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" onClick={() => setOpen(!open)} variant="primary">
        Insert Image
      </Button>

      {open && (
        <div
          style={{
            marginTop: "1rem",
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
            background: "#f9f9f9",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {images.length === 0 && <p>No images available</p>}

      
          <div style={{ marginBottom: "1rem" }}>
            <button
              type="button"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              Switch to {viewMode === "grid" ? "List View" : "Thumbnail View"}
            </button>
          </div>

          <PicturesList
            images={images}
            onSelect={handleSelect}
            viewMode={viewMode}
            showCopyButton
          />
        </div>
      )}
    </div>
  );
}

ImageSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
};*/

// src/components/admin/ImageSelector.jsx
/*import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";
import PropTypes from "prop-types";
import Button from "../UI/Button";
import PictureDisplay from "../Images-Carousels/PictureDisplay";

export default function ImageSelector({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    if (open) {
      axios
        .get(`${API_BASE_URL}/upload/images`, { withCredentials: true })
        .then((res) => setImages(res.data))
        .catch(console.error);
    }
  }, [open]);

  const handleSelect = (image) => {
    // return full object (like CarouselSelector does)
    onSelect(image);
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" onClick={() => setOpen(!open)} variant="primary">
        Insert Image
      </Button>

      {open && (
        <div>
          <PictureDisplay
            images={images}
            onSelect={handleSelect}
            displayMode={viewMode}
            toggleDisplayMode={() =>
              setViewMode(viewMode === "grid" ? "list" : "grid")
            }
            showCopyButton
            mode="picker" // 👈 disables upload/delete (like CarouselDisplay)
          />
        </div>
      )}
    </div>
  );
}

ImageSelector.propTypes = {
  onSelect: PropTypes.func.isRequired, // returns the selected image object
};*/

// src/components/admin/ImageSelector.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";
import PropTypes from "prop-types";
import Button from "../UI/Button";
import PictureDisplay from "../Images-Carousels/PictureDisplay";

export default function ImageSelector({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  // Fetch images when dropdown opens
  useEffect(() => {
    if (open) {
      axios
        .get(`${API_BASE_URL}/upload/images`, { withCredentials: true })
        .then((res) => setImages(res.data))
        .catch(console.error);
    }
  }, [open]);

  // Pass full image object up
  const handleSelect = (image) => {
    onSelect(image);
    setOpen(false); // close after selecting
  };

  return (
    <div>
      <Button type="button" onClick={() => setOpen(!open)} variant="primary">
        Insert Image
      </Button>

      {open && (
        <div>
          <PictureDisplay
            images={images}
            onSelect={handleSelect}
            displayMode={viewMode}
            toggleDisplayMode={() =>
              setViewMode(viewMode === "grid" ? "list" : "grid")
            }
            showCopyButton
            mode="picker" // disables upload/delete
          />
        </div>
      )}
    </div>
  );
}

ImageSelector.propTypes = {
  onSelect: PropTypes.func.isRequired, // returns the selected image object
};
