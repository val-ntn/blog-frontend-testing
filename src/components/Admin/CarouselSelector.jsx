// frontend/src/components/admin/CarouselSelector.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";
import CarouselList from "../Images-Carousels/CarouselList";

export default function CarouselSelector({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [carousels, setCarousels] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    if (!open) return;
    axios
      .get(`${API_BASE_URL}/carousels`, { withCredentials: true })
      .then((res) => setCarousels(res.data))
      .catch(console.error);
  }, [open]);

  const handleSelect = (carousel) => {
    onSelect(carousel);
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={() => setOpen(!open)}>
        {open ? "Close Carousel Selector" : "Select a Carousel"}
      </button>

      {open && (
        <div>
          <button
            type="button"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            Switch to {viewMode === "grid" ? "List View" : "Grid View"}
          </button>

          <CarouselList
            carousels={carousels}
            onSelect={handleSelect}
            disableDelete={true}
            viewMode={viewMode}
          />
        </div>
      )}
    </div>
  );
}
