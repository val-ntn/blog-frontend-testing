// frontend/src/components/Shared/TeaserCard/TeaserCard.jsx

/* import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/format"; // <-- import here
import "./TeaserCard.css";

export default function TeaserCard({ data, size = "small", type }) {
  if (!data) return null;

  const { thumbnail, title, teaser, createdAt, author, _id } = data;
  const sizeClass =
    size === "large" ? "teaser-card--large" : "teaser-card--small";

  return (
    <div className={`teaser-card ${sizeClass}`}>
      {thumbnail && (
        <img src={thumbnail} alt={title} className="teaser-card__image" />
      )}
      <div className="teaser-card__content">
        <h3 className="teaser-card__title">{title}</h3>
        {author?.name && (
          <small className="teaser-card__author">By {author.name}</small>
        )}
        {createdAt && (
          <small className="teaser-card__date">{formatDate(createdAt)}</small>
        )}
        <p className="teaser-card__teaser">{teaser}</p>
        <Link to={`/${type}s/${_id}`} className="teaser-card__read-more">
          Read more →
        </Link>
      </div>
    </div>
  );
}
 */

// frontend/src/components/Shared/TeaserCard/TeaserCard.jsx

/* import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/format";
import "./TeaserCard.css";

export default function TeaserCard({ data, size = "small", type }) {
  if (!data) return null;

  const { thumbnail, title, teaser, createdAt, author, _id } = data;
  const sizeClass =
    size === "large" ? "teaser-card--large" : "teaser-card--small";

  return (
    <div className={`teaser-card ${sizeClass}`}>
      {thumbnail && (
        <div
          className="teaser-card__media"
          style={{ backgroundImage: `url(${thumbnail})` }}
        />
      )}

      <div className="teaser-card__body">
        <h3 className="teaser-card__title">{title}</h3>

        {author?.name && (
          <small className="teaser-card__author">By {author.name}</small>
        )}
        {createdAt && (
          <small className="teaser-card__date">{formatDate(createdAt)}</small>
        )}

        {teaser && <p className="teaser-card__text">{teaser}</p>}

        {type && _id && (
          <Link to={`/${type}s/${_id}`} className="teaser-card__read-more">
            Read more →
          </Link>
        )}
      </div>
    </div>
  );
}
 */

// frontend/src/components/Shared/TeaserCard/TeaserCard.jsx

/* import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/format";
import "./TeaserCard.css";

export default function TeaserCard({ data, size = "small", type }) {
  if (!data) return null;

  const { thumbnail, title, teaser, createdAt, author, _id, tagline } = data;
  const sizeClass =
    size === "large" ? "teaser-card--large" : "teaser-card--small";

  return (
    <div className={`teaser-card ${sizeClass}`}>
      {thumbnail && (
        <div
          className="teaser-card__media"
          style={{ backgroundImage: `url(${thumbnail})` }}
        />
      )}

      <div className="teaser-card__body">
        {tagline && <p className="teaser-card__tagline">{tagline}</p>}

        <h3 className="teaser-card__title">{title}</h3>

        <div className="teaser-card__divider"></div>

        {author?.name && (
          <small className="teaser-card__author">By {author.name}</small>
        )}
        {createdAt && (
          <small className="teaser-card__date">{formatDate(createdAt)}</small>
        )}

        {teaser && <p className="teaser-card__text">{teaser}</p>}

        {type && _id && (
          <Link to={`/${type}s/${_id}`} className="teaser-card__read-more">
            Read more →
          </Link>
        )}
      </div>
    </div>
  );
}
 */
// frontend/src/components/Shared/TeaserCard/TeaserCard.jsx

import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/format";
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
