// frontend/src/components/admin/ImageSelector.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";
import PicturesList from "../Images-Carousels/PicturesList";

export default function ImageSelector({ onSelect }) {
  const [images, setImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // NEW

  useEffect(() => {
    if (open) {
      axios
        .get(`${API_BASE_URL}/upload`, { withCredentials: true })
        .then((res) => setImages(res.data))
        .catch(console.error);
    }
  }, [open]);

  const handleImageClick = (url) => {
    onSelect(url);
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={() => setOpen(!open)}>
        📷 Insert Image
      </button>

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

          {/* 👇 Toggle View Mode */}
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
            onSelect={handleImageClick}
            viewMode={viewMode}
            showCopyButton
          />
        </div>
      )}
    </div>
  );
}
