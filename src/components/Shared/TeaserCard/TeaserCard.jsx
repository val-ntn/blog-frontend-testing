// frontend/src/components/Shared/TeaserCard/TeaserCard.jsx

import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/format";
import PropTypes from "prop-types";
import "./TeaserCard.css";


export default function TeaserCard({ data, size = "small", type }) {
  if (!data) return null;

  const { thumbnail, title, teaser, createdAt, _id } = data;
  const isSmall = size === "small";

  return (
    <div className={`teaser-card ${isSmall ? "small" : "large"}`}>
      {thumbnail && (
        <div
          className="teaser-card__media"
          style={{ backgroundImage: `url(${thumbnail})` }}
        />
      )}

      <div className="teaser-card__body">
        <h3 className="teaser-card__title">{title}</h3>
        {/* Divider only for large cards */}
        {!isSmall && <div className="teaser-card__divider" />}
        {createdAt && (
          <small className="teaser-card__date">{formatDate(createdAt)}</small>
        )}
        {teaser && <p className="teaser-card__text">{teaser}</p>}

        {type && _id && (
          <a href={`/${type}s/${_id}`} className="teaser-card__button">
            Read More
          </a>
        )}
      </div>
    </div>
  );
}

TeaserCard.propTypes = {
  data: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    teaser: PropTypes.string,
    createdAt: PropTypes.string,
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  }).isRequired,
  size: PropTypes.oneOf(["small", "large"]),
  type: PropTypes.string,
};