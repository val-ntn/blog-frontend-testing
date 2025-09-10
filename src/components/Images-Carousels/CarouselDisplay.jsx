// src/components/Images-Carousels/CarouselDisplay.jsx
// src/components/Images-Carousels/CarouselDisplay.jsx
import { useState } from "react";
import CarouselItem from "./CarouselItem";
import "./CarouselDisplay.css"; // reuse same styles

export default function CarouselDisplay({
  carousels,
  onDelete,
  onEdit,
  onAdd,
  adding,
  displayMode = "list",
  toggleDisplayMode,
}) {
  const [selectedCarousel, setSelectedCarousel] = useState(null);

  const handleSelect = (carousel) => {
    if (selectedCarousel?._id === carousel._id) {
      setSelectedCarousel(null);
    } else {
      setSelectedCarousel(carousel);
    }
  };

  return (
    <div className="carousel-display">
      {/* Add New Carousel input */}
      <div style={{ marginBottom: "1rem" }}>
        <button type="button" onClick={onAdd} disabled={adding}>
          Add New Carousel
        </button>
        {adding && <p>Adding...</p>}
      </div>

      {/* Header with toggle button */}
      <div className="carousel-display-header">
        <div className="spaceing"></div>
        <button type="button" onClick={toggleDisplayMode}>
          Switch to {displayMode === "grid" ? "List View" : "Thumbnail View"}
        </button>
      </div>

      {/* Main display area */}
      <div className="carousel-display-wrapper">
        {displayMode === "grid" ? (
          <div className="carousel-scroll-wrapper">
            <div className="carousel-grid">
              {carousels.map((carousel) => (
                <div
                  key={carousel._id}
                  className="carousel-row"
                  onClick={() => handleSelect(carousel)}
                >
                  <div className="carousel-symbol">🎞️</div>
                  <div className="carousel-filename">{carousel.title}</div>
                  <div className="carousel-type">
                    {carousel.type || "basic"}
                  </div>
                  <div className="carousel-size">
                    {carousel.images?.length || 0} images
                  </div>
                  <button
                    type="button"
                    className="carousel-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(carousel._id);
                      if (selectedCarousel?._id === carousel._id)
                        setSelectedCarousel(null);
                    }}
                  >
                    🗑 Delete
                  </button>
                  <button
                    type="button"
                    className="carousel-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.(carousel);
                    }}
                  >
                    ✏ Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="carousel-display-content">
            <div className="carousel-scroll-wrapper">
              {/* Left: List */}
              <div className="carousel-list">
                {carousels.map((carousel) => {
                  const isSelected = selectedCarousel?._id === carousel._id;
                  return (
                    <div
                      key={carousel._id}
                      className={`carousel-row ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSelect(carousel)}
                    >
                      <div className="carousel-symbol">🎞️</div>
                      <div className="carousel-filename">{carousel.title}</div>
                      <div className="carousel-type">
                        {carousel.type || "basic"}
                      </div>
                      <div className="carousel-size">
                        {carousel.images?.length || 0} images
                      </div>
                      <button
                        type="button"
                        className="carousel-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(carousel._id);
                          if (isSelected) setSelectedCarousel(null);
                        }}
                      >
                        🗑 Delete
                      </button>
                      <button
                        type="button"
                        className="carousel-delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit?.(carousel);
                        }}
                      >
                        ✏ Edit
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Preview */}
            <div className="carousel-preview">
              {selectedCarousel && <CarouselItem carousel={selectedCarousel} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
