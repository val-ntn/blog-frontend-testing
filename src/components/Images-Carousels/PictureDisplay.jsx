// src/components/Images-Carousels/PictureDisplay.jsx
/*import { useState } from "react";
import { API_BASE_URL } from "../../utils/api";
import "./PictureDisplay.css";
import Picture from "./Picture";

export default function PictureDisplay({
  images,
  onSelect,
  onDelete,
  displayMode = "list",
  showCopyButton,
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelect = (image) => {
    if (selectedImage?.filename === image.filename) {
      setSelectedImage(null);
      onSelect?.(null);
    } else {
      setSelectedImage(image);
      onSelect?.(image);
    }
  };

  if (displayMode === "grid") {
    return (
      <div className="picture-grid">
        {images.map((image) => (
          <Picture
            key={image.filename}
            image={image}
            onSelect={onSelect}
            onDelete={onDelete}
            mode="grid"
            showCopyButton={showCopyButton}
          />
        ))}
      </div>
    );
  }

  // List mode
  return (
    <div className="picture-display-wrapper">
      {images.map((image) => {
        const imageUrl = `${API_BASE_URL}/uploads/${image.filename}`;
        const isSelected = selectedImage?.filename === image.filename;

        return (
          <div
            key={image.filename}
            className={`picture-row ${isSelected ? "selected" : ""}`}
            onClick={() => handleSelect(image)}
          >
            <div className="picture-symbol">🖼️</div>

            <div className="picture-filename">
              {image.originalName || image.filename}
            </div>
            <div className="picture-type">{image.mimetype || "image"}</div>
            <div className="picture-size">
              {Math.round(image.size / 1024)} KB
            </div>

            {onDelete && (
              <button
                type="button"
                className="picture-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(image.filename);
                  if (isSelected) setSelectedImage(null);
                }}
              >
                ❌
              </button>
            )}

            {isSelected && (
              <div className="picture-large-preview">
                <img src={imageUrl} alt={image.filename} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}*/

// src/components/Images-Carousels/PictureDisplay.jsx
import { useState } from "react";
import { API_BASE_URL } from "../../utils/api";
import Picture from "./Picture";
import "./PictureDisplay.css";

export default function PictureDisplay({
  images,
  onSelect,
  onDelete,
  displayMode = "list",
  showCopyButton,
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelect = (image) => {
    if (selectedImage?.filename === image.filename) {
      setSelectedImage(null);
      onSelect?.(null);
    } else {
      setSelectedImage(image);
      onSelect?.(image);
    }
  };

  // --- GRID MODE ---
  if (displayMode === "grid") {
    return (
      <div className="picture-display-wrapper">
        <div className="picture-grid">
          {images.map((image) => (
            <Picture
              key={image.filename}
              image={image}
              onSelect={onSelect}
              onDelete={onDelete}
              mode="grid"
              showCopyButton={showCopyButton}
            />
          ))}
        </div>
      </div>
    );
  }

  // List mode with scrollable container + large preview
  return (
    <div className="picture-display-wrapper">
      <div className="picture-scroll-wrapper">
        {/* Left: Scrollable list */}
        <div className="picture-list">
          {images.map((image) => {
            const isSelected = selectedImage?.filename === image.filename;
            return (
              <div
                key={image.filename}
                className={`picture-row ${isSelected ? "selected" : ""}`}
                onClick={() => handleSelect(image)}
              >
                <div className="picture-symbol">🖼️</div>
                <div className="picture-filename">
                  {image.originalName || image.filename}
                </div>
                <div className="picture-type">{image.mimetype || "image"}</div>
                <div className="picture-size">
                  {Math.round(image.size / 1024)} KB
                </div>
                {onDelete && (
                  <button
                    type="button"
                    className="picture-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(image.filename);
                      if (isSelected) setSelectedImage(null);
                    }}
                  >
                    ❌
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Large preview */}
        <div className="picture-preview">
          {selectedImage && (
            <img
              src={`${API_BASE_URL}/uploads/${selectedImage.filename}`}
              alt={selectedImage.filename}
            />
          )}
        </div>
      </div>
    </div>
  );
}
