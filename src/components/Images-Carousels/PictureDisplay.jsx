// src/components/Images-Carousels/PictureDisplay.jsx
import { useState } from "react";
import { API_BASE_URL } from "../../utils/api";
import Picture from "./PictureObj";
import "./PictureDisplay.css";

export default function PictureDisplay({
  images,
  onDelete,
  onUpload,
  uploading,
  displayMode = "list",
  toggleDisplayMode,
  showCopyButton,
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelect = (image) => {
    if (selectedImage?.filename === image.filename) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
    }
  };

  return (
    <div className="picture">
      {/* Upload input + View toggle */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="file"
          accept="image/*"
          onChange={onUpload}
          disabled={uploading}
        />
        {uploading && <p>Uploading...</p>}
      </div>

      {/* Header with toggle button */}
      <div className="picture__display-header">
        <div className="picture__header-spacer"></div>
        <button type="button" onClick={toggleDisplayMode}>
          Switch to {displayMode === "grid" ? "List View" : "Thumbnail View"}
        </button>
      </div>

      {/* Main display area */}
      <div className="picture__display-wrapper">
        {displayMode === "grid" ? (
          <div className="picture__scroll-wrapper">
            <div className="picture__grid">
              {images.map((image) => (
                <Picture
                  key={image.filename}
                  image={image}
                  onSelect={handleSelect}
                  onDelete={onDelete}
                  mode="grid"
                  showCopyButton={showCopyButton}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="picture__display-content">
            {/* Left: List */}
            <div className="picture__scroll-wrapper">
              <div className="picture__list">
                {images.map((image) => {
                  const isSelected = selectedImage?.filename === image.filename;
                  return (
                    <div
                      key={image.filename}
                      className={`picture__row ${
                        isSelected ? "picture__row--selected" : ""
                      }`}
                      onClick={() => handleSelect(image)}
                    >
                      <div className="picture__symbol">🖼️</div>
                      <div className="picture__filename">
                        {image.originalName || image.filename}
                      </div>
                      <div className="picture__type">
                        {image.mimetype || "image"}
                      </div>
                      <div className="picture__size">
                        {Math.round(image.size / 1024)} KB
                      </div>
                      {onDelete && (
                        <button
                          type="button"
                          className="picture__delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(image.filename);
                            if (isSelected) setSelectedImage(null);
                          }}
                        >
                          🗑 Delete
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Large preview */}
            <div className="picture__preview">
              {selectedImage && (
                <img
                  src={`${API_BASE_URL}/uploads/${selectedImage.filename}`}
                  alt={selectedImage.filename}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
