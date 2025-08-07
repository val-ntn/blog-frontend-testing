// frontend/src/components/Images-Carousels/CarouselList.jsx

import CarouselItem from "./CarouselItem";

export default function CarouselList({
  carousels,
  onDelete,
  onSelect,
  disableDelete = false,
  viewMode = "grid",
}) {
  return (
    <div className={`carousel-list ${viewMode}`}>
      {carousels.map((carousel) => (
        <div key={carousel._id} onClick={() => onSelect?.(carousel)}>
          <CarouselItem carousel={carousel} />
          {!disableDelete && onDelete && (
            <button onClick={() => onDelete(carousel._id)}>Delete</button>
          )}
        </div>
      ))}
    </div>
  );
}
